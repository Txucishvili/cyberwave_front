
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

export const ModularSwitcher = {
  0: {
    name: 'a',
    HeadSwitch: LoginRegisterButtons
  },
  1: {
    name: 'b',
    HeadSwitch: InfoSides

  }
}

export default AppNoUserComponents;