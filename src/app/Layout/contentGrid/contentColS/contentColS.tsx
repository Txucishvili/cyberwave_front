import React, {Component} from 'react';
import './contentColS.scss'
export default class ContentColS extends Component<any> {

  classNames: any = ['col-sm', 'side-' + this.props.side].join(' ');

  render() {    
    return (
      <div className={this.classNames} id={this.props.id}>
        {this.props.children}
    </div>
    )
  }
}