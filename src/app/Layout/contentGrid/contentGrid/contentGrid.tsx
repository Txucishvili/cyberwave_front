import React, { Component } from 'react';
import './contentGrid.scss';
import ContentSide from 'app/Layout/ContentSide/contentSide';

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

  // shouldComponentUpdate() {

  //   return false;
  // }

  render() {
    //     console.log('[ContentGrid]');
    return (
      <div className="content--grid content--grid--wrap">
        <div className="content-main content-main--wrap">
          <div className="content-main--content">
            {this.props.children}
          </div>
        </div>
        
        {!!this.props.contentSide
          ? <ContentSide from="ContentGrid">
            {this.props.contentSide}
          </ContentSide>
          : null}

      </div>
    )
  }
}