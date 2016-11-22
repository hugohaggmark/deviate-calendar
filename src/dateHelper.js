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
  return formatDate(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate())
}
export const isWeekEnd = date => {
  if(!date)
    return false

  return date.getDay() === 0 || date.getDay() === 6
}
export const isDateInArray = (date, array) => {
  if(!array)
    return false

  return array.filter(d => getformattedDate(d) === getformattedDate(date)).length > 0
}
export const removeDateFromArray = (date, array) => {
  if(!array)
    return false

  return array.filter(d => getformattedDate(d) !== getformattedDate(date))
}
export const getDatesInArrayForThisYearMonth = (year, month, array) => {
  if(!array)
    return false

  return array.filter(day => new Date(day).getFullYear() === year && new Date(day).getMonth() === month)
}
export const getFillerDaysBeforeThisMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDayInMonth = new Date(year, month, 1)
  const dayInWeek = firstDayInMonth.getDay()
  const fillerDates = []
  let count = 0
  switch (dayInWeek) {
    case 1:
      count = -1
    break
    case 2:
      count = 0
    break
    case 3:
      count = 1
    break
    case 4:
      count = 2
    break
    case 5:
      count = 3
    break
    case 6:
      count = 4
    break
    default:
      count = 5
  }
  const daysPreviousMonth = getNumberOfDaysInMonth(new Date(year, month - 1,1))
  for (var i = daysPreviousMonth - count; i <= daysPreviousMonth; i++) {
    var day = new Date(year, month - 1, i)
    if(isWeekEnd(day)){
      fillerDates.push({ type: 'other-month-weekend', date:day})
    } else {
      fillerDates.push({ type: 'other-month-day', date:day})
    }
  }

  return fillerDates
}
export const getFillerDaysAfterThisMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const numberOfDaysInMonth = getNumberOfDaysInMonth(date)
  const dayInWeek = new Date(year, month, numberOfDaysInMonth).getDay()
  const fillerDates = []
  for (var counter = 1; counter <= 7 - dayInWeek; counter++) {
    let day = new Date(year, month, numberOfDaysInMonth)
    day.setDate(day.getDate() + counter)
    if(isWeekEnd(day)){
      fillerDates.push({ type: 'other-month-weekend', date:day})
    } else {
      fillerDates.push({ type: 'other-month-day', date:day})
    }
  }

  return fillerDates
}
export const getDaysInMonthArray = state => {
  const date = state.date
  const month = date.getMonth()
  const year = date.getFullYear()
  const numberOfDaysInMonth = getNumberOfDaysInMonth(date)
  let daysInMonthArray = []
  const fillerDatesBefore = getFillerDaysBeforeThisMonth(date)
  const fillerDatesAfter = getFillerDaysAfterThisMonth(date)

  daysInMonthArray = daysInMonthArray.concat(fillerDatesBefore)
  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    let day = new Date(year, month, i)
    let alreadyAdded = false
    if(state.deviations){
      let j = 0
      while(alreadyAdded === false && j < state.deviations.length) {
        let property = state.deviations[j].type
        let label = state.deviations[j].label
        let array = state[property]
        if(array && isDateInArray(day, array)){
          daysInMonthArray.push({ type: property, label: label, date: day})
          alreadyAdded = true
        }
        j++
      }      
    }
    if(!alreadyAdded) {
      if(isWeekEnd(day)){
        daysInMonthArray.push({ type: 'weekend', date: day})
      }
      else {
        daysInMonthArray.push({ type: 'workday', date: day})
      }
    }
  }
  daysInMonthArray = daysInMonthArray.concat(fillerDatesAfter)
  return daysInMonthArray
}
