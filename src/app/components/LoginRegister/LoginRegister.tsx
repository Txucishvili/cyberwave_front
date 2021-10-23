import HTTPClient from "@API/axios";
import React from "react";
import { useSessionContext, userDispatcher , Dispatcher, Session} from "@store/context/UserSession.context";
import Button from "../Shared/Button/Button";
import { LoadModularScheme } from "@modules/";


export const LoginPrompt = () => {
  const [session, setSession]: any = useSessionContext();
  return (
    <div>
      {!!session.user ? 'user' : 'you must login'}
    </div>
  )
}

const LoginRegisterButtons = (props: any) => {
  const [session, setSession] = useSessionContext();

  function login() {
    window.localStorage.setItem('token', 'value');
    setSession({type: "SET_LOADER", value: true})

    HTTPClient.get('user.json').then(e => {
      LoadModularScheme('User').then(r => {
        setSession({
          type: 'SET_USER',
          value: {
            user: e.data,
            modularScheme: {
              prefix: 'User1Scheme',
              scheme: r.default
            }
          }
        })
      });
    })
  }

  function register() {
    window.localStorage.setItem('token', 'value2');

    setSession({type: "SET_LOADER", value: true});

    HTTPClient.get('user-simple.json').then(e => {
      LoadModularScheme('Admin').then(r => {
        setSession({
          type: 'SET_USER',
          value: {
            user: e.data,
            modularScheme: {
              prefix: 'User2Scheme',
              scheme: r.default
            }
          }
        })
      });
    });
    
  }


  function logout() {
    window.localStorage.setItem('token', 'value2');
    HTTPClient.get('user.json').then(e => {
      import(
        /* webpackChunkName: "NoRegister" */
        /* webpackMode: "lazy" */
        '@modules/Default/index'
      ).then(r => {
        setSession({
          type: 'SET_USER',
          value: {
            user: e.data,
            modularScheme: {
              prefix: 'User2Scheme',
              scheme: r.default
            }
          }
        })
      });
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