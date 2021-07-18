import { LayutProvider, useLayoutContext } from 'app/store/context/LayoutContext';
import { ResizeProvider, ResizeService, useResizeContext } from 'app/store/context/WindowResize';
import { getComputedStyles } from 'app/utils/Functions';
import React, { useEffect, useState } from 'react';

const FixedContainerContent = (props: any) => {
  const { className, ...newProps } = props;

  return (
    <div className={['content-side--wrapper'].concat(props.className).join(' ')}>
      <div className="content-inside">
        <div className="content-inside--wrapper _rsp">
          {props.children}
        </div>
      </div>

    </div>
  )
}
const resizer = new ResizeService();

const FixedContainer = (props: any) => {
  const { className, ...newProps } = props;
  const [wSize, setWindowSize] = useResizeContext();

  const [layoutState, setLayoutState]: any = useLayoutContext();
  // console.log('[layoutState] wSize', props.from);

  useEffect(() => {
    const shrinkSize = getComputedStyles('--bp-layout-shrink-size');
    const shrinkSize2 = getComputedStyles('--bp-layout-shrink-size-2');
    // console.log('-------', wSize.innerWidth <= shrinkSize, !layoutState.isHidden);

    if (wSize.innerWidth <= shrinkSize && (!layoutState.isHidden || layoutState.isHidden == null)) {
      // setHidden(true);
      setLayoutState({ type: 'SET_HIDDEN', value: true })
    } else if (wSize.innerWidth >= shrinkSize && (layoutState.isHidden || layoutState.isHidden == null)) {
      // setHidden(false);
      setLayoutState({ type: 'SET_HIDDEN', value: false })
    }
}, [layoutState.isHidden, setLayoutState, wSize]);

useEffect(() => {
  const localValue = window.localStorage.getItem('earnFixBar');
  if (layoutState.isHidden !== null) {

    if (layoutState.isHidden) {
      // setOpen(false);
      // setLayoutState({ fixedSide: false })
      // setLayoutState({ type: 'FIXED_SIDE', value: false })

    } else {

      if (localValue == null) {

        setLocalStorage(true)
        // setOpen(true);
        // setLayoutState({ fixedSide: true })
        setLayoutState({ type: 'OPEN_SIDE', value: true })

        return;
      } else {
        const value = localValue === 'true' ? true : false;
        // setOpen(value);
        // setLayoutState({ fixedSide: value })
        // setLayoutState({ type: 'FIXED_SIDE', value: value })

      }
    }
  }

}, [layoutState.isHidden, setLayoutState]);

useEffect(() => {
  if (!layoutState.isHidden) {
    // setLocalStorage(layoutState.fixedSide)
  }
}, [layoutState.isHidden, layoutState.fixedSide])

const setLocalStorage = (value: boolean | any) => {
  console.log('------ [setStorage] ------');

  window.localStorage.setItem('earnFixBar', value);
}

return (
  <div className={
    ['content-side--wrapper',
      layoutState.isHidden ? 'hidden' : 'showed',
      layoutState.fixedSide ? 'opened' : null
    ]
      .concat(props.className).join(' ')}>
    {props.children}
  </div>
)
}

export default FixedContainer;