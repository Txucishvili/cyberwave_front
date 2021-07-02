import React, { useContext, useEffect, useState } from 'react';
import { localStorageKey, Theme, ThemeContext, ThemeContextProvider } from './store/context/ThemeContext';
import { SessionContextProvider } from './store/context/UserSession.context';
import { App } from './App';
import { LayutProvider } from './store/context/LayoutContext';


export function AppInit(props: any) {
  return (
    <React.Fragment>
      <LayutProvider>
        <ThemeContextProvider>
          <SessionContextProvider>
            <App />
          </SessionContextProvider>
        </ThemeContextProvider>
      </LayutProvider>
    </React.Fragment>
  );
}

export default AppInit