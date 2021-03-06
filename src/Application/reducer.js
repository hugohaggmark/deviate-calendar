import { setCookie, getCookie } from "./cookie";

const parseHash = hash => {
  if (!hash) return;

  const regex = /access_token=(.+)&token_type=Bearer&expires_in=(\d+)/g;
  const matches = regex.exec(hash);
  if (matches && matches.length === 3) {
    return {
      access_token: matches[1],
      expires: matches[2]
    };
  }
};

const ApplicationReducer = (state = { showSpinner: false }, action = {}) => {
  switch (action.type) {
    case "Authorize":
      const token = getCookie("deviate-calendar");
      if (!token) {
        return { ...state };
      }
      return { ...state, id: token };
    case "Authenticated":
      const google = parseHash(action.payload);
      setCookie("deviate-calendar", google.access_token, parseInt(google.expires, 10));
      window.location.href = window.location.origin + process.env.PUBLIC_URL + "/";
      return { ...state, id: google.access_token };
    case "ShowSpinner":
      return { ...state, showSpinner: true };
    case "HideSpinner":
      return { ...state, showSpinner: false };
    default:
      return { ...state };
  }
};

export default ApplicationReducer;
