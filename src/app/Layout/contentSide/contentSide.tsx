import React from 'react';

const FixedContainerContent = (props: any) => {
  const { className, ...newProps } = props;

  return (
    <div className={['content-side--wrapper'].concat(props.className).join(' ')}>
      <div className="content-inside">
        <div className="content-inside--wrapper _rsp">
          {props.children}
        </div>
      </div>

    </div>
  )
}

const FixedContainer = (props: any) => {
  const { className, ...newProps } = props;

  return (
    <div className={
      ['content-side--wrapper']
      .concat(props.className).join(' ')}>
      {props.children}
    </div>
  )
}

export default FixedContainer;