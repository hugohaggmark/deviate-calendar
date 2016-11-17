import {getNumberOfDaysInMonth,
  formatDate,
  isWeekEnd,
  isDateInArray,
  removeDateFromArray,
  getDaysInMonthArray,
} from '../dateHelper'
import * as types from './constants'
import { constants as informationTypes } from '../Information'

const getBillableHours = (date, workHours, reportedVABDays, reportedSicknessDays, reportedVacationDays, aptitudDays) => {
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
    if(isDateInArray(d, aptitudDays)){
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
export const updateDateForArrayProperty = (date, state, property, remove = false) => {
  const newState = {...state}
  if(state[property]) {
    const newArray = remove ? removeDateFromArray(date, state[property]) : state[property].concat(date)
    newState[property] = newArray
  } else {
    newState[property] = [date]
  }

  newState.date = date
  newState.billableHours = getBillableHours(date,
    newState.workHours,
    newState.reportedVABDays,
    newState.reportedSicknessDays,
    newState.reportedVacationDays,
    newState.aptitudDays)
  newState.daysInMonth = getDaysInMonthArray(newState)

  return {...newState}
}
const initialState = {
  weekdays:['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'],
  months: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'],
  reportedVABDays: [],
  reportedSicknessDays: [],
  reportedVacationDays: [],
  holidays: [],
  aptitudDays: [],
  workHours: 0,
}
const CalendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOAD_DATES:
      const newState = {
        date: action.payload.date,
        reportedVABDays: state.reportedVABDays,
        reportedSicknessDays: state.reportedSicknessDays,
        reportedVacationDays: state.reportedVacationDays,
        aptitudDays: state.aptitudDays,
      }
      return {...state,
        date: action.payload.date,
        numberOfDaysInMonth: getNumberOfDaysInMonth(action.payload.date),
        formattedStartDate: getFormattedStartDate(action.payload.date),
        formattedEndDate: getFormattedEndDate(action.payload.date),
        billableHours:getBillableHours(action.payload.date, state.workHours, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays, state.aptitudDays),
        daysInMonth: getDaysInMonthArray(newState),
      }
    case types.REPORT_VAB:
      return updateDateForArrayProperty(action.payload.date, state, 'reportedVABDays')
    case types.REPORT_SICKNESS:
      return updateDateForArrayProperty(action.payload.date, state, 'reportedSicknessDays')
    case types.REPORT_VACATION:
      return updateDateForArrayProperty(action.payload.date, state, 'reportedVacationDays')
    case types.CLEAR_VAB:
      return updateDateForArrayProperty(action.payload.date, state, 'reportedVABDays', true)
    case types.CLEAR_SICKNESS:
      return updateDateForArrayProperty(action.payload.date, state, 'reportedSicknessDays', true)
    case types.CLEAR_VACATION:
      return updateDateForArrayProperty(action.payload.date, state, 'reportedVacationDays', true)
    case types.REPORT_APTITUDDAY:
      return updateDateForArrayProperty(action.payload.date, state, 'aptitudDays')
    case types.CLEAR_APTITUDDAY:
      return updateDateForArrayProperty(action.payload.date, state, 'aptitudDays', true)
    case informationTypes.WORKHOURS_CHANGED:
      return {...state,
        workHours: action.payload.workHours,
        billableHours:getBillableHours(state.date, action.payload.workHours, state.reportedVABDays, state.reportedSicknessDays, state.reportedVacationDays, state.aptitudDays),
      }
    default:
      return state
  }
}

export default CalendarReducer
