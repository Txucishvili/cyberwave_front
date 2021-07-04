import React, {
  createContext,
  useContext,
  useEffect,
} from "react";

export const initState = {
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  prevHeight: window.innerHeight,
  prevWidth: window.innerWidth,
};

export const ResizeContext = createContext<[any, any]>([initState, () => { }]);
export const useResizeContext: any = () => useContext(ResizeContext);


function ResizeReducer(state: any, action: any) {
  // console.log('state', {
  //   state,
  //   action
  // });
  // console.log('state', { state, action });

  return Object.assign({}, state, {
    innerWidth: action.innerWidth,
    innerHeight: action.innerHeight,
    prevHeight: state.innerHeight,
    prevWidth: state.innerWidth,
  });
}

export const ResizeProvider: React.FC = (props) => {
  const [windowSize, setResizeState] = React.useReducer(ResizeReducer, initState)
  const defaultContext: [any, any] = [windowSize, setResizeState];

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      const {innerHeight, innerWidth} = window;
      setResizeState({innerHeight, innerWidth});
    });

    return () => {
      window.removeEventListener('resize', () => {});
    }
  }, [])

  // console.log('defaultSessionContext', defaultSessionContext)

  return (
    <ResizeContext.Provider value={defaultContext}>
      {props.children}
    </ResizeContext.Provider>
  );
}

