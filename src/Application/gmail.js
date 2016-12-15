import mimemessage from 'mimemessage'
import fetch from 'isomorphic-fetch'
import settings from '../settings.json'
import {getCookie} from './cookie'
import {track} from './stats'

export const sendMessage = (hideSpinner, to, subject, body, colleague) => {
  const msg = mimemessage.factory({
    contentType: 'multipart/mixed',
    body: []
  });
  msg.header('to', to);
  msg.header('subject', subject);
  const htmlEntity = mimemessage.factory({
    contentType: 'text/html;charset=utf-8',
    body: body
  });
  msg.body.push(htmlEntity);
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + getCookie('deviate-calendar'),
      'Content-Type': 'message/rfc822'
    },
    body: msg.toString()
  }
  fetch(settings.sendMailUri, options)
  .then(response => {
      hideSpinner()
      if (response.status >= 400) {
          track('send e-mail', `failed|${to}|${colleague}` )
          throw new Error("Bad response from Google");
      } else {
        track('send e-mail', `success|${to}|${colleague}`)
      }
  })
  .catch(error => console.log(error.message))
}
