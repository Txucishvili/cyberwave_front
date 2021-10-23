import LoginRegisterButtons from '@components/LoginRegister/LoginRegister';
import InfoSides from '@Layout/Header/InfoSide';
import UserSides from '@Layout/Header/UserSide';
import UserSideAdmin from '@Layout/Header/UserSide.admin';
import HomePage from '@pages/home';
import React, { ExoticComponent, Suspense, SuspenseProps } from 'react';
import { MODULE_SCHEME_TYPES } from '..';

export const DefaultModularScheme : MODULE_SCHEME_TYPES = {
  HeaderSide: UserSideAdmin,
  RouterSettings: HomePage,
}

export default DefaultModularScheme;