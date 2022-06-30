import * as GamesStore from './games.store';
import * as LiveStreamsStore from './liveStreams.store';
import * as UserStore from './users.store';
import * as UserJobs from './userJobs.store';
import * as GamesPageStore from './games-page.store';

const reducer = {
  [UserStore.name]: UserStore.default.reducer,
  [GamesStore.name]: GamesStore.default.reducer,
  [LiveStreamsStore.name]: LiveStreamsStore.default.reducer,
  [UserJobs.name]: UserJobs.default.reducer,
  [GamesPageStore.name]: GamesPageStore.default.reducer,
};


export default reducer;