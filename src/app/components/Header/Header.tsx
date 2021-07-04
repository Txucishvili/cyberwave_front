import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import SearchBar from './SearchBar/SearchBar';

import { ReactComponent as Logo } from '../../../assets/Cyberpunk_2077_logo.svg';
import { ReactComponent as Logo2 } from '../../../assets/Cyberpunk_2077_logo_red.svg';
import { useResizeContext } from 'app/store/context/WindowResize';
import ReactDOM, { createPortal } from 'react-dom';
import InfoSide from './InfoSide';
import UserSide from './UserSide';
import usePortal from 'app/utils/usePortal';

const Header = (props: any) => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [value, setValue]: any = useState(false);

  useEffect(() => {
    // console.log('windowSize', windowSize);
    const sideA: any = document.getElementById('sideA');
    const sideB: any = document.getElementById('sideB');
    const movableEl: any = document.getElementById('movableEl');

    if (windowSize.innerWidth >= 1690) {
      sideB.appendChild(movableEl);
    } else {
      sideA.appendChild(movableEl);
    }

  }, [windowSize])

  function onLogoClick() {
  }

  return (
    <div className="header header--wrapper">
      <div className="content--grid content--grid--wrap">
        <div className="content-main content-main--wrap">
          <div className="content-main--content">
            <div className="container">
              <div className="row">
                <div className="colEl col-sm side-a">
                  <div className="el fAll">
                    <div className="logo--area fAll"
                      style={{ maxWidth: 280 }}>

                      <Logo style={{ width: '100%', height: '100%' }}
                        onClick={onLogoClick}
                      />

                    </div>
                  </div>
                </div>
                <div className="colEl col-xl side-b">
                  <SearchBar />
                </div>
                <div className="colEl col-sm side-c flx">
                  <InfoSide />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-side">
          <div className="contentInside flx flxAC flxJE" id="sideB">
            <UserSide />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;