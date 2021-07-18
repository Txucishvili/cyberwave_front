import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import Content from './Content/Content';
import './Layout.scss';
import { Scrollbar } from "react-scrollbars-custom";
import { LayoutContext, useLayoutContext } from 'app/store/context/LayoutContext';

const LayoutOverlay = () => {
  const [layoutParams, dispatchLayout]: any = useLayoutContext();
  const [hideOver, setHideOver] = useState(layoutParams.navOpened);
  const [overlay, setOverlay] = useState(layoutParams.navOpened);

  useEffect(() => {
    setOverlay(layoutParams.navOpened);
  }, [layoutParams.navOpened])

  return (
    <Fragment>
      {hideOver ? <div className={['overlay', overlay ? 'active' : ''].join(' ')}
        onClick={() => dispatchLayout({ navOpened: false })}
      ></div> : null}
    </Fragment>
  )
}

const Layout = (props: any) => {
  // const [layoutParams, dispatchLayout]: any = useLayoutContext();
  console.log('------- apppppppp');

  return (
    // <div className={["layout layout--wrapper", hideOver ? 'active' : ''].join(' ')}>
    <div>
      <Router>
        <NavBar />
        <Content {...props} />

        <LayoutOverlay />

      </Router>

    </div>
  )
}

export default Layout;