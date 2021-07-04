/* eslint-disable react-hooks/exhaustive-deps */
import BlockEl from 'app/components/utils/BlockEl';
import { useResizeContext } from 'app/store/context/WindowResize';
import { divide } from 'lodash';
import React, { DOMElement, useContext, useEffect, useReducer, useRef, useState } from 'react';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import Emittr from 'react-scrollbars-custom/dist/types/Emittr';
const random = require('colors/lib/maps/random');

function countReducer(state: any, action: any) {
  console.log('---', state, action);
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 }
    }
    case 'decrement': {
      return { count: state.count - 1 }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function CountConsumer(props: any) {
  const scrollbarContext = useContext(ScrollbarContext);
  // console.log('children', scrollbarContext.parentScrollbar?.getScrollState());
  const { children } = props;
  const Sc: Scrollbar | any = ScrollbarContext.Consumer;
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  // console.log('state', state);

  const [scrollState, setState] = useState(scrollbarContext.parentScrollbar?.getScrollState());


  useEffect(() => {
    console.log('scrollState', scrollbarContext.parentScrollbar?.getScrollState()?.scrollTop);
  }, [scrollbarContext.parentScrollbar?.getScrollState().scrollTop])

  return (
    <ScrollbarContext.Provider value={{
      parentScrollbar: scrollbarContext.parentScrollbar
    }}>
      {children}
      <div style={{ height: 5000 }}>
        hi
      </div>
    </ScrollbarContext.Provider>
  )
}
console.log('ScrollbarContext', { ScrollbarContext });

const HomePage = (props: any) => {
  const scrollbarContext = useContext(ScrollbarContext);
  const [posts, setPosts] = useState(7);
  const [addingPosts, setAddPosts] = useState(false);

  const [scroll, setScroll] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollLast, setScrollEnd] = useState(0);
  const [dividerHeight, setDivider] = useState(0);
  const [scrollBehavior, setScrollBehavior] = useState('');
  const [scrollBehaviorStyle, setScrollBehaviorStyle] = useState({});
  const [isLocked, setLocked] = useState(true);
  const [targetSize, setTargetSize]: any = useState(0);
  const [scrollObj, setScrollObj]: any = useState({});
  const [scrollOffset, setscrollOffset]: any = useState(0);
  const targetEl: any = useRef(null);
  const scrollRef: any = useRef(Scrollbar);
  const [windowSize, setResizeState]: any = useResizeContext();

  function scrollBind(e: any) {
    console.log('e', e);
  }
  useEffect(() => {
    //     console.log('scrollbarContext', {
    //       ScrollbarContext,
    //       scrollbarContext,
    //       scrollRef
    //     });
    if (scrollbarContext.parentScrollbar && scrollbarContext.parentScrollbar.props.onScroll) {
      scrollbarContext?.parentScrollbar?.props?.onScroll.bind(scrollBind);

    }
    scrollbarContext.parentScrollbar?.eventEmitter.on('scroll', (e: any) => {
      const { clientHeight, clientWidth, contentScrollHeight, contentScrollWidth, scrollHeight, scrollLeft, scrollTop } = e;
      const scrollSize = contentScrollHeight - clientHeight - scrollTop;

      if (scrollSize <= 250 + 80 + 35 + 15) {
        setAddPosts(true);
      }

      // setScrollEnd(scrollTop)
      setScroll(scrollTop)
      setScrollObj(e)

    });
    return () => {
      console.log("[newsfeed unmount]");
    }
  }, [scrollbarContext.parentScrollbar?.eventEmitter]);

  useEffect(() => {
    //     console.log(targetEl.current.offsetTop);
    setscrollOffset(targetEl.current.offsetTop)

  }, []);

  useEffect(() => {
    if (addingPosts && posts <= 20) {
      // console.log('----', addingPosts);
      setPosts(posts + 2);
      setAddPosts(false);
    }

  }, [posts, addingPosts]);

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
    if (!targetSize || targetSize == 0) {
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

  useEffect(() => {
    // console.log('windowSize', windowSize);
    const sideA: HTMLElement | any = document.getElementById('sideAcontent');
    const sideB: HTMLElement | any = document.getElementById('sideBcontent');
    const movableEl: HTMLElement | any = document.getElementById('movableElcontent');
    // parrent.appendChild(child);

    if (windowSize.innerWidth > 1280) {
      movableEl.classList.add('sticky-side');
      sideA.appendChild(movableEl);
    } else {
      movableEl.classList.remove('sticky-side');
      sideB.appendChild(movableEl);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // usePortal(childRef, parrentRef);
  }, [windowSize])

  useEffect(() => {
    // scrollbarContext.parentScrollbar?.eventEmitter.off('scroll', (e) => {
    //   console.log("uunounnt");
    // });
  }, []);

  const newsList = Array(posts).fill(null).map((e, i) => {
    return <BlockEl key={i} height="500px" />
  });

  return <React.Fragment>
    <React.Fragment>

      <div className="content--grid content--grid--wrap">

        <div className="content-main content-main--wrap">
          <div className="content-main--content">
            <div className="container">
              <div className="row">
                <div className="col-sm side-a" id="sideAcontent">
                  <div className="someEl"
                    style={{
                      height: dividerHeight
                    }}
                  >
                  </div>
                  <div className="el sticky-side"
                    id="movableElcontent"
                    ref={targetEl}
                    style={scrollBehaviorStyle}>
                    {/* <p>{scrollBehavior}</p> */}


                    {Array(1).fill(null).map((e, i) => {
                      return <BlockEl key={i} height="176px" />
                    })}

                    <Scrollbar
                      // scrollbarWidth={20}
                      // fallbackScrollbarWidth={0}
                      style={{ height: 350 }}>
                      {Array(15).fill(null).map((e, i) => {
                        return <BlockEl key={i} height="25px" />
                      })}
                    </Scrollbar>

                    <br />
                    {Array(17).fill(null).map((e, i) => {
                      return <BlockEl key={i} height="55px" />
                    })}
                    <div style={{ height: 20, fontSize: 0 }} />

                  </div>
                </div>
                <div className="col-xl side-b">
                  <div className="child_">
                  <div className="stories flx"
                    style={{
                      justifyContent: 'space-between'
                    }}
                  >
                    {Array(3).fill(null).map((e, i) => {
                        return <BlockEl key={i} height="235px" width="165px" />
                      })}
                    </div>
                    {newsList}

                  </div>
                </div>
                <div className="col-sm side-c">
                  <div className="sideInside" id="sideBcontent">
                    
                    <div className="el">

                      {Array(11).fill(null).map((e, i) => {
                        return <BlockEl key={i} height="60px" />
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-side _rsp">
          <div className="container" id="sideAcontent">
            <div className="ct-side--inside sticky-side"
              style={{
                top: 90
              }}
            >
              {/* <Scrollbar
              style={{ width: '100%', height: 900 }}> */}
              {Array(15).fill(null).map((e, i) => {
                return <BlockEl key={i} height="100px" />
              })}
              {/* </Scrollbar> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  </React.Fragment>
}

export default HomePage