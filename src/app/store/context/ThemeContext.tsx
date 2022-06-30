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

export const localStorageKey = 'theme';

const themes: any = {
  dark: {
    name: 'dark',
    classPrefix: 'theme--dark bp3-dark',
  },
  light: {
    name: 'light',
    classPrefix: 'theme--light bp3-light',
  }
};

const storageValue: string | null = window.localStorage.getItem(localStorageKey);
const activeThemeName: string | null = storageValue ? storageValue : null;
const activeThemeKey: any = activeThemeName;

export const themeState: Theme = {
  themes: Object.values(themes),
  activeName: activeThemeName,
  activeKey: activeThemeKey,
};

export const ThemeContext = createContext([themeState, () => { }]);
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

  const [theme, setTheme] = useReducer(themeReducer, themeState)
  const defaultTheme: [any, any] = [theme, setTheme];
  const localTheme = localStorage.getItem('theme')

  useEffect(() => {
    // window.localStorage.setItem(localStorageKey, theme.activeName);
  }, []);

  return (
    <ThemeContext.Provider value={defaultTheme}>
      { props.children}
    </ThemeContext.Provider>
  );
}