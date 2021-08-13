import React, { ExoticComponent, Suspense, SuspenseProps } from 'react';
import UserSides from '@Layout/Header/UserSide';

export const Registered = {
  name: 'Registered',
  HeaderSide: UserSides
}

const Renderer = (props) => {
  console.log('-------- [renderer]', props);
  props.getModules({
    name: 'Registered',
    scheme: Registered
  });
  return (
    <div>
      RENDERER...
    </div>
  )
}

export default Renderer;