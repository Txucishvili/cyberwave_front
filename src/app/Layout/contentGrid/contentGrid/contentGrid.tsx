import React, { Component } from 'react';
import './contentGrid.scss';

export class GridContainer extends Component<any> {
  constructor(props: any) {
    super(props);
    //     console.log('props', props);
  }
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

export class GridRow extends Component<any> {
  constructor(props: any) {
    super(props);
    //     console.log('props', props);
  }
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    )
  }
}

export default class ContentGrid extends Component<any> {
  constructor(props: any) {
    super(props);
    //     console.log('props', props);
  }
  render() {
    return (
      <div className="content--grid content--grid--wrap">
        <div className="content-main content-main--wrap">
          <div className="content-main--content">
            {this.props.children}
          </div>
        </div>
        {this.props.contentSide}
      </div>
    )
  }
}