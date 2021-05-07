// import partition from "lodash/partition";
// console.log('a', partition([1, 2, 3, 4], n => n % 2));

const ExtraModule: any = ['extras'];

import( 
    /* webpackChunkName: "lazyLoaded" */ 
    './extras.lazy').then(modules => {
    console.log('module 2a', modules);
});
console.log('[Extra Module] index 12222')

export default ExtraModule;