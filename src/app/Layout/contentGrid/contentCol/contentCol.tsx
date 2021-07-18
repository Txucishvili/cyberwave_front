import React, { Component } from 'react';
import './contentCol.scss'

export class ContentCol extends Component<any, any> {

  colSize: any = '';
  classNames: any = [];

  constructor(props: any) {
    super(props);

    if (this.props.small) {
      this.colSize = 'sm'
    } else if (this.props.large) {
      this.colSize = 'xl'
    }
// console.log('this.props.className', this.props.className);
    this.classNames = [this.colSize ? 'col-' + this.colSize : ''].concat(this.props.className, this.classNames).join(' ')
  }

  componentDidMount() {
  }

  render() {
    const { small, large, children, className, ...targetProps } = this.props;
    return (
      <div
        className={this.classNames.length ? this.classNames : this.props.className}
        {...targetProps}>
        {this.props.children}
      </div>
    )
  }
}