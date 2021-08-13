import { useModular } from '@store/context/Modular.context';
import React, { useEffect } from 'react';
import './App.scss';

import Layout from './Layout/Layout';
import { ScrollbarProvider } from './store/context/ScrollBarContext';


export function App(props: any) {
  console.log('------------ [APP] ---------', props);


  return (
    <React.Fragment>
      {/* <Layout /> */}

      <ScrollbarProvider>
        <Layout
          // modular={props.modularScheme}

        />
      </ScrollbarProvider>

      {/* <div style={{ display: 'flex' }}>
        {theme.themes.map((el: any, key: any) => {
          // eslint-disable-next-line react/jsx-key
          return <div key={key} style={{
            cursor: 'pointer',
            color: '#000',
            display: 'flex',
            backgroundColor: el.name,
            padding: '6px 11px',
            marginRight: '15px',
            border: el.name == theme.activeKey ? '1px solid #fff' : '1px solid transparent'
          }} onClick={() => {
            // console.log('set theme ', el);
            setTheme({ value: el.name })
          }}
          >
            <div>{el.name}</div>
          </div>
        })}
        <div>
          <span><em>Active Theme:</em> <b>{theme.activeKey} - (null)</b></span>
        </div>
      </div> */}
    </React.Fragment>
  );
}

export default App;
