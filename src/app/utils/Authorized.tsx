import { useSessionContext } from '@store/context/UserSession.context';
import React from 'react';

const AuthSwitch = (props: any) => {


  console.log('AuthSwitch');

  return (
    <div>
      {props.children}
    </div>
  )
}

export const withUser = (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [session, setSession] = useSessionContext();
  const {children} = props;

  return (
    <div>
      {session.user
        ? children
        : null}
    </div>
  )
}

export default AuthSwitch;