import partition from "lodash/partition";
console.log('a', partition([1, 2, 3, 4], n => n % 2));

const ExtraModule: any = ['extras'];

console.log('- Lazy [Extra Module] index 2');

export default ExtraModule;
