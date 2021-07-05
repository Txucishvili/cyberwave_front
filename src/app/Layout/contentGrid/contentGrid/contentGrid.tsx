import React, {Component} from 'react';
import './contentGrid.scss';


export default class ContentGrid extends Component<any> {
  constructor(props: any) {
    super(props);
    console.log('props', props);
  }
  render() {    
    return (
      <div className="content--grid content--grid--wrap">
      <div className="content-main content-main--wrap">
        <div className="content-main--content">
          <div className="container">
            <div className="row">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
      {this.props.contentSide}
    </div>
    )
  }
}