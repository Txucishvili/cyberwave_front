import React, { createRef, forwardRef, ReactElement, Suspense, useContext, useEffect, useRef, useState } from 'react';
import './Header.scss';
import SearchBar from './SearchBar/SearchBar';


import { ReactComponent as Logo } from '../../../assets/Cyberpunk_2077_logo.svg';
import { useResizeContext } from '@store/context/WindowResize';
import InfoSide from './InfoSide';
import { useLayoutContext } from '@store/context/LayoutContext';
import { getComputedStyles } from '@utils/Functions';

import ContentGrid from '@Layout/contentGrid/contentGrid/contentGrid';
import { ContentCol } from '@Layout/contentGrid/contentCol/contentCol';
import { GridContainer, GridRow } from '@Layout/contentGrid/contentGrid/contentGrid';
import { useSessionContext } from '@store/context/UserSession.context';
// import AppNoUserComponents, { ModularSwitcher } from '@modules/index';
import UserSides from './UserSide';
import UserModularScheme from '@modules/User';
// console.log('AuthModule', AuthModule);
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

const HeaderFixed = (props: any) => {
  // const [layoutState, setLayoutState]: any = useLayoutContext();
  // const [session, setSession] = useSessionContext();
  const [session, setSession] = useSessionContext();

  console.log('[Header] HeaderFixed');

  let RightArea: any = session.modularScheme?.scheme?.HeaderSide;

  const UserView: any = session.user !== null ? <UserSides /> : null;
  return (
    <div
      onClick={() => {
        // setLayoutState(toggleFixedBar(!layoutState.fixedSide))
      }}
    >

      <div>
        <div className="contentInside flx flxAC flxJE" id="sideB">
          <div style={{ paddingRight: 10 }}>

          </div>
          <div>
            <RightArea ></RightArea>
          </div>
        </div>
      </div>
    </div>
  )
}
const getComponent = (path) => {
  const Component = React.lazy(() => import(`${path}`));
  return Component;
};
const Header = (props: any) => {
  const { wrapConfig } = props;
  const [session, setSession] = useSessionContext();

  console.log('[Header]');


  // let RightArea = session.user != null ? session.modularScheme.scheme.HeaderSide  : LoginRegisterButtons;
  // let RightArea;
  // if (!modular.isLoading) {
  //   RightArea = modular.scheme.HeaderSide
  // } else {
  //   RightArea = null
  // }


  // let RightAreas = ModularSwitcher[wrapConfig.module];
  // console.log('[RightArea]', RightAreas);
  let RightArea: any = session.modularScheme?.scheme?.HeaderSide;

  const LC = React.lazy(() => import("../../components/LoginRegister/LoginRegister"));
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
              <div className="flx">
                {/* <Suspense fallback={"Loading"}>
                  <LC />
                </Suspense> */}
                {session.isLoading ? <span>Loading</span> : null}
                {!!!session.user ?

                  <span><RightArea /></span>
                  : null}
              </div>
            </ContentCol>
          </GridRow>
        </GridContainer>
      </ContentGrid>
    </div>
  )
}

const HeaderWrapper = (props) => {

  return (
    <Header />
  );
}

export default HeaderWrapper;