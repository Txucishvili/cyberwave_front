import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";

export type Theme = {
  activeName: string | null;
  activeKey: number | null;
  themes: any[];
}

export const localStorageKey = 'themeKey';

const themes: any = {
  dark: {
    name: 'dark',
    classPrefix: 'theme--dark',
  },
  light: {
    name: 'light',
    classPrefix: 'theme--light',
  }
};

const storageValue: string | null = window.localStorage.getItem(localStorageKey);
const activeThemeName: string | null = storageValue ? storageValue : null;
const activeThemeKey:any = activeThemeName;

export const themeState: Theme = {
  themes: Object.values(themes),
  activeName: activeThemeName,
  activeKey: activeThemeKey,
};

export const ThemeContext = createContext([themeState, () => {}]);
export const useThemeContext = () => useContext(ThemeContext);


export function themeReducer(state: Theme, action: Theme | any): any {

  let returnState = {
    ...state
  };

  const {
    value
  } = action;
  const selected = state.themes.find(e => e.name == value);

  returnState = Object.assign(returnState, {
    activeName: value,
    activeKey: value,
    // activeKey: state.themes.indexOf(selected),
  })

  // console.log('themeReducer [selected]', selected);

  return Object.assign({}, returnState);
}

export const ThemeContextProvider: React.FC = (props) => {
  //   const [sessionState, setSessionState] = useState(initialSession);
  //   const defaultSessionContext: [Session, typeof setSessionState]  = [sessionState, setSessionState];

  const [theme, setTheme] = useReducer(themeReducer, themeState)
  const defaultTheme: [any, any] = [theme, setTheme];

  // console.log('[ThemeContextProvider]', props)
  // document.body.style.setProperty('--theme--main-color', 'red');

  useEffect(() => {
    console.log('[-----]', window.localStorage.getItem(localStorageKey))
    const body = document.documentElement;


    if (window.localStorage.getItem(localStorageKey)) {
      // body.classList.value = '';
      // body.classList.add('theme');
      // body.classList.add('theme--'+theme.activeName);
    } else {

    }
  })
  useEffect(() => {
    console.log('[THEME CHANGE]')
    window.localStorage.setItem(localStorageKey, theme.activeName);
  }, [theme.activeName])
  
  return ( <ThemeContext.Provider 
    value = {
      defaultTheme
    }> 
    {
      props.children
    } </ThemeContext.Provider>
  );
}