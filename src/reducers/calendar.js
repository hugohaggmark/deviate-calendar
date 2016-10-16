import {getNumberOfDaysInMonth,
  formatDate,
  isWeekEnd,
  isDateInArray,
  removeDateFromArray,
} from '../dateHelper'

const getBillableHours = (date, workHours, reportedVABDays, reportedSicknessDays, reportedVacationDays) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  var billableHours = 0
  for (var i = 1; i <= getNumberOfDaysInMonth(date); i++) {
    var d = new Date(year, month, i)
    if(isWeekEnd(d)){
      continue
    }
    if(isDateInArray(d, reportedVABDays)){
      continue
    }
    if(isDateInArray(d, reportedSicknessDays)){
      continue
    }
    if(isDateInArray(d, reportedVacationDays)){
      continue
    }
    billableHours += workHours
  }
  return billableHours
}
const getFormattedStartDate = date => {
  return formatDate(date.getFullYear(), date.getMonth(), 1)
}
const getFormattedEndDate = date => {
  return formatDate(date.getFullYear(), date.getMonth(), getNumberOfDaysInMonth(date))
}
const getDaysInMonthArray = (date, reportedVABDays, reportedSicknessDays, reportedVacationDays) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  const numberOfDaysInMonth = getNumberOfDaysInMonth(date)
  const firstDayInMonth = new Date(year, month, 1).getDay() - 1
  const lastDayInMonth = new Date(year, month, numberOfDaysInMonth).getDay() - 1
  const daysInMonthArray = []
  for (var j = 0; j < firstDayInMonth; j++) {
    daysInMonthArray.push({ type: 'other-month', payload:'-'})
  }
  for (var i = 1; i <= numberOfDaysInMonth; i++) {
    var day = new Date(year, month, i)
    if(isWeekEnd(day)){
      daysInMonthArray.push({ type: 'weekend', payload:day})
    }
    else if(isDateInArray(day, reportedVABDays)){
      daysInMonthArray.push({ type: 'vab', payload: day})
    }
    else if(isDateInArray(day, reportedSicknessDays)){
      daysInMonthArray.push({ type: 'sickness', payload: day})
    }
    else if(isDateInArray(day, reportedVacationDays)){
      daysInMonthArray.push({ type: 'vacation', payload: day})
    }
    else{
      daysInMonthArray.push({ type: 'workday', payload: day})
    }
  }
  for (var k = lastDayInMonth; k < 6; k++) {
    daysInMonthArray.push({ type: 'other-month', payload:'-'})
  }
  return daysInMonthArray
}
const updateVABDays = (date, state, remove = false) => {
  const newVABDaysArray = remove ? removeDateFromArray(date, state.reportedVABDays) : state.reportedVABDays.concat(date)
  return {
    ...state,
    reportedVABDays: newVABDaysArray,
    billableHours:getBillableHours(date, state.workHours, newVABDaysArray, state.reportedSicknessDays, state.reportedVacationDays),
    daysInMonth: getDaysInMonthArray(date, newVABDaysArray, state.reportedSicknessDays, state.reportedVacationDays),
  }
}
const updateSickDays = (date, state, remove = false) => {
  const newSickDaysArray = remove ? removeDateFromArray(date, state.reportedSicknessDays) : state.reportedSicknessDays.concat(date)
  return {
    ...state,
    reportedSicknessDays: newSickDaysArray,
    billableHours:getBillableHours(date, state.workHours, state.reportedVABDays, newSickDaysArray, state.reportedVacationDays),
    daysInMonth: getDaysInMonthArray(date, state.reportedVABDays, newSickDaysArray, state.reportedVacationDays),
  }
}
const updateVacationDays = (date, state, remove = false) => {
  const newVacationDaysArray = remove ? removeDateFromArray(date, state.reportedVacationDays) : state.reportedVacationDays.concat(date)
  return {
    ...state,
    reportedVacationDays: newVacationDaysArray,
    billableHours:getBillableHours(date, state.workHours, state.reportedVABDays, state.reportedSicknessDays, newVacationDaysArray),
    daysInMonth: getDaysInMonthArray(date, state.reportedVABDays, state.reportedSicknessDays, newVacationDaysArray),
  }
}
const initialState = {
  weekdays:['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'],
  months: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'],
  reportedVABDays: [],
  reportedSicknessDays:[],
  reportedVacationDays:[],
}
const CalendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'INIT_DATES':
      return {...state,
        date: action.payload.date,
        numberOfDaysInMonth: getNumberOfDaysInMonth(action.payload.date),
        formattedStartDate: getFormattedStartDate(action.payload.date),
        formattedEndDate: getFormattedEndDate(action.payload.date),
        billableHours:getBillableHours(action.payload.date, state.workHours, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays),
      }
    case 'REPORT_VAB':
      return updateVABDays(action.payload.date, state)
    case 'REPORT_SICKNESS':
    return updateSickDays(action.payload.date, state)
    case 'REPORT_VACATION':
    return updateVacationDays(action.payload.date, state)
    case 'REMOVE_VAB':
      return updateVABDays(action.payload.date, state, true)
    case 'REMOVE_SICKNESS':
      return updateSickDays(action.payload.date, state, true)
    case 'REMOVE_VACATION':
      return updateVacationDays(action.payload.date, state, true)
    case 'WORKHOURS_CHANGED':
      return {...state,
        workHours: action.payload.workHours,
        billableHours:getBillableHours(state.date, action.payload.workHours, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays),
      }
    default:
      return state
  }
}

export default CalendarReducer
