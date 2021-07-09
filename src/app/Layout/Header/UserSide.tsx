import { useResizeContext } from "app/store/context/WindowResize";
import React, { useEffect, useState } from "react";
import SvgIcon from "../../components/utils/IconPacks";

import CoinIcon from '../../../assets/icons/coin.png';
import { useSessionContext } from "app/store/context/UserSession.context";
import HTTPClient from "API/axios";
import LoaderBox from "app/utils/LoaderBox";

const CoinButton = (props: any) => {
  const [session, setSession]: any = useSessionContext();

  return (
    <div>
      {
        session.uID ?
          <div className="cointBnt">
            <div className="icon-area">
              <img src={CoinIcon} alt="" />
            </div>
            <div className="name-area flx flxCol">
              <div className="titler">ბალანსი</div>
              <div className="count">{session.ballance}</div>
            </div>
          </div>
          :
          <LoaderBox styles={{ width: 90, height: 40, borderRadius: 35 }} />
      }
    </div>
  )
}

const UserButton = (props: any) => {
  const [session, setSession]: any = useSessionContext();
  const { user }: any = session;

  useEffect(() => {
    console.log('session', session);
  }, [session])

  const onUserClick = () => {
    console.log('onUserClick')
  }

  return (
    <div>
      {session.uID ?
        <div className="userBtn userBtn--wrap"
          onClick={onUserClick}
        >
          <div className="avatar-area">
            <img src={session.avatar} alt="" />
          </div>
          <div className="name-area">
            {session.nickName}
          </div>
          <div className="droper">
            <SvgIcon pack="shared" name="arrowDown" />
          </div>
        </div>
        :
        <LoaderBox styles={{ width: 200, height: 40, borderRadius: 35 }} />
      }
    </div>
  )
}

const UserSide = () => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [value, setValue]: any = useState(0);

  useEffect(() => {
    // console.log('windowSize', windowSize);
    setValue(windowSize.innerWidth)
  }, [windowSize])


  return (
    <div className="colOut" id="movableEl">
      <div className="user-area--list flx">
        <CoinButton />
        <UserButton />
      </div>
    </div>
  )
}

export default UserSide;