/* eslint-disable react-hooks/exhaustive-deps */
import BlockEl from 'app/components/utils/BlockEl';
import ContentGrid from 'app/Layout/contentGrid/contentGrid/contentGrid';
import ContentSide from 'app/Layout/ContentSide/contentSide';
import React, { DOMElement, Suspense, useContext, useEffect, useReducer, useRef, useState } from 'react';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import NewsFeedSticky from './newsFeedSticky/newsFeedSticky';
import HomePageContent from './newsFeed/newsFeed';
import NewsFeedFixed from './newsFeedFixed/newsFeedFixed';

const HomePage = (props: any) => {
  console.log('[HomePage]');

  return <React.Fragment>
    <ContentGrid
      contentSide={
        <NewsFeedFixed />
      }
    >
      <HomePageContent />
    </ContentGrid>
  </React.Fragment>
}

export default HomePage