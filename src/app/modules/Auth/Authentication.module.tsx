import HTTPClient from 'API/axios';
import { SessionContext } from 'app/store/context/UserSession.context';
import { ModuleLoader } from 'app/utils/Functions';
import React, { Component, Suspense } from 'react';
import loadable from 'react-loadable';

const Loader = () => {
  return <div>Loadiong</div>
}

import AuthContextProvider from '../../store/context/Auth.context';

const AuthContextLoadable: any = loadable({
  loader: () => import('../../store/context/Auth.context'),
  loading: Loader,
});

const AppLazy: any = React.lazy(() => import('app/App'));

export default class AuthModule extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      isLoaded: false
    }
  }


  componentDidMount() {
    // console.log('[UserSessionContext]', sessionState);
    // console.log('this.contextType', this.props);
    // if (this.props.token) {
    //   HTTPClient.get('user.json').then(e => {
    //     if (e.data) {
    //       console.log('---------', e.data);
    //       this.setState({ isLoaded: true, user: e.data })
    //     }
    //   })
    // }
  }

  shouldComponentUpdate(props: any, state: any) {
    console.log('-=----', props, state);

    if (!!props.user && !state.isLoaded) {
      this.setState({ isLoaded: true });
    }

    console.log('-----', this.state);
    return !!this.props.user;
  }

  static getDerivedStateFromProps(props: any, state: any) {
    // ...
    // console.log('----', { props, state });
    if (!props.isLoaded) {
      return false;
    } else {
      return true;
    }
    return false;
  }

  // TODO: add correct module loading !!!!
  render() {
    console.log('[AuthModule]', this.state);
    return (
      <div style={{ width: '100%', height: '100%' }}>

        {!this.state.isLoaded
          ? <Suspense fallback={'loading'}>
            {
    console.log('[AuthModule] A')
            }
            <AppLazy />
          </Suspense>
          : <AuthContextProvider data={this.props.user}>
            <Suspense fallback={'loading'}>
              {
    console.log('[AuthModule] B')
              }
              <AppLazy />
            </Suspense>
          </AuthContextProvider>
        }
      </div>
    )
  }
}
