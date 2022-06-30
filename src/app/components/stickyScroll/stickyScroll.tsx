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
  const [offsetTop, setOffsetTop]: any = useState(0);
  const targetEl: any = createRef();
  const [targetSize, setTargetSize]: any = useState(0);

  const [scrollState, setScrollState] = useScrollbarContext();
  const [windowSize,] = useResizeContext();



  const [targetOpt, setTargetOpt]: any = useState(null);
  const [scrollTopTargetSize, setScrollTopTargetSize]: any = useState(null);

  useEffect(() => {
    // setOffsetTop(targetEl.current.parentNode.offsetTop);
    console.log('[init]', targetEl);
    if (!offsetTop) {
      setOffsetTop(targetEl.current.parentNode.offsetTop);
      return;
    }
  }, []);

  useEffect(() => {
    if (targetEl.current) {
      const currTarget = targetEl.current.offsetHeight - document.documentElement.clientHeight;

      const TargetOpts = {
        offsetHeight: targetEl.current.offsetHeight,
        scrollTop: targetEl.current.scrollTop,
        viewDivide: targetEl.current.offsetHeight >= (document.documentElement.clientHeight - 115) ? Math.abs((115 - (targetEl.current.offsetHeight - (document.documentElement.clientHeight - 115)))) : null,
      };

      if (targetOpt == null) {
        setTargetOpt(TargetOpts)
      }
    }

  }, [windowSize, targetEl, targetOpt]);

  useEffect(() => {

    if (targetEl.current != null && offsetTop) {

      // return;
      const { clientHeight,
        clientWidth, contentScrollHeight,
        contentScrollWidth, scrollHeight, scrollLeft, scrollTop } = scrollState;



      if (targetEl.current.offsetHeight <= (document.documentElement.clientHeight - offsetTop)) {
        targetEl.current.style.top = `${offsetTop}px`;
        return;
      }

      setScrollStart(scrollTop);

      console.log('offsetTop', scrollTop);


      if (scrollStart !== scrollTop) {
        const dir = scrollTop > scrollStart ? 'down' : 'up';
        setScrollBehavior(dir);
      }
    }

  }, [scrollState, offsetTop, targetEl]);



  useEffect(() => {
    if (scrollBehavior) {
      console.log('[scrollBehavior]', { scrollBehavior, targetSize, targetOpt, top: targetEl.current.offsetTop });
      if (scrollBehavior == 'down') {
        setScrollBehaviorStyle({ top: -(targetEl.current.clientHeight - windowSize.innerHeight) });
        // console.log('targetEl.current', scrollState.scrollTop);
      } else if (scrollBehavior == 'up') {
        // setDivider(targetEl.current.offsetTop);
        // setDivider(scrollState.scrollTop);
        setScrollBehaviorStyle({ bottom: -(targetSize + (offsetTop)) })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetTop, scrollBehavior, targetSize, targetOpt])

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