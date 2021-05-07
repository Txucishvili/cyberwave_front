import React from 'react';
import ReactDOM from 'react-dom';
import AppInit from './AppInit';


window.addEventListener('load', (e) => {
  const body = document.documentElement;
  console.log('----', body);

    body.classList.value = '';
    body.classList.add('theme');
    body.classList.add('theme--'+window.localStorage.getItem('themeKey'));
    // body.body.style.opacity = '1';
})


ReactDOM.render(
  <React.StrictMode>
    <AppInit />
  </React.StrictMode>,
  document.getElementById('root')
);
// export default {}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
