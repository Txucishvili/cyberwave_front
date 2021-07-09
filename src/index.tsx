import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import AppInit from './app/AppInit';
import template from'./assets/მთავარი გვერდი.png';

ReactDOM.render(
  <Fragment>
    <div className="_template" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      opacity: 0.4,
      display: 'none'
    }}>
      <img src={template} alt=""/>
    </div>
    <AppInit />
  </Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
