const InfoReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'COLLEAGUE_CHANGED':
      return {...state, colleague: action.payload.colleague }
    case 'CUSTOMER_CHANGED':
      return {...state, customer: action.payload.customer }
    case 'ACCOUNT_CHANGED':
      return {...state, account: action.payload.account }
    case 'PRICERATE_CHANGED':
      return {...state, pricerate: action.payload.pricerate }
    default:
      return state
  }
}

export default InfoReducer
