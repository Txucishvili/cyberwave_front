import React, { useContext, useEffect, useState } from 'react';
import { localStorageKey, Theme, ThemeContext, ThemeContextProvider } from './store/context/ThemeContext';
import { SessionContextProvider } from './store/context/UserSession.context';
import { App } from './App';
import { LayutProvider } from './store/context/LayoutContext';
import { ResizeProvider } from './store/context/WindowResize';


export function AppInit(props: any) {
  return (
    <React.Fragment>
      <LayutProvider>
        <ResizeProvider>
          <ThemeContextProvider>
            <SessionContextProvider>
              <App />
            </SessionContextProvider>
          </ThemeContextProvider>
        </ResizeProvider>
      </LayutProvider>
    </React.Fragment>
  );
}

export default AppInit