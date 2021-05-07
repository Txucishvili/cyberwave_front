import React, {
  createContext,
  useContext,
} from "react";

export type Session = {
  isAuthenticated ? : boolean;
  redirectPath: string;
  sId: string | null;
}

export const initialSession: Session = {
  redirectPath: '',
  sId: null
};

export const SessionContext = createContext < [Session, (session: Session) => void] > ([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);


function countReducer(state: Session, action: Session | any): any {
  // console.log('state', {
  //   state,
  //   action
  // });
  return Object.assign({}, state, action);
}

export const SessionContextProvider: React.FC = (props) => {
    //   const [sessionState, setSessionState] = useState(initialSession);
    //   const defaultSessionContext: [Session, typeof setSessionState]  = [sessionState, setSessionState];

    const [sessionState, setSessionState] = React.useReducer(countReducer, initialSession)
    const defaultSessionContext: [any, any] = [sessionState, setSessionState];


    // console.log('defaultSessionContext', defaultSessionContext)

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
}

  