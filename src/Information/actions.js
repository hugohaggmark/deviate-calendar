import * as types from './constants'

export const colleagueChangedAction = payload => ({type: types.COLLEAGUE_CHANGED, payload: {colleague: payload} })
export const customerChangedAction  = payload => ({type: types.CUSTOMER_CHANGED, payload: {customer: payload} })
export const accountChangedAction   = payload => ({type: types.ACCOUNT_CHANGED, payload: {account: payload} })
export const pricerateChangedAction = payload => ({type: types.PRICERATE_CHANGED, payload: {pricerate: payload} })
export const workHoursChangedAction = payload => ({type: types.WORKHOURS_CHANGED, payload: {workHours: payload} })
