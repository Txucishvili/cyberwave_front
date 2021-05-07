import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink ,Link} from 'react-router-dom';

import AppPages from './pages';
import { SessionContextProvider } from './store/context/UserSession.context';
import { ThemeContext, ThemeContextProvider } from './store/context/ThemeContext';
import NavBar from './components/NavBar';
// import _ from 'lodash';
// console.log('a', _.partition([1, 2, 3, 4], n => n % 2));

export function App(props: any) {
  const [theme, setTheme]: any = useContext(ThemeContext);
  // const [activeState, setActiveTheme]: any = useState(theme.themes.find((e: any) => e.name == theme.activeName));
  // console.log('[app theme]', theme);
  const datas = [theme, setTheme]
  // setTheme('gray');

  useEffect(() => {
    // const body = document.documentElement;
    // body.classList.value = '';
    // body.classList.add('theme');
    // body.classList.add('theme--'+theme.activeName);
  }, [theme.activeKey, theme.activeName]);

  
  return (
      <React.Fragment>
        <Router>
          <NavBar />
          <React.Suspense fallback={<span>Loading...</span>}>
            <Switch>
              <Route exact path="/" render={()=>
                <AppPages.HomePage /> } />
                <Route exact path="/list" render={(e)=>
                  <AppPages.ListPage props={e} /> } />
                  <Route exact path="/user" render={(e)=>
                    <AppPages.UserPage props={e} theme={datas} /> } />
            </Switch>
          </React.Suspense>
        </Router>
        <div style={{display: 'flex'}}>
          {theme.themes.map((el: any, key: any) => {
          // eslint-disable-next-line react/jsx-key
          return <div  key={key} style={{
                cursor:'pointer', 
                color: '#000', 
                display:'flex', 
                backgroundColor: el.name, 
                padding: '6px 11px', 
                marginRight: '15px',
                border: el.name == theme.activeKey ? '1px solid #fff' : '1px solid transparent'
            }} onClick={()=> {
            // console.log('set theme ', el);
            setTheme({value: el.name })
            }}
            >
            <div>{el.name}</div>
          </div>
          })}
          <div>
            <span><em>Active Theme:</em> <b>{theme.activeKey} - (null)</b></span>
          </div>
        </div>
      </React.Fragment>
);
}

export default {App};
