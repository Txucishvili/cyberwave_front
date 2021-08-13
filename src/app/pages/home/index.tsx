/* eslint-disable react-hooks/exhaustive-deps */
import BlockEl from '@components/utils/BlockEl';
import ContentGrid from '@Layout/contentGrid/contentGrid/contentGrid';
import ContentSide from '@Layout/ContentSide/contentSide';
import React, { DOMElement, Suspense, useContext, useEffect, useReducer, useRef, useState } from 'react';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import NewsFeedSticky from './newsFeedSticky/newsFeedSticky';
import HomePageContent from './newsFeed/newsFeed';
import NewsFeedFixed from './newsFeedFixed/newsFeedFixed';
import HTTPClient from '@API/axios';
import { useDispatch } from 'react-redux';
import { addGame } from '@store/redux/Slices/games.store';
import { useAppSelector } from '@store/redux';
import { pushJobs } from '@store/redux/Slices/userJobs.store';
import NewsFeedLoader from './LoaderLayout';

const HomePage = (props: any) => {
  console.log('[HomePage]');

  // return <NewsFeedLoader />;

  const dispatch = useDispatch();
  const [loading, setLoad] = useState(true);
  const gameList = useAppSelector(state => state.gameList.list);
  const userJobs = useAppSelector(state => state.userJobs.list);

  useEffect(() => {
    HTTPClient.get('./user-games.json').then(r => {
      // console.log('[user-games.json]', r.data);
      // console.log('[user-games.json]', addGame('test'));
      // setList(r.data.results);
      dispatch(addGame(r.data.results))
    });

    HTTPClient.get('./user-jobs.json').then(r => {
      // console.log('[user-jobs.json]', r.data);
      // console.log('[user-games.json]', addGame('test'));
      // setList(r.data.results);
      dispatch(pushJobs(r.data));
      // setLoad(false);
    });
  }, []);

  useEffect(() => {
    if (!!gameList.length && !!userJobs.length) {
      setLoad(false);
    }

    if (!userJobs.length) {
      HTTPClient.get('./user-jobs.json').then(r => {
        // console.log('[user-jobs.json]', r.data);
        // console.log('[user-games.json]', addGame('test'));
        // setList(r.data.results);
        dispatch(pushJobs(r.data));
        // setLoad(false);
      });
    }
  }, [userJobs, gameList]);

  if (loading) {
    return <NewsFeedLoader />
  } else {
    return <React.Fragment>
      <HomePageContent />
    </React.Fragment>
  }
}

export default React.memo(HomePage, () => true)