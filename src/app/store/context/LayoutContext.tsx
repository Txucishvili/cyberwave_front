import React, {
  createContext,
  useContext,
} from "react";

interface LayoutState {
  navOpened: boolean
}

export const initState: LayoutState = {
  navOpened: false
};

export const LayoutContext = createContext<[LayoutState, any]>([initState, () => {}]);
export const useSessionContext = () => useContext(LayoutContext);


function LayoutReducer(state: any, action: any) {
  // console.log('state', {
  //   state,
  //   action
  // });
  console.log('state', {state, action});
  return Object.assign({}, state, action);
}

export const LayutProvider: React.FC = (props) => {
    const [sessionState, setSessionState] = React.useReducer(LayoutReducer, initState)
    const defaultContext: [any, any] = [sessionState, setSessionState];


    // console.log('defaultSessionContext', defaultSessionContext)

  return (
    <LayoutContext.Provider value={defaultContext}>
      {props.children}
    </LayoutContext.Provider>
  );
}

  