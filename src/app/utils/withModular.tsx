import {useModular, WithModularShcheme} from '@store/context/Modular.context';
import React, { Component } from 'react';



const withModular = (Wrapped: any) => {
  // const [modularScheme, setModule] = useModular();
  const moduleScheme: WithModularShcheme = {
    moduleID: 1,
    Views: {}
  }
  
  console.log('withModular', );

  class HeaderEl extends Component {

    render() {
      return <Wrapped />
    }
  };

  return HeaderEl;
}

export default withModular;