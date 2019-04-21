const Order = require("../../models/order.model");
const Executor = require("../../models/executor.model");
const User = require("../../models/user.model");
const Status = require("../../enums/status.enum");
const httpStatus = require("http-status");
const Role = require("../../enums/roles.enum");
const { sendOrderStatusMessage } = require("../../config/nodemailer");
const {
  calculateTime,
  calculatePrice
} = require("../../services/priceTimeCalculate");

async function createOrder({
  customer,
  company,
  city,
  adress,
  type,
  smallRooms,
  bigRooms,
  bathRooms,
  squareMeters,
  service,
  smallCarpets,
  bigCarpets,
  startDate,
  expectedTime,
  cleaningDays,
  regularity,
  email,
  recurrence
}) {
  startDate = new Date(startDate);
  expectedTime = new Date(expectedTime);

  const executor = await Executor.findById(company);
  const companyName = executor.companyName;

  const price = calculatePrice({
    values: {
      smallRooms,
      bigRooms,
      bathRooms,
      squareMeters,
      smallCarpets,
      bigCarpets,
      service,
      type
    },
    typesOfCleaning: executor.typesOfCleaning
  });
  const time = calculateTime({
    values: {
      smallRooms,
      bigRooms,
      bathRooms,
      squareMeters,
      smallCarpets,
      bigCarpets,
      service,
      type
    },
    typesOfCleaning: executor.typesOfCleaning
  });

  const startWeekDay = startDate.getDay();

  let i = startWeekDay;
  const latestDayThatCanBe = i - 1 === -1 ? 7 : i;
  let latestCleaningDay;

  while (true) {
    if (cleaningDays.indexOf(i) !== -1) latestCleaningDay = i;
    i++;
    if (i > 7) i = 0;
    if (i === latestDayThatCanBe) break;
  }

  let differenceBetweenStartAndLatestDay =
    startWeekDay < latestCleaningDay
      ? latestCleaningDay - startWeekDay
      : 8 - startWeekDay + latestCleaningDay;
  let latestCleaningDate = new Date();

  latestCleaningDate.setDate(
    startDate.getDate() + differenceBetweenStartAndLatestDay
  );

  let endDate = latestCleaningDate;

  switch (recurrence) {
    case 1:
      endDate.setDate(latestCleaningDate.getDate() + 14);
    case 2:
      endDate.setMonth(endDate.getMonth() + 1);
    case 3:
      endDate.setMonth(endDate.getMonth() + 2);
    case 4:
      endDate.setMonth(endDate.getMonth() + 3);
    case 5:
      endDate.setMonth(endDate.getMonth() + 4);
    case 6:
      endDate.setMonth(endDate.getMonth() + 5);
    case 7:
      endDate.setMonth(endDate.getMonth() + 6);
  }

  const order = new Order({
    customer,
    executor: company,
    city,
    adress,
    type,
    smallRooms:
      (type === "standart") | (type === "general") | (type === "afterRepair")
        ? smallRooms
        : undefined,
    bigRooms:
      (type === "standart") | (type === "general") | (type === "afterRepair")
        ? bigRooms
        : undefined,
    bathRooms:
      (type === "standart") | (type === "general") | (type === "afterRepair")
        ? bathRooms
        : undefined,
    squareMeters:
      (type === "office") | (type === "industrial") ? squareMeters : undefined,
    service: {
      pool: service.indexOf("pool") !== -1 ? true : false,
      furniture: service.indexOf("furniture") !== -1 ? true : false,
      carpet: service.indexOf("carpet") !== -1 ? true : false
    },
    smallCarpets: service.indexOf("carpet") !== -1 ? smallCarpets : undefined,
    bigCarpet: service.indexOf("carpet") !== -1 ? bigCarpets : undefined,
    startDate,
    endDate,
    expectedTime,
    cleaningDays,
    companyName,
    regularity,
    price,
    time,
    email,
    recurrence,
    status: Status.New
  });

  return new Promise((resolve, reject) => {
    order.save(err => {
      if (err) reject(err);

      resolve({ email: executor.email });
    });
  });
}

async function getOrders(
  user,
  {
    page = 1,
    perPage = 10,
    city,
    adress,
    carpet,
    furniture,
    pool,
    sortBy,
    companyId,
    companyName,
    type
  }
) {
  const id = user.id;
  const role = user.role;

  let sort = {};
  if (sortBy === "price" || sortBy === "-price") {
    const typeOfSort = sortBy === "price" ? 1 : -1;
    sort.price = typeOfSort;
  }

  if (sortBy === "time" || sortBy === "-time") {
    const typeOfSort = sortBy === "time" ? -1 : 1;
    sort.avetageTime = typeOfSort;
  }

  if (sortBy === "date" || sortBy === "-date") {
    const typeOfSort = sortBy === "date" ? -1 : 1;
    sort.startDate = typeOfSort;
  }

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select:
      "type city adress companyName smallRooms bigRooms bathRooms squareMeters startDate cleaningDays expectedTime regularity service recurrence endDate customer executor price time averageTime status",
    sort
  };

  let query = {};

  if (role === Role.Executor) {
    query.executor = id;
  } else if (role === Role.User) {
    query.customer = id;
  }
  if (companyName) query.companyName = { $regex: companyName };
  if (adress) query.adress = { $regex: adress };
  if (city) query.city = { $regex: city };
  if (companyId) query.executor = companyId;
  if (type) query.type = `${type}`;
  if (carpet) query["service.carpet"] = true;
  if (furniture) query["service.furniture"] = true;
  if (pool) query["service.pool"] = true;

  const orders = await Order.paginate(query, options);

  return orders;
}

async function acceptOrder(orderId) {
  const order = await Order.findById(orderId);

  if (!order.status) throw new Error("Нет доступа");
  if (order.status != Status.New) throw new Error("Заказ не новый");

  order.status = Status.Accepted;
  order.save();

  sendOrderStatusMessage(order.email, orderId, null, Status.Accepted);
}

async function cancelOrder(data) {
  const { orderId, reason } = data;

  const order = await Order.findByIdAndUpdate(orderId, {
    status: Status.Canceled
  });

  if (!order.status) throw new Error("Нет доступа");
  if (order.status != Status.New) throw new Error("Заказ не новый");

  const user = await User.findById(order.customer);
  const executor = await Executor.findById(order.executor);

  sendOrderStatusMessage(
    user ? user.email : order.email,
    orderId,
    reason,
    Status.Canceled
  );
  sendOrderStatusMessage(executor.email, orderId, reason, Status.Canceled);
}

async function confirmOrder(orderId) {
  const order = await Order.findById(orderId);

  if (new Date(order.endDate) > new Date()) throw new Error("Рано");

  if (!order.status) throw new Error("Нет доступа");
  if (order.status != Status.Accepted) throw new Error("Заказ не принят");

  order.status = Status.Done;
  order.save();

  const executor = await Executor.findByIdAndUpdate(order.executor, {
    $inc: { popularity: 1 }
  });
  sendOrderStatusMessage(executor.email, orderId, null, Status.Done);
}

async function ordersHistory(user) {
  if (user.role == Role.User) {
    return await Order.find({
      $or: [
        { customer: user.id, status: "canceled" },
        { customer: user.id, status: "done" }
      ]
    }).exec();
  } else {
    return await Order.find({
      $or: [
        { executor: user.id, status: "canceled" },
        { executor: user.id, status: "done" }
      ]
    }).exec();
  }
}

module.exports = {
  createOrder,
  getOrders,
  acceptOrder,
  cancelOrder,
  confirmOrder,
  ordersHistory
};
