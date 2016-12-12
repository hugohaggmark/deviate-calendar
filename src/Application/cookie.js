export const setCookie = (name, value, maxage) => {
    const date = new Date()
    date.setSeconds(date.getSeconds() + maxage)
    const expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const getCookie = name => {
  var cname = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
      }
  }
  return "";
}
