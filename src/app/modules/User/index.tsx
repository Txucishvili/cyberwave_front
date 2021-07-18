import LoaderBox from 'app/utils/LoaderBox';
import React, { ExoticComponent, Suspense, SuspenseProps } from 'react';

export const UserSideLoader = () => {
  return (
    <div className="user-area--list flx">
      <LoaderBox styles={{ width: 90, height: 40, borderRadius: 35 }} />
      <LoaderBox styles={{ width: 200, height: 40, borderRadius: 35 }} />
    </div>
  )
}


// const LoadComponent = () => {
//   console.log('----------------------------------------');

//   const Component: any = import(
//     /* webpackChunkName: 'UsersModule' */ 
//   '../../Layout/Header/UserSide');
  
//   Component.then((resp: any) => {
//     console.log('Component', resp);
//   });
// }



export const LoadableWrap = (props: any) => {
  // const Component = React.lazy(() => import('../../Layout/Header/UserSide'));
  const Component = props.children;
  const Loader = props.fallback || props.loader;

  return (
    <Suspense fallback={Loader}>
      {props.children}
    </Suspense>
  )
}

export const UsersModuleLazy = {
  Profile: React.lazy(() => import('./Users.module')),
  HeaderSide: React.lazy(() => import('../../Layout/Header/UserSide')),
  HeaderSideAdmin: React.lazy(() => import('../../Layout/Header/UserSide.admin')),
}

const UsersModularWrap = (props: any) => {

  return props.children
}

export default UsersModularWrap;