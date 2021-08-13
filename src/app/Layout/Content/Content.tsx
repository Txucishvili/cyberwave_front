import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import AppPages from '../../pages';
import './Content.scss';
import Header from '../Header/Header';
import NewsFeedFixed from '@pages/home/newsFeedFixed/newsFeedFixed';
import ContentGrid from '@Layout/contentGrid/contentGrid/contentGrid';
import { useSessionContext } from '@store/context/UserSession.context';
import HomePage from '@pages/home';

const RouterComponent = (props) => {
  const [session,] = useSessionContext();

  return (
    <div className="content--inside--wrap">
      <ContentGrid
        className={'content-grid--c'}
        contentSide={
          session.user ? <NewsFeedFixed /> : null
        }
      >
        <React.Suspense fallback={<span>Loading...</span>}>
          <Switch>
            <Route exact path="/" render={() =>
              <AppPages.HomePage data={props.data} />} />
            <Route path="/list" render={(e) =>
              <AppPages.ListPage props={e} />} />
            <Route path="/user" render={(e) =>
              <AppPages.UserPage props={e} />} />
            <Route path="/games" render={(e) =>
              <AppPages.GamesPage props={e} />} />
          </Switch>
        </React.Suspense>
      </ContentGrid>
    </div>
  )
}

const MemoPage = React.memo(RouterComponent, () => true);

const Content = (props: any) => {
  const height = useRef(null);


  useEffect(() => {
    //     console.log(height);
  })

  console.log('[Layout] Content', props.modular);
  return (
    <div className="content content--wrapper">

      <Header
        // modular={props.modular}
      />
      <RouterComponent />

    </div>
  )
}

export default Content;