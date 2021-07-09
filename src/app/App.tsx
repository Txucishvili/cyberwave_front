import React, { useContext, useEffect, useRef, useState } from 'react';
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
import NavBar from './Layout/Navbar/NavBar';
import Layout from './Layout/Layout';
import Scrollbar from 'react-scrollbars-custom';
import { useResizeContext } from './store/context/WindowResize';
import { ScrollbarContext, ScrollbarProvider } from './store/context/ScrollBarContext';
// import _ from 'lodash';
// console.log('a', _.partition([1, 2, 3, 4], n => n % 2));

export function App(props: any) {
  const [theme, setTheme]: any = useContext(ThemeContext);
  const themectx: any = useContext(ThemeContext);
  const [scrollState, setScrollState]: any = useState({});

  useEffect(() => {
    // console.log('-------', ThemeContext);
    const body = document.documentElement;
    body.classList.value = '';
    body.classList.add('theme', 'theme--' + theme.activeName);
    window.localStorage.setItem('theme', theme.activeName);
  }, [theme, theme.activeKey, theme.activeName]);

  const elRef: any = useRef(null);

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

    // setScrollState(e);

    // console.log('----- [onScrol]', e.scrollTop);

  }

  return (
    <React.Fragment>
      {/* <Layout /> */}

      <ScrollbarProvider
        onScroll={onScroll}
      >
        <Layout
          // onScroll={onScroll}
          data={'test'}

        />
      </ScrollbarProvider>

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
