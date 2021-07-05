import React, { Component } from 'react';
import './contentColXL.scss';
export default class ContentColXL extends Component {
  render() {
    return (
      <div className="col-xl side-b">
        {this.props.children}
      </div>
    )
  }
}