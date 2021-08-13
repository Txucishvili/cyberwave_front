import React, { createRef, forwardRef, ReactElement, useContext, useEffect, useRef, useState } from 'react';
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
import LoginRegisterButtons from '@components/LoginRegister/LoginRegister';
import { useSessionContext } from '@store/context/UserSession.context';
// import AppNoUserComponents, { ModularSwitcher } from '@modules/index';
import AuthModule from '@modules/Auth/Authentication.module';
import withModular from '@utils/withModular';
import ModularContextProvider, { useModular, ModularContext } from '@store/context/Modular.context';
import UserSides from './UserSide';
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
  const [modular, setModular] = useModular();
  const [session, setSession] = useSessionContext();

  console.log('[HeaderFixed]', modular);

  let RightArea: any = InfoSide;


  // const SwitchView = ModularSwitcher[props.modular.module].HeadSwitch;
  // console.log('SwitchView', props.modular.module);

  // if (session.user !== null) {
  //   RightArea = <UsersModuleLazy.HeaderSide></UsersModuleLazy.HeaderSide>
  // } else {
  //   RightArea = <AppNoUserComponents.LoginRegisterButton />
  // }

  const UserView: any = session.user !== null ? <UserSides /> : null;
  console.log('UserView', UserView);
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
            {session.user ? <UserSides /> : null}
            {/* <UserSides></UserSides> */}
            {/* {session.user !== null
              ?
              <LoadableWrap fallback={<UserSideLoader />}>
                {!session.user.roles.includes('2')
                  ? <UsersModuleLazy.HeaderSide></UsersModuleLazy.HeaderSide>
                  : <UsersModuleLazy.HeaderSideAdmin></UsersModuleLazy.HeaderSideAdmin>}
              </LoadableWrap>
              : !session.token ? <AppNoUserComponents.LoginRegisterButton /> : null
            } */}

            {/* <LoadableWrap fallback={<UserSideLoader />}>
              <RightArea>
                {props.wrapConfig && props.wrapConfig.merge ? <InfoSide /> : null}
              </RightArea>
            </LoadableWrap> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const Header = (props: any) => {
  const { wrapConfig } = props;
  const [session, setSession] = useSessionContext();
  const [modular, setModular] = useModular();
  // console.log('HeaderFixed', modular);

  // console.log('--- header', modular.scheme);
  
 
  let RightArea = session.user ? InfoSide : LoginRegisterButtons;
  // let RightArea;
  // if (!modular.isLoading) {
  //   RightArea = modular.scheme.HeaderSide
  // } else {
  //   RightArea = null
  // }


  // let RightAreas = ModularSwitcher[wrapConfig.module];
  // console.log('[RightArea]', RightAreas);

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
              
              <RightArea />
              {/* {wrapConfig && wrapConfig.merge ? null : <InfoSide />} */}
            </ContentCol>
          </GridRow>
        </GridContainer>
      </ContentGrid>
    </div>
  )
}

const HeaderWrapper = (props) => {
  const [windowSize, setResizeState] = useResizeContext();
  const [wrapConfig, setWrapConfig]: [{ merge: boolean } | null, any] = useState({
    merge: window.innerWidth <= 1835
  });
  const contentSideRef = useRef();
  console.log('[HeaderWrapper]');

  // console.log('[HeaderWrapper]');

  useEffect(() => {
    const targetEl = document.querySelector('#sideB');
    // console.log('[windowSize]', { targetEl: targetEl?.clientWidth, windowSize });

    // if (wrapConfig == null) {
    if (windowSize.innerWidth <= 1835) {
      setWrapConfig({ merge: true })
    } else {
      setWrapConfig({ merge: false })
    }
    // }
  }, [windowSize]);


  return (
    <HeaderMemo wrapConfig={wrapConfig} />
  );
}

const areEqual = (prevProps, nextProps) => {

  // return true; 
  // console.log('[areEqual]', prevProps, nextProps);
  // if (nextProps.modular.module !== prevProps.modular.module) {
  //   return false;
  // }

  if (nextProps.wrapConfig !== null && prevProps.wrapConfig !== null) {
    if (prevProps.wrapConfig.merge !== nextProps.wrapConfig.merge) {
      return false;
    } else {
      return true;
    }
  }

  return false;
};

const HeaderMemo = React.memo(Header, areEqual);

export default HeaderWrapper;