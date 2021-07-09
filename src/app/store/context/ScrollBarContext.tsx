import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import Scrollbar from "react-scrollbars-custom";

export const initState = {};

export const ScrollbarContext = createContext<[any, any]>([initState, () => { }]);
export const useScrollbarContext: any = () => useContext(ScrollbarContext);


function ResizeReducer(state: any, action: any) {
  // console.log('state', {
  //   state,
  //   action
  // });
  // console.log('state', { state, action });

  return Object.assign({}, state, action);
}

export const ScrollbarProvider: React.FC<any> = (props: any) => {
  const [scrollState, setScrollState] = React.useReducer(ResizeReducer, initState)
  const defaultContext: [any, any] = [scrollState, setScrollState];

  const onScroll = (e: any) => {
    const {
      clientHeight,
      clientWidth,
      contentScrollHeight,
      contentScrollWidth,
      scrollHeight,
      scrollLeft,
      scrollTop
    } = e;
    const scrollSize = contentScrollHeight - clientHeight - scrollTop;

    setScrollState(e);
    // props.children.props.onScroll(e);

    // console.log('[onScroll]', elRef);

  }
  const elRef: any = useRef(null);

  return (
    <ScrollbarContext.Provider value={defaultContext}>
      <Scrollbar
        // scrollTop={}
        // disableTracksWidthCompensation={true}
        // permanentTrackY={true}
        createContext={true}
        // native
        thumbXProps={{
          // eslint-disable-next-line react/display-name
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return <span {...restProps} ref={elementRef} className="ThUmBX ThUmBXXXXXXX" />;
          }
        }}
        ref={elRef}
        elementRef={elRef}
        onScroll={onScroll}
        style={{ width: '100%', height: '100%' }}
      >
        {props.children}

      </Scrollbar>
    </ScrollbarContext.Provider>
  );
}

