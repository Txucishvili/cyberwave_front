import React from 'react';
import Loadable from 'react-loadable';
import NewsFeedLoader from './home/LoaderLayout';

const MainPageLoadable = Loadable({
	loader: () => import('./home/index'),
	loading: NewsFeedLoader,
});


export default {
	HomePage: MainPageLoadable,
	ListPage: React.lazy(() => import('./list/index')),
	UserPage: React.lazy(() => import('./user/index')),
	GamesPage: React.lazy(() => import('./games/index')),
};
