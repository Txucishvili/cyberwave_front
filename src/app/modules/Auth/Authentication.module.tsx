import HTTPClient from '@API/axios';
import { SessionContext } from '@store/context/UserSession.context';
import { ModuleLoader } from '@utils/Functions';
import React, { Component, Suspense } from 'react';
import loadable from 'react-loadable';

const Loader = () => {
  return <div>Loadiong</div>
}


const AuthContextLoadable: any = loadable({
  loader: () => import('../../store/context/Modular.context'),
  loading: Loader,
});

const AppLazy: any = React.lazy(() => import('../../App'));
import App from '../../App';
import { Provider } from 'react-redux';
import store from '@store/redux';
import ModularContextProvider from '@store/context/Modular.context';


export default class AuthModule extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      user: null,
      modular: null
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

  // componentDidUpdate() {

  // }

  static getDerivedStateFromProps(props: any, state: any) {
    // console.log('getDerivedStateFromProps', props, state);

    return {
      modular: !!props.user ? { module: 1 } : { module: 0 },
      user: props.user
    };
  }

  shouldComponentUpdate(props: any, state: any) {
    // console.log('[AuthModule] shouldComponentUpdate', {props, state});

    return true;
  }


  // TODO: add correct module loading !!!!
  render() {
    console.log('AuthModule', this.state, this.props);
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
