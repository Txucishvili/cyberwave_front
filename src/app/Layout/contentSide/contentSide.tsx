import { useLayoutContext } from '@store/context/LayoutContext';
import { ResizeService, useResizeContext } from '@store/context/WindowResize';
import { getComputedStyles } from '@utils/Functions';
import React, { useEffect } from 'react';


const FixedContainer = (props: any) => {
  const { className } = props;
  const [wSize] = useResizeContext();

  const [layoutState, setLayoutState]: any = useLayoutContext();
  // console.log('[layoutState] wSize', props.from);

  useEffect(() => {
    const shrinkSize = getComputedStyles('--bp-layout-shrink-size');
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