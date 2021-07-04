import HTTPClient from "API/axios";
import React, {
  createContext,
  useContext,
  useEffect,
} from "react";

export type Session = {
  isAuthenticated?: boolean;
  redirectPath: string;
  sId: string | null;
}

export const initialSession: Session = {
  redirectPath: '',
  sId: null,
};

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => { }]);
export const useSessionContext = () => useContext(SessionContext);


function countReducer(state: Session, action: Session | any): any {
  return Object.assign({}, state, action);
}

export const SessionContextProvider: React.FC = (props) => {
  const [sessionState, setSessionState] = React.useReducer(countReducer, initialSession)
  const defaultSessionContext: [any, any] = [sessionState, setSessionState];

  useEffect(() => {
    HTTPClient.get('user.json').then(e => {
      setSessionState(e.data)
    })

    // setTimeout(() => {
    //   console.log('logOut');
    //   setSessionState({
    //     uID: null,
    //     avatar: null,
    //     nickName: null
    //   })
    // }, 5000)

  }, [])

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
}

