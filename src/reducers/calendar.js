import {getNumberOfDaysInMonth, formatDate} from '../dateHelper'

const getBillableHours = (date, reportedVABDays, reportedSicknessDays, reportedVacationDays) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  var billableHours = 0
  for (var i = 1; i <= getNumberOfDaysInMonth(date); i++) {
    var d = new Date(year, month, i)
    if(d.getDay() === 0 || d.getDay() === 6){
      continue
    }
    if(reportedVABDays.map(Number).indexOf(+d) >= 0){
      continue
    }
    if(reportedSicknessDays.map(Number).indexOf(+d) >= 0){
      continue
    }
    if(reportedVacationDays.map(Number).indexOf(+d) >= 0){
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
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, state.reportedSicknessDays),
      }
    case 'REPORT_VAB':
      const newVABDaysArray = state.reportedVABDays.concat(action.payload.date)
      return {...state,
        reportedVABDays: newVABDaysArray,
        billableHours:getBillableHours(action.payload.date, newVABDaysArray, state.reportedSicknessDays, state.reportedVacationDays),
      }
    case 'REPORT_SICKNESS':
      const newSicknessDaysArray = state.reportedSicknessDays.concat(action.payload.date)
      return {...state,
        reportedSicknessDays: newSicknessDaysArray,
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, newSicknessDaysArray, state.reportedVacationDays),
      }
    case 'REPORT_VACATION':
      const newVacationDays = state.reportedVacationDays.concat(action.payload.date)
      return {...state,
        reportedVacationDays: newVacationDays,
        billableHours:getBillableHours(action.payload.date, state.reportedVABDays, state.reportedSicknessDays, newVacationDays),
      }
    default:
      return state
  }
}

export default CalendarReducer
