import * as constants from './constants'

export const authorizeAction      = () => ({type: constants.AUTHORIZE})
export const authenticatedAction  = payload => ({type:constants.AUTHENTICATED, payload: payload})
export const showSpinnerAction    = () => ({type: constants.SHOWSPINNER})
export const hideSpinnerAction    = () => ({type: constants.HIDESPINNER})
