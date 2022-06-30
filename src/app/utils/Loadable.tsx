import React, { Fragment } from 'react';
import Loadable from 'react-loadable';

const Loader = () => {
  return (<div>Loading</div>)
}

const _loadComponent = (path: any, loader?: any) => {

  const LoadableComponent = Loadable({
    loader: () => import(`@components/${path}`),
    loading: loader ? loader : Loader,
  })

//   console.log('LoadableC', path);

  return LoadableComponent
}


export default _loadComponent;