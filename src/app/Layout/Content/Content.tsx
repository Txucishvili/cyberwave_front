import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink, Link
} from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import AppPages from '../../pages';
import './Content.scss';
import Header from '../Header/Header';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';

const Content = (props: any) => {
  const height = useRef(null);


  useEffect(() => {
    //     console.log(height);
  })

//   console.log('-------------------');
  return (
    <div className="content content--wrapper">

      <Header />

      <div className="content--inside--wrap">
        <React.Suspense fallback={<span>Loading...</span>}>
          <Switch>
            <Route exact path="/" render={() =>
              <AppPages.HomePage data={props.data} />} />
            <Route exact path="/list" render={(e) =>
              <AppPages.ListPage props={e} />} />
            <Route exact path="/user" render={(e) =>
              <AppPages.UserPage props={e} />} />
          </Switch>
        </React.Suspense>
      </div>

    </div>
  )
}

export default Content;