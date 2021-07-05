import React, { Component } from 'react';
import './sectionTitle.scss';


export default class SectionTitle extends Component {
  render() {
    return (
      <div className="section-title flx flxAC">
        {this.props.children}
      </div>
    )
  }
}