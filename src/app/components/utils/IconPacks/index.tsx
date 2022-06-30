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

export interface SVGIconProps {
  pack: string,
  name: string,
  noLoad?: boolean | null,
  rotate?: number | string
}

const SvgIcon = (props: SVGIconProps) => {
  const { pack, name, rotate }: SVGIconProps = props;

  // const IconPack = React.lazy(() => import(packPath + IconPackMap[props.pack] + '.tsx'));
  const IconPack = NavPack.default; // TODO: !!

  const styles = {};
  if (!!rotate) {
    Object.assign(styles, {
      transform: `rotate(${rotate}deg)`
    })
  }

  return (
    <div className="_icon">

      <Suspense fallback={props.noLoad ? null : <div className="svgIconLoad"></div>}>
        <div className="_icon--wrap s" style={styles}>
          {allList[name]}
        </div>
      </Suspense>

    </div>
  )
}

export default SvgIcon;