import BlockEl from 'app/components/utils/BlockEl';
import { useResizeContext } from 'app/store/context/WindowResize';
import React, { Component, useEffect } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import './newsFeedSticky.scss';

class StickyListing extends Component<any, any> {
  render() {
//     console.log('-----------------------');
    return (
      <div className="stickyList">

        {Array(1).fill(null).map((e, i) => {
          return <BlockEl key={i} height="176px" />
        })}
      </div>
    )
  }
}


const NewsFeedSticky = (props: any) => {
  // const [windowSize, setResizeState]: any = useResizeContext();

  // useEffect(() => {
  //   // console.log('windowSize', windowSize);
  //   const sideA: HTMLElement | any = document.querySelector('#sideAcontent #movableTarget');
  //   const sideB: HTMLElement | any = document.querySelector('#sideBcontent #movableTarget');
  //   const movableEl: HTMLElement | any = document.getElementById('movableElcontent');
  //   // parrent.appendChild(child);

  //   if (windowSize.innerWidth <= 1430) {
  //     // movableEl.classList.remove('sticky-side');
  //     // sideB.appendChild(movableEl);
  //   } else {
  //     // movableEl.classList.add('sticky-side');
  //     // sideA.appendChild(movableEl);
  //   }
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   // usePortal(childRef, parrentRef);
  // }, [windowSize])

//   console.log('[NewsFeedSticky]');
  return (
    <div className="el"
      id="movableElcontent">
      {/* <p>{scrollBehavior}</p> */}


      <StickyListing />

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
  )
}

export default NewsFeedSticky;