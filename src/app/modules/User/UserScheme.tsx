
import React, { Component, useEffect, useState } from "react";

const withUser = (props: any) => {

  const Lazy: any = React.lazy(() => import('../../Layout/Header/UserSide'))
  const Module: any = props.id;
  console.log('withUser', Lazy);
  // console.log('module', props.modules.props);

  // eslint-disable-next-line react/display-name
  return class extends React.Component {

    render() {
      return (
        // <React.Suspense fallback={<span>Loading...</span>}>
        //   <Lazy>
        //     {props.children}
        //   </Lazy>
        // </React.Suspense>
        <div>
          {props.children}
        </div>

      )
    }
  }

}

export default withUser;