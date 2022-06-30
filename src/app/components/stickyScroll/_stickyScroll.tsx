/* eslint-disable react-hooks/exhaustive-deps */
import { useScrollbarContext } from '@store/context/ScrollBarContext';
import { useResizeContext } from '@store/context/WindowResize';
import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import Emittr from 'react-scrollbars-custom/dist/types/Emittr';
import BlockEl from '../utils/BlockEl';
import './stickyScroll.scss'

const StickyScroll = (props: any) => {
  // const scrollbarContext = useContext(ScrollbarContext);

  const [scroll, setScroll] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const [dividerHeight, setDivider] = useState(0);
  const [scrollBehavior, setScrollBehavior] = useState('');
  const [scrollBehaviorStyle, setScrollBehaviorStyle]: any = useState({});
  const [targetSize, setTargetSize]: any = useState(0);
  const [scrollObj, setScrollObj]: any = useState({});
  const [scrollOffset, setscrollOffset]: any = useState(0);
  const targetEl: any = useRef(null);

  const [scrollState, setScrollState] = useScrollbarContext();

  useEffect(() => {
    //     console.log(targetEl.current.offsetTop);
    setscrollOffset(targetEl.current.offsetTop)
  }, []);

  useEffect(() => {
    const { clientHeight, clientWidth, contentScrollHeight, contentScrollWidth, scrollHeight, scrollLeft, scrollTop } = scrollState;
    // const scrollSize = contentScrollHeight - clientHeight - scrollTop;

    if (!scrollTop) {
      return;
    }
    
    // setScrollEnd(scrollTop)
    setScroll(scrollTop)
    setScrollObj(scrollState)
    // console.log("[stickyScroll]", scrollTop);

  }, [scrollState]);

  useEffect(() => {
    if (scroll <= 0) {
      setScrollStart(0);
    } else {
      setScrollStart(scroll);
    }
    const dir = scroll > scrollStart ? 'down' : 'up'
    setScrollBehavior(dir)
    // setscrollOffset(targetEl.current.offsetTop)
  }, [scroll]);

  useEffect(() => {
    // console.log('[scrollBehavior]', targetEl.current.offsetTop, targetSize);
    if (targetEl.current.clientHeight <= document.body.clientHeight) {
      if (scrollBehaviorStyle && !scrollBehaviorStyle.top) {
        setScrollBehaviorStyle({ top: targetEl.current.offsetTop - 35 });
      }
      return;
    }
    if (!targetSize || targetSize == 0) {

      if (scroll <= 115) {
        // return;
      }

      setTargetSize(targetEl.current.offsetHeight - document.documentElement.clientHeight)
    }

    if (targetEl.current.offsetTop == scrollOffset) {
      setDivider(0)
    } else {
      setDivider(targetEl.current.offsetTop - scrollOffset)
    }

    if (scrollBehavior == 'down') {
      setScrollBehaviorStyle({ top: -targetSize + 1 });
    } else {
      setScrollBehaviorStyle({ bottom: -(targetSize + (scrollOffset)) + 1 })
    }
  }, [scrollBehavior]);

  // console.log('stickyScroll');

  return (
    <div className="component-sticky-scroll"
      style={{ height: '100%' }}
    >
      <div className="someEl"
        style={{
          height: dividerHeight
        }}
      >
      </div>

      <div className={'sticky-side'}
        id="movableTarget"
        ref={targetEl}
        style={scrollBehaviorStyle}>
        {props.children}

      </div>
    </div>
  )
}

export default StickyScroll;