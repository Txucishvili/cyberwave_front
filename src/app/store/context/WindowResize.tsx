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


function ResizeReducer(state: any, payload: any) {
  const { action, value } = payload;
  const obj = {};
  switch (action) {
    case 'RESIZE':
      Object.assign(obj, {
        innerWidth: value.innerWidth,
        innerHeight: value.innerHeight,
        prevHeight: state.innerHeight,
        prevWidth: state.innerWidth,
      })
      break;
    default:
      break;
  }

  return Object.assign({}, state, obj);
}

export const ResizeProvider: React.FC = (props) => {
  const [windowSize, setResizeState] = React.useReducer(ResizeReducer, initState)
  const defaultContext: [any, any] = [windowSize, setResizeState];

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      const { innerHeight, innerWidth } = window;
      // console.log('----------- 1');
      setResizeState({ action: 'RESIZE', value: { innerHeight, innerWidth } });
    });

    return () => {
      window.removeEventListener('resize', () => { });
    }
  }, [])

  // console.log('ResizeProvider')

  return (
    <ResizeContext.Provider value={defaultContext}>
      {props.children}
    </ResizeContext.Provider>
  );
}

import { Subject } from 'rxjs';

const subject = new Subject();

export class ResizeService {

  subject: Subject<any> = new Subject();
  public $sub: any = subject.asObservable();

  constructor(props?: any) {
    window.addEventListener('resize', (e) => {
      const { innerHeight, innerWidth } = window;
      // console.log('----------- 1');
      subject.next({innerHeight, innerWidth});
    });
  }

  //  static getObs: () => subject.asObservable();
};




// export const ResizeProviderX: React.FC = (props) => {
//   const layoutObs: any = [resizeService.getObs, resizeService.setValue];
  

//   console.log('ResizeContext', layoutObs);
//   // const [obs, dispatch]: any = layoutObs;

//   useEffect(() => {
//     window.addEventListener('resize', (e) => {
//       const { innerHeight, innerWidth } = window;
//       console.log('----------- 1');
//       resizeService.setValue({innerHeight, innerWidth});
//     });

//     return () => {
//       window.removeEventListener('resize', () => { });
//     }
//   }, [])


//   return (
//     <ResizeContext.Provider value={layoutObs}>
//       {props.children}
//     </ResizeContext.Provider>
//   );
// }