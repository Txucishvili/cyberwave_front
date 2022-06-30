import React, { Fragment } from 'react';

const BlockEl = (props: any) => {
  const {width = '100%', height = '100%'} = props;
  const styleObj = {
    width, height,
    backgroundColor: 'rgb(255 255 255 / 8%)',
    borderRadius: 8,
    marginBottom: 20,
  }
  if (props.style) {
    Object.assign(styleObj, props.style)
  }
  return <Fragment>
    <div className="blockEl" style={styleObj}>
      {props.children}
    </div>
    </Fragment>
}

export default BlockEl