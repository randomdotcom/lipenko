export const getTranslatedCleaningTypeName = type => {
  switch (type) {
    case "standart":
      return "Обычная";
    case "general":
      return "Генеральная";
    case "industrial":
      return "Промышленная";
    case "office":
      return "Уборка офиса";
    case "afterRepair":
      return "После ремонта";

    default:
      return "-";
  }
};

export const minsToHours = mins => {
  if (mins < 60) return `${mins}м`;
  return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
};

export const getTranslatedBookingStatusName = status => {
  switch (status) {
    case "new":
      return "Новый";
    case "accepted":
      return "Принят";
    case "done":
      return "Выполнен";
    case "canceled":
      return "Отменен";

    default:
      return "-";
  }
};
