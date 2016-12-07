import mimemessage from 'mimemessage'
import fetch from 'isomorphic-fetch'
import settings from '../settings.json'
import {getCookie} from './cookie'

export const sendMessage = (subject, body) => {
  const msg = mimemessage.factory({
    contentType: 'multipart/mixed',
    body: []
  });
  msg.header('to', 'hugo.haggmark@gmail.com');
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
  console.log(msg.toString());
  console.log(options);
  fetch(settings.sendMailUri, options)
  .then(response => {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
  })
  .catch(error => console.log(error.message))
}
