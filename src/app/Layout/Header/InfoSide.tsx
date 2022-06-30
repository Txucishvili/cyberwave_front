import Button from "@components/Shared/Button/Button";
import { useLayoutContext } from "@store/context/LayoutContext";
import { useSessionContext } from "@store/context/UserSession.context";
import { useResizeContext } from "@store/context/WindowResize";
import React, { useEffect } from "react";

export const toggleFixedBar = (value: any) => ({
  type: 'TOGGLE_SIDE',
  value,
});

const InfoSides = () => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [session, setSession]: any = useSessionContext();

  const [layoutState, dispatchLayout] = useLayoutContext();

  useEffect(() => {
    // console.log('windowSize', windowSize.innerWidth, windowSize.prevWidth);
  }, [windowSize.innerWidth])

  return (
    <div className="infoSide el flx flxAC flxJE hListDivide" id="sideA">
      {true ? <Button
        onClick={() => {
          dispatchLayout(toggleFixedBar(!layoutState.fixedSide));
          // setResizeState({ action: 'RESIZE', value: { innerHeight, innerWidth } });

        }}
        classnames='btn--br btn--theme'>
        <b>+</b><p>პოსტის დამატება</p>
      </Button> : null}
    </div>
  )
}
// console.log('-------------------------------');

// const InfoSide = withUser({ modules: InfoSides, lazy: true });
// console.log('InfoSide', module.id);
export default InfoSides;