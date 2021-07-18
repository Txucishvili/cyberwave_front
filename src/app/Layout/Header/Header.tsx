import React, { Suspense, useEffect, useRef, useState } from 'react';
import './Header.scss';
import SearchBar from './SearchBar/SearchBar';


import { ReactComponent as Logo } from '../../../assets/Cyberpunk_2077_logo.svg';
import { ReactComponent as Logo2 } from '../../../assets/Cyberpunk_2077_logo_red.svg';
import { useResizeContext } from 'app/store/context/WindowResize';
import ReactDOM, { createPortal } from 'react-dom';
import InfoSide from './InfoSide';
// import UserSide from './UserSide';
import usePortal from 'app/utils/usePortal';
import { toggleFixedBar, useLayoutContext } from 'app/store/context/LayoutContext';
import { getComputedStyles } from 'app/utils/Functions';

import ContentGrid from 'app/Layout/contentGrid/contentGrid/contentGrid';
import { ContentCol } from 'app/Layout/contentGrid/contentCol/contentCol';
import { GridContainer, GridRow } from 'app/Layout/contentGrid/contentGrid/contentGrid';
import { ResizeService } from 'app/store/context/WindowResize';
import AuthSwitch from 'app/utils/Authorized';
import { useSessionContext } from 'app/store/context/UserSession.context';
// import UserSides, { UserSideLoader } from './UserSide';
import LoginRegisterButtons from 'app/components/LoginRegister/LoginRegister';
import Loadable from 'react-loadable';
import LoadableC from 'app/utils/Loadable';
import { UsersModuleLazy } from 'app/modules/User';
import { LoadableWrap, UserSideLoader } from '../../modules/User';

const HeaderX = (props: any) => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [layoutState, setLayoutState]: any = useLayoutContext();
  const [value, setValue]: any = useState(false);
  console.log('[HEADER]');

  useEffect(() => {
    // console.log('windowSize', windowSize);
    const sideA: any = document.getElementById('sideA');
    const sideB: any = document.getElementById('sideB');
    const movableEl: any = document.getElementById('movableEl');

    const shrinkSize = getComputedStyles('--bp-layout-shrink-size-2');
    const shrinkSize2 = getComputedStyles('--bp-layout-shrink-size');
    console.log('shrinkSize2', shrinkSize);
    console.log('shrinkSize2', shrinkSize2);
    if (userSideRef.current) {
      console.log('userSideRef', userSideRef.current.clientWidth);
    }

    if (windowSize.innerWidth >= shrinkSize2 && windowSize.innerWidth <= shrinkSize) {
      // sideA.appendChild(movableEl);
      return;
    }

    if (windowSize.innerWidth <= shrinkSize) {
      // sideB.appendChild(movableEl);
    }

  }, [windowSize])

  function onLogoClick() {
  }

  const userSideRef: any = useRef(null);

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
                  {windowSize.innerWidth >= 1750 ?
                    <InfoSide /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            ['content-side', layoutState.fixedSide && windowSize.innerWidth >= 1802 ? 'opened' : 'closed']
              .join(' ')
          }
        >
          <div className="contentInside flx flxAC flxJE" id="sideB">
            {windowSize.innerWidth <= 1750 ?
              <div style={{ paddingRight: 10 }}>
                <InfoSide />
              </div>
              : null}
            {/* <div ref={userSideRef}><UserSide /></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}


// const Loader = () => {
//   return (<div>Loading</div>)
// }

// const LoadableC = Loadable({
//   loader: () => import('./UserSide'),
//   loading: Loader,
// })
const HeaderFixed = (props: any) => {
  // const [layoutState, setLayoutState]: any = useLayoutContext();
  const [session, setSession]: any = useSessionContext();
  // console.log('[HeaderFixed]', session);

  return (
    <div
      onClick={() => {
        // setLayoutState(toggleFixedBar(!layoutState.fixedSide))
      }}
    >
      <div>
        <div className="contentInside flx flxAC flxJE" id="sideB">
          <div style={{ paddingRight: 10 }}>
            {/* <InfoSide /> */}
          </div>
          <div>
            {/* <UserSides></UserSides> */}
            {session.user !== null
              ?
              <LoadableWrap fallback={<UserSideLoader />}>
                {!session.user.roles.includes('2')
                  ? <UsersModuleLazy.HeaderSide></UsersModuleLazy.HeaderSide>
                  : <UsersModuleLazy.HeaderSideAdmin></UsersModuleLazy.HeaderSideAdmin>}
              </LoadableWrap>
              : <LoginRegisterButtons />
            }

          </div>
        </div>
      </div>
    </div>
  )
}

// console.log('------------ [HEADER] ------------');

const Header = (props: any) => {

  // console.log('[HEADER]');


  return (
    <div className="header header--wrapper">
      <ContentGrid
        contentSide={
          <HeaderFixed />
        }
      >
        <GridContainer>
          <GridRow>
            <ContentCol small>
              <div className="el fAll">
                <div className="logo--area fAll"
                  style={{ maxWidth: 280 }}>

                  <Logo style={{ width: '100%', height: '100%' }}
                  // onClick={onLogoClick}
                  />

                </div>
              </div>
            </ContentCol>
            <ContentCol large>
              <SearchBar />
            </ContentCol>
            <ContentCol small className={['side-c flx flxAC flxJE']}>
              <InfoSide />
            </ContentCol>
          </GridRow>
        </GridContainer>
      </ContentGrid>
    </div>
  )
}

export default Header;