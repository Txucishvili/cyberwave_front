import HTTPClient from "@API/axios";
import LoginRegisterButtons from "@components/LoginRegister/LoginRegister";
// import UserSides from "@Layout/Header/UserSide";
import AuthModule from "@modules/Auth/Authentication.module";
import React, {
  createContext,
  Fragment,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import Loadable from 'react-loadable';
import ModularContextProvider, { ModularContext, useModular } from '@store/context/Modular.context';
import ModularScheme from "@modules/User";

export type Session = {
  isAuthenticated?: boolean;
  redirectPath: string;
  sId: string | null;
  token: string | null;
  user?: any;
  sessionStartTime?: any;
  sessionEndTime?: any;
  isLoggedIn: boolean | null;
  isLoading?: boolean | null;
}

interface Dispatcher {
  type: string,
  value: any;
}

export const initialSession: Session = {
  redirectPath: '',
  sId: null,
  user: null,
  token: window.localStorage.getItem('token'),
  sessionStartTime: new Date().getTime(),
  isLoggedIn: null,
  isLoading: null,
};

export const SessionContext = createContext<[Session, (session: Dispatcher) => void]>([initialSession, () => { }]);
export const useSessionContext = () => useContext(SessionContext);


function sessionReducer(state: Session, action: Session | any): any {
  const { type, value } = action;
  const obj: Session | any = {};

  switch (type) {
    case 'SET_USER':
      Object.assign(obj, { token: 'value', user: value, isLoggedIn: !!value, isLoading: false });
      if (value == null) {
        Object.assign(obj, { token: null });
        window.localStorage.removeItem('token')
      }
      break;
    case 'SET_LOADER':
      Object.assign(obj, { isLoading: value, });
      break;
    case 'LOG_OUT':
      Object.assign(obj, { isLoading: true, user: null, token: null });
      window.localStorage.removeItem('token');
      break;
    default:
      break;
  }

  // console.log('[sessionReducer] state', obj);

  return Object.assign({}, state, obj);
}


const areEqual = (prevProps, nextProps) => {

  if (prevProps.user !== null && nextProps.user !== null) {
    if (prevProps.user.uID !== nextProps.user.uID) {
      return false;
    } else {
      return true;
    }
  } else if (prevProps.user == null && nextProps.user !== null) {
    return false;
  } else if (prevProps.user == null && nextProps.user == null) {
    return true;
  } else if (prevProps.user !== null && nextProps.user == null) {
    return false;
  }

  console.log('areEqual', prevProps, nextProps);

  // if (nextProps.user !== null) {
  //   return false
  // } else {
  //   return true;
  // }

  return true
};

// for lazy loader content
const ContentComponent = (props: any) => {
  const { modularScheme, sessionState, user } = props;
  console.log('[ContentComponent]', props);
  // const [modular, setModular] = useModular();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* {!!user
        ? <UserSides />
        : null} */}
      <AuthModule user={user}>
        {props.children}
      </AuthModule>
    </div>
  )
}

export const AppHolderMemo = React.memo(ContentComponent, areEqual)


export const SessionContextProviders: React.FC<any> = (props) => {
  // console.log('props', props);
  const [sessionState, setSessionState]
    : [Session, (session: Dispatcher) => void]
    = React.useReducer(sessionReducer, Object.assign(initialSession, { user: props.user }))
  // const defaultSessionContext: any = ;
  // const [modularScheme, setScheme]: any = useState(null);
  // const [canLoad, setLoad]: any = useState(false);

  // useEffect(() => {
  //   // console.log('--');
  //   if (sessionState.token) {
  //     setSessionState({ type: 'SET_LOADER', value: true });

  //     HTTPClient.get('user.json').then(e => {
  //       setSessionState({ type: 'SET_USER', value: e.data });
  //       setLoad(true);
  //     });

  //   } else {
  //     // setSessionState({ type: 'SET_USER', value: null });
  //     setLoad(true);
  //   }
  // }, []);
  const [modularState, setModules] = useModular();

  useEffect(() => {
    
  }, [])
  console.log('[SessionContextProvider]', {
    props,
    state: sessionState
  });

  return (
    <SessionContext.Provider value={[sessionState, setSessionState]}>
      {/* {!!sessionState.user
        ? <UserSides />
        : null} */}
      <AuthModule user={sessionState.user}>
        {props.children}
      </AuthModule>
    </SessionContext.Provider>
  );
}

export const SessionContextProvider = React.memo(SessionContextProviders, () => true)