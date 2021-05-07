import React from 'react';
import HomePage from './home/index';
import ListPage from './list/index';
import UserPage from './user/index';

// export default {
//     HomePage,
//     ListPage,
//     UserPage,
// };

export default {
    HomePage: React.lazy(() => import('./home/index')),
    ListPage: React.lazy(() => import('./list/index')),
    UserPage: React.lazy(() => import('./user/index')),
};
