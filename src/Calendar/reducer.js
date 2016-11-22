import {
  getNumberOfDaysInMonth,
  formatDate,
  isWeekEnd,
  isDateInArray,
  removeDateFromArray,
  getDaysInMonthArray
} from '../dateHelper'
import * as types from './constants'
import { constants as informationTypes } from '../Information'
import deviationJson from './deviations.json'

const getBillableHours = (state) => {
  const date = state.date
  const workHours = state.workHours
  const month = date.getMonth()
  const year = date.getFullYear()
  var billableHours = 0
  for (var i = 1; i <= getNumberOfDaysInMonth(date); i++) {
    let day = new Date(year, month, i)
    let alreadyAdded = false
    if (state.deviations) {
      let j = 0
      while (alreadyAdded === false && j < state.deviations.length) {
        let property = state.deviations[j].type
        let array = state[property]
        if (array && isDateInArray(day, array)) {
          billableHours -= workHours
          alreadyAdded = true
        }
        j++
      }
    }
    if (!alreadyAdded && isWeekEnd(day)) {
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
export const updateDateForArrayProperty = (payload, state, remove = false) => {
  const date = payload.date
  const property = payload.type
  const newState = {
    ...state
  }
  if (state[property]) {
    const newArray = remove
      ? removeDateFromArray(date, state[property])
      : state[property].concat(date)
    newState[property] = newArray
  } else {
    newState[property] = [ date ]
  }
  newState.date = date

  return {
    ...newState,
    billableHours: getBillableHours(newState),
    daysInMonth: getDaysInMonthArray(newState),
  }
}
const initialState = {
  weekdays: [
    'Mån',
    'Tis',
    'Ons',
    'Tor',
    'Fre',
    'Lör',
    'Sön',
  ],
  months: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  workHours: 0,
  deviations: deviationJson.deviations,
}
const CalendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOAD_DATES:
      const newState = {
        ...state,
        date: action.payload.date,
      }
      return {
        ...state,
        date: action.payload.date,
        numberOfDaysInMonth: getNumberOfDaysInMonth(action.payload.date),
        formattedStartDate: getFormattedStartDate(action.payload.date),
        formattedEndDate: getFormattedEndDate(action.payload.date),
        billableHours: getBillableHours(newState),
        daysInMonth: getDaysInMonthArray(newState)
      }
    case types.REPORT_DEVIATION:
      return updateDateForArrayProperty(action.payload, state)
    case types.CLEAR_DEVIATION:
      return updateDateForArrayProperty(action.payload, state, true)
    case informationTypes.WORKHOURS_CHANGED:
      const workHoursChangedState = {
        ...state,
        workHours: action.payload.workHours,
      }
      return {
        ...workHoursChangedState,
        billableHours: getBillableHours(workHoursChangedState)
      }
    default:
      return state
  }
}

export default CalendarReducer
