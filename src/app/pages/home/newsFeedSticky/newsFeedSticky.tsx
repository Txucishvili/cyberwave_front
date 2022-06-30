import StreamBox from '@components/streamBox/streamBox';
import './newsFeedSticky.scss';
import React from 'react';
import GameList from '@components/gameList/gameList';

const NewsFeedSticky = (props: any) => {
  console.log('NewsFeedSticky',  props);
  return (
    <div className="el"
      id="movableElcontent">
      <div className="component-news-feed-sticky">
        <StreamBox />
        <GameList />
        {/* <EmblaSlider>
          {(embla: any) => {
            return <Streaming {...embla} />
          }}
        </EmblaSlider> */}
      </div>
    </div>
  )
}

export default NewsFeedSticky;