import React, { Fragment } from 'react';
import Loadable from 'react-loadable';

const Loader = () => {
  return (<div>Loading</div>)
}

const LoadableC = (props: any) => {
  const { path, loader } = props;

  const LoadableComponent = Loadable({
    loader: () => import(path),
    loading: Loader,
  })

  console.log('LoadableC', path);

  return(
    <LoadableComponent />
  )
}

export default LoadableC;