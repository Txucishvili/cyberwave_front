import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink, Link
} from 'react-router-dom';

import AppPages from './pages';
import { SessionContextProvider } from './store/context/UserSession.context';
import { ThemeContext, ThemeContextProvider } from './store/context/ThemeContext';
import NavBar from './components/Navbar/NavBar';
import Layout from './components/Layout/Layout';
import Scrollbar from 'react-scrollbars-custom';
import { useResizeContext } from './store/context/WindowResize';
// import _ from 'lodash';
// console.log('a', _.partition([1, 2, 3, 4], n => n % 2));

export function App(props: any) {
  const [theme, setTheme]: any = useContext(ThemeContext);
  const themectx: any = useContext(ThemeContext);
  const [windowSize, setResizeState]: any = useResizeContext();

  useEffect(() => {
//     console.log('windowSize', windowSize.innerWidth, windowSize.prevWidth);
  }, [windowSize.innerWidth])

  useEffect(() => {
    // console.log('-------', ThemeContext);
    const body = document.documentElement;
    body.classList.value = '';
    body.classList.add('theme', 'theme--' + theme.activeName);
    window.localStorage.setItem('theme', theme.activeName);
  }, [theme, theme.activeKey, theme.activeName]);

  const elRef = (e: any) => {
    //     console.log('sccrollbar Ref', e);
  }

  const onScroll = (e: any) => {
    const {
      clientHeight,
      clientWidth,
      contentScrollHeight,
      contentScrollWidth,
      scrollHeight,
      scrollLeft,
      scrollTop
    } = e;
    const scrollSize = contentScrollHeight - clientHeight - scrollTop;

    if (scrollSize == 50) {

    }

    // console.log('[onScroll]', contentScrollHeight - clientHeight - scrollTop);
  }

  return (
    <React.Fragment>
      {/* <Layout /> */}

      <Scrollbar
        // disableTracksWidthCompensation={true}
        // permanentTrackY={true}
        createContext={true}
        // scrollbarWidth={27}
        // fallbackScrollbarWidth={27}
        // native
        thumbXProps={{
          // eslint-disable-next-line react/display-name
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return <span {...restProps} ref={elementRef} className="ThUmBX" />;
          }
        }}
        elementRef={elRef}
        onScroll={onScroll}
        style={{ width: '100%', height: '100%' }}
      >
        <Layout />

      </Scrollbar>
      {/* <div style={{ display: 'flex' }}>
        {theme.themes.map((el: any, key: any) => {
          // eslint-disable-next-line react/jsx-key
          return <div key={key} style={{
            cursor: 'pointer',
            color: '#000',
            display: 'flex',
            backgroundColor: el.name,
            padding: '6px 11px',
            marginRight: '15px',
            border: el.name == theme.activeKey ? '1px solid #fff' : '1px solid transparent'
          }} onClick={() => {
            // console.log('set theme ', el);
            setTheme({ value: el.name })
          }}
          >
            <div>{el.name}</div>
          </div>
        })}
        <div>
          <span><em>Active Theme:</em> <b>{theme.activeKey} - (null)</b></span>
        </div>
      </div> */}
    </React.Fragment>
  );
}

export default { App };
