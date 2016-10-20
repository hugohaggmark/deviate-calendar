import * as types from './constants'

export const loadDatesAction = payload => ({type: types.LOAD_DATES, payload: {date: payload} })
export const reportVABAction = payload => ({type: types.REPORT_VAB, payload: {date: payload} })
export const reportSicknessAction = payload => ({type: types.REPORT_SICKNESS, payload: {date: payload} })
export const reportVacationAction = payload => ({type: types.REPORT_VACATION, payload: {date: payload} })
export const clearVABAction = payload => ({type: types.CLEAR_VAB, payload: {date: payload} })
export const clearSicknessAction = payload => ({type: types.CLEAR_SICKNESS, payload: {date: payload} })
export const clearVacationAction = payload => ({type: types.CLEAR_VACATION, payload: {date: payload} })
