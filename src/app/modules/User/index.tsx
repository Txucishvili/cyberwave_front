import React, { ExoticComponent, Suspense, SuspenseProps } from 'react';



export const ModularScheme = {
  0: React.lazy(() => import('./NoRegister')),
  1: React.lazy(() => import('./Registered'))
}

export default ModularScheme;