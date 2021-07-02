import React, { Suspense } from 'react';
import './utils.scss';
import * as NavPack from './Navigation';
const packPath = './';

const IconPackMap: any = {
  nav: 'Navigation',
  shared: 'Shared'
}

const SvgIcon = (props: any) => {
  // const IconPack = React.lazy(() => import(packPath + IconPackMap[props.pack] + '.tsx'));
  const IconPack = NavPack.default; // TODO: !!
  return (
    <div className="_icon">

      <Suspense fallback={props.noLoad ? null : <div className="svgIconLoad"></div>}>
        <IconPack {...props} />
      </Suspense>

    </div>
  )
}

export default SvgIcon;