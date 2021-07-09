import BlockEl from 'app/components/utils/BlockEl';
import { useScrollbarContext } from 'app/store/context/ScrollBarContext';
import { ResizeContext } from 'app/store/context/WindowResize';
import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
// import './content.scss';

const NewsFeedList = (props: any) => {
  const [posts, setPosts] = useState(7);
  const [addingPosts, setAddPosts] = useState(false);
  const [scrollState, setScrollState] = useScrollbarContext();

  useEffect(() => {
    const {
      contentScrollHeight, clientHeight, scrollTop
    } = scrollState;
    const scrollSize = contentScrollHeight - clientHeight - scrollTop;

    if (scrollSize <= 250 + 80 + 35 + 15) {
      setAddPosts(true);
    }

  }, [scrollState]);

  useEffect(() => {
    if (addingPosts && posts <= 20) {
      // console.log('----', addingPosts);
      setPosts(posts + 2);
      setAddPosts(false);
    }

  }, [posts, addingPosts]);

  const newsList = Array(posts).fill(null).map((e, i) => {
    return <BlockEl key={i} height="500px" />
  });

  // console.log('[HomePage FeedList]');

  return (
    <div className="lists">

      {newsList}

    </div>
  )
}

export const NewsFeedContent = (props: any) => {
  const [posts, setPosts] = useState(7);

  //   console.log('[HomePage] [Content]');

  return (
    <div className="child_">
      <div className="stories flx"
        style={{
          flexWrap: 'wrap',
          overflowX: 'auto',
          height: 245,
          whiteSpace: 'nowrap'
        }}
      >
        <Scrollbar
          style={{
            width: '100%',
          }}
        >
          <div className="storylist flx">
            {Array(7).fill(null).map((e, i) => {
              return <div key={i} className="blockEl" style={{
                backgroundColor: 'transparent',
                borderRadius: 8,
                width: 165,
                height: 220,
                marginRight: 20,
                flexBasis: 165,
                flexShrink: 0
              }}>
                <Scrollbar
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {
                    // console.log('[child]')
                  }
                  <div className="storylist">
                    {Array(7).fill(null).map((e, i) => {
                      return <div key={i} className="blockEl" style={{
                        backgroundColor: 'rgb(255 255 255 / 8%)',
                        borderRadius: 8,
                        width: '100%',
                        height: 35,
                        marginBottom: i == 6 ? 0 : 10
                      }}>

                      </div>
                    })}
                  </div>
                </Scrollbar>
              </div>
            })}
          </div>
        </Scrollbar>
      </div>
      <br />

      <NewsFeedList />

    </div>
  )
}
