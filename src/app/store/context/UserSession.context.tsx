import HTTPClient from "@API/axios";
import LoginRegisterButtons from "@components/LoginRegister/LoginRegister";
// import UserSides from "@Layout/Header/UserSide";
import React, {
  createContext,
  Fragment,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import Loadable from 'react-loadable';
import AppSwitcherProvider from "@store/context/AppInitHolder";

export type MODULE_SCHEME_TYPES = {
  HeaderSide: any,
  RouterSettings?
}

export type Session = {
  isAuthenticated?: boolean;
  redirectPath?: string;
  sId?: string | null;
  token?: string | null;
  user?: any | undefined | null;
  sessionStartTime?: any;
  sessionEndTime?: any;
  isLoggedIn?: boolean | null;
  isLoading?: boolean | null;
  modularScheme?: {
    prefix: string | null,
    scheme: MODULE_SCHEME_TYPES | null
  };
}

interface Dispatcher {
  type: string,
  value?: any;
}

export interface userDispatcher {
  type: string,
  value: {
    user: any,
    modularScheme: {
      prefix: string | null,
      scheme: MODULE_SCHEME_TYPES | null
    };
  };
}

export const initialSession: Session = {
  redirectPath: '',
  sId: null,
  user: undefined,
  token: window.localStorage.getItem('token'),
  sessionStartTime: new Date().getTime(),
  isLoggedIn: null,
  isLoading: null,
  modularScheme: {
    prefix: null,
    scheme: null
  }
};


export const SessionContext = createContext<[Session, (s: Dispatcher) => void]>([initialSession, () => { }]);
export const useSessionContext = () => useContext(SessionContext);

function sessionReducer(state: Session, action: Session | any): any {
  const { type, value } = action;
  const obj: Session = {};

  switch (type) {
    case 'SET_USER':
      const { user, modularScheme, token } = value;
      Object.assign(obj, { token: token, user: user, isLoggedIn: !!user, isLoading: false });
      if (user != null) {
        Object.assign(obj, { });
        // window.localStorage.removeItem('token')
      }
      if (!!modularScheme) {
        Object.assign(obj, { modularScheme });
      }
      console.log('-------', obj);
      break;
    case 'SET_LOADER':
      Object.assign(obj, { isLoading: value, });
      break;
    case 'LOG_OUT':
      Object.assign(obj, {
        isLoading: false, 
        user: null, 
        token: null,
        modularScheme: value.modularScheme
      } as Session);
      window.localStorage.removeItem('token');
      break;
    case 'SET_MODULES':
      Object.assign(obj, { modularScheme: value });
      break;
    default:
      break;
  }

  // console.log('[sessionReducer] state', obj);

  return Object.assign({}, state, obj);
}

export const SessionContextProviders: React.FC<any> = (props) => {
  const [sessionState, setSessionState]
    : [Session, (session: Dispatcher) => void]
    = React.useReducer(sessionReducer, Object.assign(initialSession, props))

  useEffect(() => {
    // console.log('sessionState.user', sessionState.user);
    const user = sessionState.user;
    if (user == null) {

      return;
    }

  }, [sessionState.user]);

  console.log('INIT [SessionContextProvider]', sessionState);

  return (
    <SessionContext.Provider value={[sessionState, setSessionState]}>
      {props.children}
    </SessionContext.Provider>
  );
}

export const SessionContextProvider = React.memo(SessionContextProviders, () => true)