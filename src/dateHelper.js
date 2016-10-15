export const getNumberOfDaysInMonth = selectedDate => {
  const month = selectedDate.getMonth() + 1
  const year = selectedDate.getFullYear()
  const date = new Date(year, month, 0).getDate()
  return date
}
export const formatDate = (year, month, day) => {
  var d = new Date(year, month, day),
      stringMonth = '' + (d.getMonth() + 1),
      stringDay = '' + d.getDate(),
      stringYear = d.getFullYear();

  if (stringMonth.length < 2) stringMonth = '0' + stringMonth;
  if (stringDay.length < 2) stringDay = '0' + stringDay;

  return [stringYear, stringMonth, stringDay].join('-');
}
export const getformattedDate = date => {
  return formatDate(date.getFullYear(), date.getMonth(), date.getDate())
}
export const isWeekEnd = date => {
  return date.getDay() === 0 || date.getDay() === 6
}
export const isDateInArray = (date, array) => {
  return array.map(Number).indexOf(+date) >= 0
}
export const removeDateFromArray = (date, array) => {
  return array.filter(d => +d !== +date)
}
