import React, {
  createContext,
  Suspense,
  useContext,
} from "react";

type Session = {
  isAuthenticated?: boolean;
  redirectPath: string;
  sId: string | null;
  token: string | null;
  user?: any;
}

const initialSession: Session = {
  redirectPath: '',
  sId: null,
  user: null,
  token: window.localStorage.getItem('token'),
};

const AuthContext = createContext<[Session, (session: Session) => void]>([initialSession, () => { }]);
const useAuthContext = () => useContext(AuthContext);


function reducer(state: Session, action: Session | any): any {
  const { type, value } = action;
  const obj = {};

  switch (type) {
    case 'SET_USER':
      Object.assign(obj, { user: value })
      break;

    default:
      break;
  }

  console.log('[sessionReducer] state', obj);

  return Object.assign({}, state, obj);
}
// console.log('[AuthContextProvider]');

export const AuthContextProvider: React.FC<any> = (props: any) => {
  const [sessionState, setSessionState] = React.useReducer(reducer, props.data)
  const defaultSessionContext: [any, any] = [sessionState, setSessionState];

  console.log('[AuthContextProvider]', props);

  return (
    <AuthContext.Provider value={defaultSessionContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;