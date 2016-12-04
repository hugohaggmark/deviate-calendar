const ApplicationReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'Authenticated':
      console.log(action.payload.access_token);
      sessionStorage.setItem('token', action.payload.token)
      window.location.href = '/'
      return {...state, gmail: action.payload.gmail }
    default:
      return {}
  }
}

export default ApplicationReducer
