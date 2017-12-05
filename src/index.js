/* global NODE_ENV */
import React from 'react';
import { render } from 'react-dom';
import App from 'App';

const element = document.getElementById('content');
const dummyToken = process.env.DUMMY_TOKEN || 'dummyAuthToken';
// Added for development
if (NODE_ENV === 'development') {
  // Set dummy tokens for development
  window.localStorage.setItem('authToken', dummyToken);
  window.localStorage.setItem('refreshToken', 'dummyRefreshToken');
} else if (NODE_ENV === 'development_production') {
  // Remove tokens so that new ones can be obtained
  window.localStorage.removeItem('authToken');
  window.localStorage.removeItem('refreshToken');
}

const SESSION_TIME_OUT = 3600000;// Session Timeout for 1 hr
let lastActivityTime = new Date().getTime();
let inactivityTimer = null;
const inactivityDetector = () => {
  const currentTime = new Date().getTime();
  const inactivityTime = currentTime - lastActivityTime;
  clearTimeout(inactivityTimer);// clear the timer
  if (inactivityTime >= SESSION_TIME_OUT) { // remove the tokens
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('refreshToken');
  } else { // restart the timer for the difference interval
    const diffInterval = SESSION_TIME_OUT - inactivityTime;
    inactivityTimer = setTimeout(inactivityDetector, diffInterval);
  }
};
inactivityTimer = setTimeout(inactivityDetector, SESSION_TIME_OUT);

document.onmousemove = () => {
  lastActivityTime = new Date().getTime();
};
document.onmousedown = () => {
  lastActivityTime = new Date().getTime();
};
document.onkeydown = () => {
  lastActivityTime = new Date().getTime();
};

render(<App />, element);
