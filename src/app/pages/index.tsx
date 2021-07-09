import React from 'react';
import Loadable from 'react-loadable';
import NewsFeedLoader from './home/LoaderLayout';

const LoadableComponent = Loadable({
	loader: () => import('./home/index'),
	loading: NewsFeedLoader,
});


export default {
	HomePage: LoadableComponent,
	ListPage: React.lazy(() => import('./list/index')),
	UserPage: React.lazy(() => import('./user/index')),
};
