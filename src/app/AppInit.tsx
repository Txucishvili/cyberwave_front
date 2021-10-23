import React, { useEffect, useState } from 'react';
import { ThemeContextProvider } from './store/context/ThemeContext';
import { SessionContextProvider } from './store/context/UserSession.context';
import { LayutProvider } from './store/context/LayoutContext';
import { ResizeProvider } from './store/context/WindowResize';
import App from './App';
import { Provider } from 'react-redux';
import store from '@store/redux';
import HTTPClient from '@API/axios';
import AppInitHolder from '@store/context/AppInitHolder';


export function AppInit(props: any) {

  return (
    <React.Fragment>
      <LayutProvider>
        <ResizeProvider>
          <ThemeContextProvider>
            <AppInitHolder token={window.localStorage.getItem('token')}>
              <Provider store={store}>
                <App />
              </Provider>
            </AppInitHolder>
          </ThemeContextProvider>
        </ResizeProvider>
      </LayutProvider>
    </React.Fragment >
  )
}

export default AppInit