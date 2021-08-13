import React from 'react';
import Loadable from 'react-loadable';

export const getComputedStyles = (name: string) => {
  const parsedSize = getComputedStyle(document.documentElement)
  .getPropertyValue(name)
  .replace(' ', '').replace('px', '');
  
  return parseFloat(parsedSize);
}

const Loader = () => {
  return <div>loading</div>
}

export const ModuleLoader = (props: any) => {
  // const Module =  Loadable({
  //     loader: () => import(''),
  //     loading: Loader,
  //   });

  console.log('[ModuleLoader]', props);


  return(
    <div style={{width: '100%', height: '100%'}}>
      {props.children}
    </div>
  )
}

export function randomNumber(min, max) { 
  return Math.random() * (max - min) + min;
} 