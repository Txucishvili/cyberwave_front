import HTTPClient from '@API/axios';
import { SessionContext } from '@store/context/UserSession.context';
import { ModuleLoader } from '@utils/Functions';
import React, { Component, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from '@store/redux';
import { SessionContextProvider } from '@store/context/UserSession.context';
import App from 'src/app/App';
import { LoadModularScheme } from '../../modules';


export default class AppInitHolder extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      user: undefined,
      modularScheme: null,
      shouldUpdate: false
    }
  }

  componentDidMount() {

    if (!!this.props.token) {
      if (this.props.token == "value") {
        HTTPClient.get('user.json').then(e => {
          LoadModularScheme(
            'User'
          ).then(r => {
            this.setState({ user: e.data, modularScheme: { prefix: "User1Scheme", scheme: r.default }, shouldUpdate: true })
          });
        });
      } else {
        HTTPClient.get('user-simple.json').then(e => {
          LoadModularScheme(
            'Admin'
          ).then(r => {
            this.setState({ user: e.data, modularScheme: { prefix: "User2Scheme", scheme: r.default }, shouldUpdate: true })
          });
        });
      }
    } else {
      LoadModularScheme(
        'Default'
      ).then(r => {
        this.setState({ user: null, modularScheme: { prefix: "APPSCHEME", scheme: r.default }, shouldUpdate: true })
      });

    }

  }

  componentDidUpdate() {
  }

  // TODO: add correct module loading !!!!
  render() {
    // console.log('[AppSwitcherProvider] render', this.state.user?.uID);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {
          this.state.shouldUpdate
            ? <SessionContextProvider user={this.state.user} modularScheme={this.state.modularScheme}>
                {this.props.children}
            </SessionContextProvider>
            : null
        }

      </div>
    );
  }
}
