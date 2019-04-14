const Order = require("../../models/order.model");
const Status = require("../../enums/status.enum");
const httpStatus = require("http-status");
const Role = require("../../enums/roles.enum");

const { sendOrderStatusMessage } = require("../../config/nodemailer");

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

  const startWeekDay = startDate.getDay();

  let i = startWeekDay;
  const latestDayThatCanBe = i - 1 === -1 ? 7 : i;
  let latestCleaningDay;

  while (true) {
    if (i === latestDayThatCanBe) break;
    if (cleaningDays.indexOf(i) !== -1) latestCleaningDay = i;
    i++;
    if (i > 7) i = 0;
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
    customer: customer ? customer : undefined,
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
    regularity,
    email,
    recurrence,
    status: Status.New
  });

  return new Promise((resolve, reject) => {
    order.save(err => {
      if (err) reject(err);

      resolve();
    });
  });
}

async function getOrders({
  page = 1,
  perPage = 10,
  city,
  adress,
  sortBy,
  companyName,
  type
}) {
  let sort = {};
  if (sortBy === "price" || sortBy === "-price") {
    const typeOfSort = sortBy === "price" ? 1 : -1;
    sort.price = typeOfSort;
  }

  if (sortBy === "averageTime" || sortBy === "-averageTime") {
    const typeOfSort = sortBy === "averageTime" ? -1 : 1;
    sort.avetageTime = typeOfSort;
  }

  if (sortBy === "date" || sortBy === "-date") {
    const typeOfSort = sortBy === "date" ? 1 : -1;
    sort.startDate = typeOfSort;
  }

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select:
      "type city adress smallRooms bigRooms bathRooms squareMeters startDate cleaningDays expectedTime regularity recurrence endDate executor price averageTime status",
    sort
  };

  let query = {};

  if (adress) query.adress = { $regex: adress };
  if (city) query.city = { $regex: city };
  if (companyName) query.companyName = { $regex: companyName };
  if (type) query.type = `${type}`;
  if (carpet) query["service.carpet"] = true;
  if (furniture) query["service.furniture"] = true;
  if (pool) query["service.pool"] = true;

  const companies = await Order.paginate(query, options);

  return companies;
}

async function getCompanyById(companyId) {
  return await Executor.findById({ _id: companyId });
}

async function blockCompany(userId, data) {
  return await Executor.findByIdAndUpdate(
    userId,
    {
      $set: { isBlocked: true, blockReason: `${data.blockReason}` }
    },
    (err, user) => {
      if (err) throw new Error(err);
      sendProfileBlockMessage(user.email, user.username, data.blockReason);
    }
  );
}

async function acceptOrder(orderId) {
  return await Order.findByIdAndUpdate(
    orderId,
    {
      status: Status.Accepted
    },
    (err, order) => {
      const user = User.findById(order.customer);

      sendOrderStatusMessage(user.email, orderId, Status.Accepted);
    }
  ).exec();
}

async function cancelOrder(orderId) {
  return await Order.findByIdAndUpdate(
    orderId,
    {
      status: Status.Canceled
    },
    (err, order) => {
      const user = User.findById(order.customer);
      const executor = Executor.findById(order.executor);

      sendOrderStatusMessage(user.email, orderId, Status.Canceled);
      sendOrderStatusMessage(executor.email, orderId, Status.Canceled);
    }
  ).exec();
}

async function confirmOrder(orderId) {
  return await Order.findByIdAndUpdate(
    orderId,
    {
      status: Status.Done
    },
    (err, order) => {
      const executor = Executor.findById(order.executor);

      sendOrderStatusMessage(executor.email, orderId, Status.Done);
    }
  ).exec();
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
