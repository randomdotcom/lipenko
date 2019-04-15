export function calculatePrice({ values, typesOfCleaning }) {
  let price;
  
  if ((values.type === "office") | (values.type === "industrial")) {
    price = values.squareMeters * typesOfCleaning[`${values.type}`];
  } else {
    price =
      values.smallRooms *
        typesOfCleaning[`${values.type}`][`${values.type}SmallRoom`] +
      values.bigRooms *
        typesOfCleaning[`${values.type}`][`${values.type}BigRoom`] +
      values.bathRooms *
        typesOfCleaning[`${values.type}`][`${values.type}BathRoom`];
  }
  
  if (values.service.indexOf("pool") !== -1) price += typesOfCleaning.pool;
  if (values.service.indexOf("furniture") !== -1)
    price += typesOfCleaning.furniture;

  if (values.service.indexOf("carpet") !== -1) {
    price +=
      values.smallCarpets * typesOfCleaning.carpet.smallCarpet +
      values.bigCarpets * typesOfCleaning.carpet.bigCarpet;
  }

  return price;
}

export function calculateTime({ values }) {
  let time;

  if ((values.type === "office") | (values.type === "industrial")) {
    time = values.squareMeters * 8;
  } else {
    time =
      values.smallRooms * 18 + values.bigRooms * 30 + values.bathRooms * 23;
  }

  if (values.service.indexOf("pool") !== -1) time += 90;
  if (values.service.indexOf("furniture") !== -1) time += 60;
  if (values.service.indexOf("carpet") !== -1)
    time += values.smallCarpets * 13 + values.bigCarpets * 20;

  return time;
}
