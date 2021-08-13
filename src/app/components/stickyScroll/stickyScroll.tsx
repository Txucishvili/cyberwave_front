import { useScrollbarContext } from '@store/context/ScrollBarContext';
import { useResizeContext } from '@store/context/WindowResize';
import React, { Component, createRef, Fragment, useContext, useEffect, useRef, useState } from 'react';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import Emittr from 'react-scrollbars-custom/dist/types/Emittr';
import BlockEl from '../utils/BlockEl';
import './stickyScroll.scss';

class StaticComponent extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  shouldComponentUpdate() {
    return !false;
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    )
  }
}

const StickyScroll = (props: any) => {
  // const scrollbarContext = useContext(ScrollbarContext);

  const [scroll, setScroll] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const [dividerHeight, setDivider] = useState(0);
  const [scrollBehavior, setScrollBehavior] = useState('');
  const [scrollBehaviorStyle, setScrollBehaviorStyle]: any = useState({});
  const [scrollObj, setScrollObj]: any = useState({});
  const [scrollOffset, setscrollOffset]: any = useState(0);
  const targetEl: any = createRef();
  const [targetSize, setTargetSize]: any = useState(0);
  const [isSticky, setSticky]: any = useState(0);

  const [scrollState, setScrollState] = useScrollbarContext();
  const [windowSize,] = useResizeContext();

  useEffect(() => {
    setscrollOffset(targetEl.current.offsetTop);

    // if (targetEl.current.offsetHeight <= (document.documentElement.clientHeight - targetEl.current.offsetTop)) {
    //   setSticky(false);
    // }


    // const target = targetEl.current;

    // console.log('target,', target);


    // // callback for mutation observer
    // const logMutations = function (mutations) {
    //   mutations.forEach(function (mutation) {
    //     console.log(mutation);
    //     console.log(`${mutation.type} - list updated`);
    //   });
    // };

    // // create an observer instance
    // const observer = new MutationObserver(logMutations);

    // observer.observe(target, { attributes: true });
  }, []);

  useEffect(() => {
    // console.log('change');
  }, []);

  useEffect(() => {
    if (targetEl) {
      const currTarget = targetEl.current.offsetHeight - document.documentElement.clientHeight;

      if (currTarget !== targetSize) {
        setTargetSize(targetEl.current.offsetHeight - document.documentElement.clientHeight);
      }
      if (targetEl.current.offsetHeight <= (document.documentElement.clientHeight - targetEl.current.offsetTop)) {
        setSticky(false);
      } else {
        setSticky(true);
      }
    }

  }, [windowSize, targetSize, targetEl]);

  useEffect(() => {

    if (targetEl) {

      // return;
      const { clientHeight,
        clientWidth, contentScrollHeight,
        contentScrollWidth, scrollHeight, scrollLeft, scrollTop } = scrollState;
      // const scrollSize = contentScrollHeight - clientHeight - scrollTop;

      // console.log('-------', targetEl.current.offsetHeight);
      // console.log('-------', targetSize, { scrollTop, contentScrollHeight, contentScrollWidth, scrollHeight });
      let dir;

      const upTargetSize = targetEl.current.offsetHeight - document.documentElement.clientHeight;

      if (targetEl.current.offsetHeight <= (document.documentElement.clientHeight - scrollOffset)) {
        targetEl.current.style.top = `${scrollOffset}px`;
        return;
      }

      if (typeof scrollTop == 'undefined') {
        setScrollBehavior('down');
        return;
      }

      if (scrollTop <= 0) {
        setScrollStart(scrollTop);
      } else {
        setScrollStart(scrollTop);
      }

      if (scrollStart !== scrollTop) {
        const dir = scrollTop > scrollStart ? 'down' : 'up';
        if (upTargetSize === targetSize) {
          setScrollBehavior(dir);
        }
      }

      // if (!targetSize) {
      //   setTargetSize(targetEl.current.offsetHeight - document.documentElement.clientHeight);
      //   if (upTargetSize !== targetSize) {
      //     console.log('updating', { targetSize, a: document.documentElement.clientHeight, b: targetEl.current.offsetHeight });
      //     setScrollBehavior('up');
      //   }
      // }
    }

  }, [scrollState, scrollStart, targetSize, scrollOffset]);

  useEffect(() => {
    if (scrollBehavior && scrollOffset && targetEl) {
      // console.log('[scrollOffset]', scrollOffset);
      if (targetEl.current.offsetTop == scrollOffset) {
        setDivider(0)
      } else {
        setDivider(targetEl.current.offsetTop - scrollOffset)
      }
    }
  }, [scrollBehavior, scrollOffset, targetEl]);

  useEffect(() => {
    if (scrollBehavior) {
      console.log('[scrollBehavior]', scrollBehavior);
      if (scrollBehavior == 'down') {
        // console.log('1');
        setScrollBehaviorStyle({ top: -targetSize });
      } else if (scrollBehavior == 'up') {
        // console.log('2');
        setScrollBehaviorStyle({ bottom: -(targetSize + (scrollOffset)) })
      }
    }
  }, [scrollOffset, scrollBehavior, targetSize])

  // console.log('[fixed]');

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
        <StaticComponent>
          {props.children}
        </StaticComponent>
      </div>
    </div>
  )
}

export default StickyScroll;