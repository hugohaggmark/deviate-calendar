import store from '../../../index.js'

window.handleGoogleClientLoad = () => {
  console.log('handleGoogleClientLoad');
  tryAuthorize(true);
}

function tryAuthorize(immediate) {
  console.log('tryAuthorize');
  /*eslint-disable no-undef*/
  gapi.auth.authorize(
    {
      /*eslint-disable camelcase*/
      client_id: '332802020456-7t5ooonifnr7sphjvimnr7h13o4hv6j9.apps.googleusercontent.com',
      /*eslint-enable*/
      scope: 'https://www.googleapis.com/auth/gmail.modify',
      immediate
    },
    whenAuthenticated
  );
  /*eslint-enable*/
}

function whenAuthenticated(authResult) {
  console.log('authResult', authResult);
  if (authResult && !authResult.error) {
    store.dispatch({type:'Authenticated', payload:{...authResult}})
    // /*eslint-disable no-undef*/
    // gapi.client.load('gmail', 'v1')
    //   .then(() => {
    //     store.dispatch({type:'Authenticated', payload:{token: authResult.access_token, authResult:authResult}})
    //   })
    /*eslint-enable*/
  } else {
    console.log('Not Ok');
  }
}

module.exports = {
  login: tryAuthorize.bind(null, /*immediate*/ false),
}
