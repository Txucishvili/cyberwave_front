import BlockEl from 'app/components/utils/BlockEl';
import SvgIcon from 'app/components/utils/IconPacks';
import React, { Component } from 'react';
import './contentSide.scss';
import SectionTitle from 'app/components/sectionTitle/sectionTitle';
import Button from 'app/components/Shared/Button/Button';

export default class ContentSide extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isHidden: false
    }
  }

  render() {
    const movableAreaStyle = {};
    // if (this.state.isHidden) {
    //   Object.assign(movableAreaStyle, {
    //     transition: 'all .125s ease',
    //     transform: `translateX(${370}px)`,
    //     marginLeft: `${-370}px`,
    //     opacity: 0
    //   })
    // } else {
    //   Object.assign(movableAreaStyle, {
    //     transition: 'all .125s ease',
    //     transform: `translateX(${0}px)`,
    //     marginLeft: `${0}px`,
    //     opacity: 1
    //   })
    // }
    return (
      <div className="content-side"
        style={movableAreaStyle}
      >
        <div className="container">

          <SectionTitle>
            <div className="title">დავალებები</div>
            <div className="side-toggler toRight">
              <Button classnames={'btn--none'}
                onClick={() => {
                  this.setState({ isHidden: !this.state.isHidden })
                }}
              >
                <SvgIcon pack='shared' name='sideToggle' />
              </Button>
            </div>
          </SectionTitle>

          <div className="ct-side--inside"
          // hidden={this.state.isHidden}
          >
            {/* <Scrollbar
          style={{ width: '100%', height: 900 }}> */}
            {Array(15).fill(null).map((e, i) => {
              return <BlockEl key={i} height="100px" />
            })}
            {/* </Scrollbar> */}
          </div>
        </div>
      </div>
    )
  }
}