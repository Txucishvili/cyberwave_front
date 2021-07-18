import React, { Fragment } from 'react';

const BlockEl = (props: any) => {
  const {width = '100%', height = '100%'} = props;
  return <Fragment>
    <div className="blockEl" style={{
      width, height,
      backgroundColor: 'rgb(255 255 255 / 8%)',
      borderRadius: 8,
      marginBottom: 20
    }}>
      {props.children}
    </div>
    </Fragment>
}

export default BlockEl