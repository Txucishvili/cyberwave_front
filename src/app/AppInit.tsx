import React, { useContext, useEffect, useState } from 'react';
import { localStorageKey, Theme, ThemeContext, ThemeContextProvider } from './store/context/ThemeContext';
import { SessionContextProvider } from './store/context/UserSession.context';
import { App } from './App';


export function AppInit(props: any) {
    return (
      <React.Fragment>
        <ThemeContextProvider>
          <SessionContextProvider>
            <App />
          </SessionContextProvider>
        </ThemeContextProvider>
      </React.Fragment>
    );
  }

  export default AppInit