import { useResizeContext } from "@store/context/WindowResize";
import React, { useEffect, useState } from "react";
import SvgIcon from "../../components/utils/IconPacks";

import CoinIcon from '../../../assets/icons/coin.png';
import { useSessionContext } from "@store/context/UserSession.context";
import HTTPClient from "@API/axios";
import LoaderBox from "@utils/LoaderBox";

export const UserSideLoader = () => {
  return (
    <div className="user-area--list flx">
      <LoaderBox styles={{ width: 200, height: 40, borderRadius: 35 }} />
      <LoaderBox styles={{ width: 90, height: 40, borderRadius: 35 }} />
    </div>
  )
}

const CoinButton = (props: any) => {
  const [session, setSession]: any = useSessionContext();

  return (
    <div>
      <div className="cointBnt">
        <div className="icon-area">
          <img src={CoinIcon} alt="" />
        </div>
        <div className="name-area flx flxCol">
          <div className="titler">ბალანსი</div>
          <div className="count">{session.user.ballance}</div>
        </div>
      </div>
    </div>
  )
}

const UserButton = (props: any) => {
  const [session, setSession]: any = useSessionContext();
  const { user }: any = session;

  // console.log('session', session);

  useEffect(() => {
    // console.log('session', session);
  }, [session])

  const onUserClick = () => {
    // console.log('onUserClick');
    setSession({ type: 'LOG_OUT' });
  }

  return (
    <div>
      <div className="userBtn userBtn--wrap"
        onClick={onUserClick}
      >
        <div className="avatar-area">
          <img src={session.user.avatar} alt="" />
        </div>
        <div className="name-area">
          {session.user.nickName}
        </div>
        <div className="droper">
          <SvgIcon pack="shared" name="arrowDown" />
        </div>
      </div>
    </div>
  )
}

const UserSides = (props: any) => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [value, setValue]: any = useState(0);

  useEffect(() => {
    // console.log('windowSize', windowSize);
    setValue(windowSize.innerWidth)
  }, [windowSize])


  return (
    <div className="colOut" id="movableEl">
      <div className="user-area--list flx">
        {props.children}
        <CoinButton />
        <UserButton />
      </div>
    </div>
  )
}
// console.log('------ module', module.id);
// const UserSide = withUser({ id: module.id, modules: UserSides, lazy: true });

export default UserSides;