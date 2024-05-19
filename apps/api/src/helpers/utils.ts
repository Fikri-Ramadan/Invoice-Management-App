export const addOneDayToDate = (date: Date) => {
  date.setDate(date.getDate() + 1)
  return date
}