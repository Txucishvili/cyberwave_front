
import React from 'react';
import _loadComponent from '@utils/Loadable';
import Loadable from 'react-loadable';
import LoginRegisterButtons from '@components/LoginRegister/LoginRegister';
import InfoSides from '@Layout/Header/InfoSide';


const Roles = [0, 1, 2, 3];

const RoleMaps = {
  NoUser: 0,
  User: 1,
  Admin: 2,
};

const RoleDependModules = {
  NoUser: 'NoUserModules',
  User: 'UserModule',
  Admin: 2,
};

export type MODULE_SCHEME_TYPES = {
  HeaderSide: any,
  RouterSettings?
}


export const LoadModularScheme = (moduleName): Promise<any> => {
  return new Promise((resolve) => {
    import(
      /* webpackMode: "lazy" */
      `@modules/${moduleName}`
    ).then(r => {
      resolve(r);
    });
  })
};