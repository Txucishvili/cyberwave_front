import React, { Component } from 'react';
import './sectionTitle.scss';


export default class SectionTitle extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={['section-title flx flxAC'].concat(this.props.pds ? 'pds' : '').join(' ')}>
        {this.props.children}
      </div>
    )
  }
}