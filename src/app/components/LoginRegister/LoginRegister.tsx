import HTTPClient from "@API/axios";
import React from "react";
import { useSessionContext } from "@store/context/UserSession.context";
import Button from "../Shared/Button/Button";


export const LoginPrompt = () => {
  const [session, setSession]: any = useSessionContext();
  return (
    <div>
      {session.isLoggedIn ? 'user' : 'you must login'}
    </div>
  )
}

const LoginRegisterButtons = (props: any) => {
  const [session, setSession]: any = useSessionContext();

  function login() {
    window.localStorage.setItem('token', 'value');
    HTTPClient.get('user-simple.json').then(e => {
      setSession({ type: 'SET_USER', value: e.data });
    })
  }

  function register() {
    window.localStorage.setItem('token', 'value');
    HTTPClient.get('user.json').then(e => {
      setSession({ type: 'SET_USER', value: e.data });
    })
  }

  return (
    <div className="flx">
      <Button onClick={login}>
        <p>Login</p>
      </Button>
      <div style={{ marginLeft: 10 }}>
        <Button onClick={register}>
          <p>Register</p>
        </Button>
      </div>
    </div>
  )
}

export default LoginRegisterButtons;