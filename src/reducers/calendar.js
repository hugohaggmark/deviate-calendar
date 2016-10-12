const getNumberOfDaysInMonth = selectedDate => {
  const month = selectedDate.getMonth() + 1
  const year = selectedDate.getFullYear()
  const date = new Date(year, month, 0).getDate()
  return date
}
const formatDate = (year, month, day) => {
  var d = new Date(year, month, day),
      stringMonth = '' + (d.getMonth() + 1),
      stringDay = '' + d.getDate(),
      stringYear = d.getFullYear();

  if (stringMonth.length < 2) stringMonth = '0' + stringMonth;
  if (stringDay.length < 2) stringDay = '0' + stringDay;

  return [stringYear, stringMonth, stringDay].join('-');
}
const getBillableHours = (date) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  var billableHours = 0
  for (var i = 1; i <= getNumberOfDaysInMonth(date); i++) {
    var d = new Date(year, month, i)
    if(d.getDay() !== 0 && d.getDay() !== 6)
      billableHours += 6
  }
  return billableHours
}
const getFormattedStartDate = date => {
  return formatDate(date.getFullYear(), date.getMonth(), 1)
}
const getFormattedEndDate = date => {
  return formatDate(date.getFullYear(), date.getMonth(), getNumberOfDaysInMonth(date))
}
// const getDaysInMonthArray = (month, year) => {
//   const days = this.daysInMonth(month, year)
//   const firstDayInMonth = new Date(year, month, 1).getDay() - 1
//   const lastDayInMonth = new Date(year, month, days).getDay() - 1
//   const daysInMonthArray = []
//   for (var j = 0; j < firstDayInMonth; j++) {
//     daysInMonthArray.push('-')
//   }
//   for (var i = 0; i < days; i++) {
//     daysInMonthArray.push(new Date(year, month, i + 1).getDate())
//   }
//   for (var k = lastDayInMonth; k < 6; k++) {
//     daysInMonthArray.push('-')
//   }
//   return daysInMonthArray
// }
const CalendarReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'INIT_DATES':
      return {...state,
        date: action.payload.date,
        numberOfDaysInMonth: getNumberOfDaysInMonth(action.payload.date),
        formattedStartDate: getFormattedStartDate(action.payload.date),
        formattedEndDate: getFormattedEndDate(action.payload.date),
        billableHours:getBillableHours(action.payload.date),
        weekdays:['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'],
        months: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December']
      }
    default:
      return state
  }
}

export default CalendarReducer
