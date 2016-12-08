import * as types from './constants'

const InformationReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case types.COLLEAGUE_CHANGED:
      return {...state, colleague: action.payload.colleague }
    case types.CUSTOMER_CHANGED:
      return {...state, customer: action.payload.customer }
    case types.ACCOUNT_CHANGED:
      return {...state, account: action.payload.account }
    case types.PRICERATE_CHANGED:
      return {...state, pricerate: action.payload.pricerate }
    case types.WORKHOURS_CHANGED:
      return {...state, workHours: action.payload.workHours }
    case types.EMAIL_CHANGED:
      return {...state, email: action.payload.email }
    default:
      return state
  }
}

export default InformationReducer
