import { useResizeContext } from "app/store/context/WindowResize";
import React, { useEffect, useState } from "react";
import SvgIcon from "../../components/utils/IconPacks";

import CoinIcon from '../../../assets/icons/coin.png';
import { useSessionContext } from "app/store/context/UserSession.context";
import HTTPClient from "API/axios";
import LoaderBox from "app/utils/LoaderBox";
import withUser from "app/modules/User/UserScheme";
import UserSides from "./UserSide";
/* @ts-ignore import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
// import * as settings from 'someLib.js';

// console.log('settings 2', settings);

const UserSideAdmin = (props: any) => {

  return (
    <div>
      <UserSides>
        <p>!</p>
      </UserSides>
    </div>
  )
}
// console.log('------ module', module.id);
// const UserSide = withUser({ id: module.id, modules: UserSides, lazy: true });

export default UserSideAdmin;