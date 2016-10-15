import {getNumberOfDaysInMonth,
  formatDate,
  isWeekEnd,
  isDateInArray,
  removeDateFromArray,
} from '../dateHelper'

const getBillableHours = (date, reportedVABDays, reportedSicknessDays, reportedVacationDays) => {
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
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays),
      }
    case 'REPORT_VAB':
      const newVABDaysArray = state.reportedVABDays.concat(action.payload.date)
      return {...state,
        reportedVABDays: newVABDaysArray,
        billableHours:getBillableHours(action.payload.date, newVABDaysArray, state.reportedSicknessDays, state.reportedVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, newVABDaysArray, state.reportedSicknessDays, state.reportedVacationDays),
      }
    case 'REPORT_SICKNESS':
      const newSicknessDaysArray = state.reportedSicknessDays.concat(action.payload.date)
      return {...state,
        reportedSicknessDays: newSicknessDaysArray,
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, newSicknessDaysArray, state.reportedVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, state.reportedVABDays, newSicknessDaysArray, state.reportedVacationDays),
      }
    case 'REPORT_VACATION':
      const newVacationDays = state.reportedVacationDays.concat(action.payload.date)
      return {...state,
        reportedVacationDays: newVacationDays,
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, newVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, newVacationDays),
      }
    case 'REMOVE_VAB':
      const removeVABDays = removeDateFromArray(action.payload.date, state.reportedVABDays)
      return {...state,
        reportedVABDays: removeVABDays,
        billableHours:getBillableHours(action.payload.date, removeVABDays, state.reportedSicknessDays, state.reportedVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, removeVABDays, state.reportedSicknessDays, state.reportedVacationDays),
      }
    case 'REMOVE_SICKNESS':
      const removeSicknessDays = removeDateFromArray(action.payload.date, state.reportedSicknessDays)
      return {...state,
        reportedSicknessDays: removeSicknessDays,
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, removeSicknessDays, state.reportedVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, state.reportedVABDays, removeSicknessDays, state.reportedVacationDays),
      }
    case 'REMOVE_VACATION':
      const removeVacationDays = removeDateFromArray(action.payload.date, state.reportedVacationDays)
      return {...state,
        reportedVacationDays: removeVacationDays,
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, removeVacationDays),
        daysInMonth: getDaysInMonthArray(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, removeVacationDays),
      }
    default:
      return state
  }
}

export default CalendarReducer
