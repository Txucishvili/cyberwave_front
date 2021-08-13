import HTTPClient from '@API/axios';
import SectionTitle from '@components/sectionTitle/sectionTitle';
import Button from '@components/Shared/Button/Button';
import LoaderBox from '@utils/LoaderBox';
import React, { Component, useEffect, useState } from 'react';
import './gameList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '@store/redux';
import { selectGames, addGame } from '@store/redux/Slices/games.store';
import BlockEl from '@components/utils/BlockEl';

const GamesListing = (_props) => {
  const [list, setList] = useState([]);
  const [clientHeight, setHeight] = useState(300);
  const [sliceRange, setSlice] = useState(7);
  const dispatch = useDispatch();
  const gameList = useAppSelector(state => state.gameList.list);
  // const gameList = selectCount(state => state.gameList);

  // useEffect(() => {
  //   HTTPClient.get('./user-games.json').then(r => {
  //     console.log('[user-games.json]', r.data.results);
  //     // console.log('[user-games.json]', addGame('test'));
  //     // setList(r.data.results);
  //     dispatch(addGame(r.data.results))
  //   })
  // }, []);

  const gameLists = gameList.reduce((_prev, _curr, index, array) => {
    // console.log('prev, acc', { _prev, _curr, index, array });
    // for (let index = 0; index < 15; index++) {
    //   _prev.push(_curr);
    // }
    _prev.push(_curr);
    return _prev;
  }, [])

  const loadMore = () => {
    setSlice(sliceRange + 5);
    setHeight(clientHeight + 300);
  }
  useEffect(() => {
    // console.log('--[gamesList]', gameList);
  }, [gameList])
  return (
    <div className="game-list-area">
      <div className="game-list">
        {/* <BlockEl style={{
          width: '100%',
          height: clientHeight
        }} /> */}
        {gameLists.length ? gameLists.map((e: any, key: any) => {
          return (<div key={key}>
            <div onClick={() => {
              // dispatch(incremented());
            }} className="game-item flx">
              <div className="image-area">
                <img src={e.background_image} alt="" />
              </div>
              <div className="name-area">
                <p className="title">{e.name}</p>
                <p className="desc">{e.released}</p>
              </div>
              <div className="right-area">
                <p className="number">{e.rating}</p>
              </div>
            </div>
          </div>
          )
        }).slice(0, sliceRange)
          : null}
      </div>
      {sliceRange < gameLists.length
        ? <div className="load-more flx flxJC">
          <Button onClick={loadMore}>
            <p>მაჩვენე მეტი</p>
          </Button>
        </div>
        : null}
    </div>
  )
}


export default class GameList extends Component {
  render() {
    return (
      <div className="component-game-list">
        <SectionTitle>
          <p>ჩემი თამაშები</p>
        </SectionTitle>
        <GamesListing />
        <br />
      </div>
    )
  }
}