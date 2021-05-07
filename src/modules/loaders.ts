import _ from 'lodash';
console.log('a', _.partition([1, 2, 3, 4], n => n % 2));

const LoaderModule: any = ['loaders'];

console.log('[Loaders Module] index 2')

export default LoaderModule;
