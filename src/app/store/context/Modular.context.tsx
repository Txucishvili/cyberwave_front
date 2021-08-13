import LoginRegisterButtons from "@components/LoginRegister/LoginRegister";
import ModularScheme from "@modules/User";
import { ModuleLoader } from "@utils/Functions";
import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSessionContext } from "./UserSession.context";

export interface WithModular {
  children: any,
  scheme: WithModularShcheme,
};

export interface WithModularShcheme {
  moduleID: number | null,
  Views: any,
  scheme?: any,
  isLoading?: any,
};

const initState: WithModularShcheme = {
  moduleID: null,
  Views: {},
  scheme: {},
  isLoading: true,
};

export const ModularContext = createContext<[WithModularShcheme, (type: any) => void]>([initState, () => { }]);
export const useModular = () => useContext(ModularContext);


function reducer(state, action): any {
  const { type, value } = action;
  const obj = {};

  switch (type) {
    case 'SET_LOADER':
      Object.assign(obj, { isLoading: value })
      break;

    case 'SET_MODULES':
      Object.assign(obj, { moduleID: value.moduleID, scheme: value.scheme, isLoading: false })
      break;

    default:
      Object.assign(obj, action);
      break;
  }

  // console.log('updating', Object.assign({}, state, obj));

  return Object.assign({}, state, obj);
}

const ModularLoader = (props) => {

  return null
}

const ModularInstance = (props) => {
  const [sessionState, setUser] = useSessionContext();
  const [modular, setModular] = useModular();
  const [canLoad, setLoad] = useState(false);

  // console.log('ModularInstance,', props);

  useEffect(() => {
    // console.log('user,', sessionState);
    setModular({ type: 'SET_LOADER', value: true });

    if (sessionState.user == null) {
      import(
        /* webpackChunkName: "NoRegister" */
        /* webpackMode: "lazy" */
        '@modules/User/NoRegister'
      ).then(r => {
        console.log('[MODULELOADER]');
        setTimeout(() => {
          setModular({ type: 'SET_MODULES', value: { moduleID: 0, scheme: r.NoRegistered } });
        }, 3000);
        setLoad(true);
      });
    } else {
      import(
        /* webpackChunkName: "Registered" */
        /* webpackMode: "lazy" */
        '@modules/User/Registered'
      ).then(r => {
        console.log('[MODULELOADER]');

        setTimeout(() => {
        setModular({ type: 'SET_MODULES', value: { moduleID: 1, scheme: r.Registered } });
        }, 3000);
        setLoad(true);
      });
    }
  }, [sessionState]);

  useEffect(() => {
    // console.log('modular', modular);
  }, [modular])

  // const ModularView = modular.moduleID !== null ? ModularScheme[modular.moduleID] : null;

  // console.log('ModularView', ModularView);

  // ModularView.then(r => {
  //   console.log('-----', r);
  // })

  // const MemoView = React.memo(ModularView, () => true);

  if (canLoad) {

  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ padding: '20px 100px' }}>
        <LoginRegisterButtons />
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        {canLoad
          ? props.children
          : null}
      </div>
    </div>
  )
};


const ModularInstanceHolder = React.memo(ModularInstance, () => true);

const AppComponent = ({ children }) => {
  console.log('AppContainerHolder, ', AppContainerHolder);
  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      {children}
    </div>
  );
}

const AppContainerHolder = React.memo(AppComponent, () => true);


export const ModularContextProvider: React.FC<any> = (props: any) => {
  const [modularState, setModules]
    : [WithModularShcheme, (type: any) => void]
    = React.useReducer(reducer, Object.assign(initState, { moduleID: props.initialState.module }));

  console.log('[ModularContextProvider]', modularState);


  return (
    <ModularContext.Provider value={[modularState, setModules]}>
      <ModularInstanceHolder>
        {props.children}
      </ModularInstanceHolder>
    </ModularContext.Provider>
  );
}

export default React.memo(ModularContextProvider, () => true);