import Button from "app/components/Shared/Button/Button";
import { useSessionContext } from "app/store/context/UserSession.context";
import { useResizeContext } from "app/store/context/WindowResize";
import React, { useEffect } from "react";

const InfoSide = () => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [session, setSession]: any = useSessionContext();

  useEffect(() => {
    // console.log('windowSize', windowSize.innerWidth, windowSize.prevWidth);
  }, [windowSize.innerWidth])

  return (
    <div className="infoSide el flx flxAC flxJE hListDivide" id="sideA">
      {true ? <Button classnames='btn--br btn--theme'>
        <b>+</b><p>პოსტის დამატება</p>
      </Button> : null}
    </div>
  )
}

export default InfoSide;