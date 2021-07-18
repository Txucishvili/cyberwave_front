import HTTPClient from "API/axios";
import AuthModule from "app/modules/Auth/Authentication.module";
import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
} from "react";
import Loadable from 'react-loadable';

export type Session = {
  isAuthenticated?: boolean;
  redirectPath: string;
  sId: string | null;
  token: string | null;
  user?: any;
  sessionStartTime?: any;
  sessionEndTime?: any;
  isLoggedIn: boolean | null;
}

export const initialSession: Session = {
  redirectPath: '',
  sId: null,
  user: null,
  token: window.localStorage.getItem('token'),
  sessionStartTime: new Date().getTime(),
  isLoggedIn: null
};

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => { }]);
export const useSessionContext = () => useContext(SessionContext);


function sessionReducer(state: Session, action: Session | any): any {
  const { type, value } = action;
  const obj = {};

  switch (type) {
    case 'SET_USER':
      Object.assign(obj, { user: value, isLoggedIn: !!value });
      if (value == null) {
        window.localStorage.removeItem('token')
      }

      break;

    default:
      break;
  }

  // console.log('[sessionReducer] state', obj);

  return Object.assign({}, state, obj);
}

const Loader = () => {
  return <div>loading</div>
}

export const SessionContextProvider: React.FC = (props) => {
  const [sessionState, setSessionState] = React.useReducer(sessionReducer, initialSession)
  const defaultSessionContext: [any, any] = [sessionState, setSessionState];
  let LoadableComponent: any;

  console.log('[UserSessionContext]', sessionState);
  useEffect(() => {
    console.log('[UserSessionContext]', sessionState);
    if (sessionState.token) {
      HTTPClient.get('user.json').then(e => {
        setSessionState({ type: 'SET_USER', value: e.data });
        if (e.data) {
          console.log('---------');
          // LoadableComponent = Loadable({
          //   loader: () => import('../../modules/User/Users.module'),
          //   loading: Loader,
          // });
        }
        // console.log('LoadableComponent', LoadableComponent);
      })
    } else {
      setSessionState({ type: 'SET_USER', value: null });
    }
  }, [sessionState.token])

  // console.log('LoadableComponent', LoadableComponent);
  return (
    <SessionContext.Provider value={defaultSessionContext}>
      <AuthModule token={sessionState.token} user={sessionState.user}>
        {props.children}
      </AuthModule>
    </SessionContext.Provider>
  );
}

