import React, { forwardRef, useEffect, useRef, useState } from 'react';

export function useDetectClickOut(initState) {
  const triggerRef = useRef(null); // optional
  const nodeRef = useRef(null); // required 

  const [show, setShow] = useState(initState);
  const handleClickOutside = event => {
    //if click is on trigger element, toggle modal
    if (triggerRef.current &&
      triggerRef.current.contains(event.target)) {
      return setShow(!show);
    }

    //if modal is open and click is outside modal, close it
    if (nodeRef.current &&
      !nodeRef.current.contains(event.target)) {
      return setShow(false);
    }

    console.log('e', show);

  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    triggerRef,
    nodeRef,
    show,
    setShow
  }
}


export function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const [fClose, setForceClose] = useState(false);

  const ref: any = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    } else {
      // setIsComponentVisible(false);
      // console.log('inside', ref.current.querySelector('div.item--list'));
    }
  };

  const forceClose = (e) => {
    console.log('forceClose', e);
    // setIsComponentVisible(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible, forceClose };
}

// TODO: Create drawer easeuseSSS ))))
const Drawer = props => {
  const { children } = props;
  const Toggler = children[0];
  const Content = children[1];
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  console.log('[Drawer]', Toggler);
  return (
    <div className="drawer" ref={ref}>
      {Toggler}
      {isComponentVisible && Content}
    </div>
  )
}

export { Drawer };