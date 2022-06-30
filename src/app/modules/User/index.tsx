import InfoSides from '@Layout/Header/InfoSide';
import UserSides from '@Layout/Header/UserSide';
import React, { ExoticComponent, Suspense, SuspenseProps } from 'react';
import { MODULE_SCHEME_TYPES } from '..';

export const UserModularScheme : MODULE_SCHEME_TYPES = {
  HeaderSide: UserSides,
}

export default UserModularScheme;