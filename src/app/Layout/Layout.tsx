import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import Content from './Content/Content';
import './Layout.scss';
import { Scrollbar } from "react-scrollbars-custom";
import { LayoutContext } from 'app/store/context/LayoutContext';
import ContentSide from './contentSide/contentSide';



const Layout = (props: any) => {
  const [layoutParams, dispatchLayout]: any = useContext(LayoutContext);
  const [overlay, setOverlay] = useState(layoutParams.navOpened);
  const [hideOver, setHideOver] = useState(layoutParams.navOpened);

  const setTimer = setTimeout(() => {
    setHideOver(layoutParams.navOpened);
  }, 125);

  useEffect(() => {
    setOverlay(layoutParams.navOpened);
  }, [layoutParams.navOpened])

  return (
    <div className={["layout layout--wrapper", hideOver ? 'active' : ''].join(' ')}>
      <Router>
        <NavBar />
        <Content />
        
        {hideOver ? <div className={['overlay', overlay ? 'active' : ''].join(' ')}
          onClick={() => dispatchLayout({ navOpened: false })}
        ></div> : null}

      </Router>

    </div>
  )
}

export default Layout;