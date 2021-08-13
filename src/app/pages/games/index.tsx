import BlockEl from '@components/utils/BlockEl';
import React, { useContext, useEffect, useState } from 'react';
import './GamesPage.scss';
import HeadingSlider from './headingSlider';

const GamesPage = (props: any, data?: any) => {

  return (<React.Fragment>
    <div className="games-page games-page--wrap">
      <HeadingSlider />

      <div className="filter" style={{ position: 'sticky' }}>
        <BlockEl style={{ height: 65, marginBottom: 35 }} />
      </div>
      {Array(5).fill(null).map((e, key) => {
        return <div key={key} className="gameListing flx" style={{ justifyContent: 'space-between' }}>
          <BlockEl style={{ width: 266, height: 355 }} />
          <BlockEl style={{ width: 266, height: 355 }} />
          <BlockEl style={{ width: 266, height: 355 }} />
          <BlockEl style={{ width: 266, height: 355 }} />
          <BlockEl style={{ width: 266, height: 355 }} />
        </div>

      })}
    </div>
  </React.Fragment>)
}

export default GamesPage;
