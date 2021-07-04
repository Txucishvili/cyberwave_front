import React, { Suspense } from 'react';
import './utils.scss';
import NavigationIconList, * as NavPack from './Navigation';
import SharedIconList from './Shared';
const packPath = './';

const IconPackMap: any = {
  nav: 'Navigation',
  shared: 'Shared'
}



const NavigationIcons = (props: any) => {
  const { pack, name } = props;

  // TODO: !!!!

  const allList = Object.assign(NavigationIconList, SharedIconList)

  return (
    <div className="_icon--wrap">
      {allList[name]}
    </div>
  )
}

const allList = Object.assign(NavigationIconList, SharedIconList)

const SvgIcon = (props: any) => {
  const { pack, name }:any = props;

  // const IconPack = React.lazy(() => import(packPath + IconPackMap[props.pack] + '.tsx'));
  const IconPack = NavPack.default; // TODO: !!
  return (
    <div className="_icon">

      <Suspense fallback={props.noLoad ? null : <div className="svgIconLoad"></div>}>
        <div className="_icon--wrap">
          {allList[name]}
        </div>
      </Suspense>

    </div>
  )
}

export default SvgIcon;