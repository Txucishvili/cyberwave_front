import React, { useEffect, useState } from 'react';
import { ThemeContextProvider } from './store/context/ThemeContext';
import { SessionContextProvider } from './store/context/UserSession.context';
import { LayutProvider } from './store/context/LayoutContext';
import { ResizeProvider } from './store/context/WindowResize';
import App from './App';
import { Provider } from 'react-redux';
import store from '@store/redux';
import ModularContextProvider from '@store/context/Modular.context';
import HTTPClient from '@API/axios';


export function AppInit(props: any) {
  const [loaded, setLoad] = useState(false);
  const [user, setUser] = useState(null);
  // console.log('-mainap-', loaded);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      HTTPClient.get('user.json').then(e => {
        setUser(e.data);
        setLoad(true);
      });

    } else {
      // setSessionState({ type: 'SET_USER', value: null });
      setUser(null);
      setLoad(true);
    }
  }, []);

  if (loaded) {
    return (
      <React.Fragment>
        {/* {console.log('======')} */}
        <LayutProvider>
          <ResizeProvider>
            <ThemeContextProvider>
              <SessionContextProvider user={user}>
                {/* <Provider store={store}> */}
                {/* <App /> */}
                {/* </Provider> */}
              </SessionContextProvider>

            </ThemeContextProvider>
          </ResizeProvider>
        </LayutProvider>
      </React.Fragment >
    );
  } else {
    return null
  }
}

export default AppInit