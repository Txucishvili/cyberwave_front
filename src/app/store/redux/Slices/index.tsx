import * as GamesStore from './games.store';
import * as LiveStreamsStore from './liveStreams.store';
import * as UserStore from './users.store';
import * as UserJobs from './userJobs.store';

let reducers: any = [];

//#region array to ojb
// for (const key in Slices) {
//   if (Object.prototype.hasOwnProperty.call(Slices, key)) {
//     const element = Slices[key];
//     reducers.push({
//       [element.name]: element.default.reducer
//     })
//   }
// }

// const toObj = (array) => {
//   const returnObj: any = {};
//   array.forEach((e, key) => {
//     returnObj[Object.keys(e)[0]] = e[Object.keys(e)[0]];
//   });

//   return returnObj;
// }

// const reducer = toObj(reducers);
//#endregion

const reducer = {
  [UserStore.name]: UserStore.default.reducer,
  [GamesStore.name]: GamesStore.default.reducer,
  [LiveStreamsStore.name]: LiveStreamsStore.default.reducer,
  [UserJobs.name]: UserJobs.default.reducer
};


export default reducer;