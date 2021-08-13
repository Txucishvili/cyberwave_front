import React, {
  createContext,
  useContext,
} from "react";

interface LayoutState {
  navOpened?: boolean,
  fixedSide?: boolean | null,
  isHidden?: boolean | null
}

const storageValue = window.localStorage.getItem('earnFixBar');

export const initState: any = {
  navOpened: false,
  fixedSide: storageValue != null ? JSON.parse(storageValue) : null,
  isHidden: null
};

export const LayoutContext = createContext<[any, any]>([initState, () => { }]);
export const useLayoutContext = () => useContext(LayoutContext);

export const toggleFixedBar = (value?: any) => ({
  type: 'TOGGLE_SIDE',
  value,
});

export const setHidden = (value: any) => ({
  type: 'SET_HIDDEN',
  value,
});


function LayoutReducer(state: any, payload: any) {
  const { type, value } = payload;
  const local = window.localStorage.getItem('earnFixBar');

  let obj: any = {};

  switch (type) {
    case 'OPEN_SIDE':
      Object.assign(obj, { fixedSide: true });
      break;
    case 'CLOSE_SIDE':
      obj = Object.assign({}, { fixedSide: false });
      break;
    case 'TOGGLE_SIDE':
      // obj.fixedSide = !state.fixedSide;
      Object.assign(obj, { fixedSide: !state.fixedSide });
      if (!state.isHidden && local !== null) {
        localStorage.setItem('earnFixBar', `${!state.fixedSide}`)
      }
      break;
    case 'SET_HIDDEN':
      const insideObj = {};

      if (!value) {
        if (local !== null) {
          Object.assign(insideObj, { fixedSide: local == 'true' ? true : false })
        }
      } else {
        Object.assign(insideObj, { fixedSide: false })
      }
      Object.assign(obj, { isHidden: value }, insideObj);

      break;
    default:
      break;
  }

  // if (type === 'TOGGLE_SIDE') {
  //   return { ...state, fixedSide: !state.fixedSide }
  // } else if (type === 'SET_HIDDEN') {
  //   return { ...state, isHidden: value }

  // } else if (type === 'FIXED_SIDE') {
  //   return { ...state, fixedSide: value }

  // }

  // console.log('----- state', obj);

  return Object.assign({}, state, obj);
}

export const LayutProvider: React.FC = (props) => {
  const [layoutState, setLayoutState]: [any, any] = React.useReducer(LayoutReducer, initState)
  // const defaultContext: [any, any] = [layoutState, setLayoutState];

  //   console.log('[LayoutContext]', layoutState)

  return (
    <LayoutContext.Provider value={[layoutState, setLayoutState]}>
      {props.children}
    </LayoutContext.Provider>
  );
}