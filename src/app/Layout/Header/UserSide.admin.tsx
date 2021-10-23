import { useResizeContext } from "@store/context/WindowResize";
import React, { useEffect, useState } from "react";
import SvgIcon from "@components/utils/IconPacks";

import CoinIcon from '../../../assets/icons/coin.png';
import { useSessionContext } from "@store/context/UserSession.context";
import HTTPClient from "@API/axios";
import LoaderBox from "@utils/LoaderBox";
import withUser from "@utils/Authorized";
import UserSides from "./UserSide";
/* @ts-ignore import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
// import * as settings from 'someLib.js';

const UserSideAdmin = (props: any) => {

  return (
    <div>
      <UserSides>
      <button style={{backgroundColor: "#434e6e"}} className="btn btn--simple "><p>switch</p></button>
      </UserSides>
    </div>
  )
}
// console.log('------ module', module.id);
// const UserSide = withUser({ id: module.id, modules: UserSides, lazy: true });

export default UserSideAdmin;