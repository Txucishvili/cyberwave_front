import { LoginPrompt } from '@components/LoginRegister/LoginRegister';
import SectionTitle from '@components/sectionTitle/sectionTitle';
import Button from '@components/Shared/Button/Button';
import StickyScroll from '@components/stickyScroll/stickyScroll';
import BlockEl from '@components/utils/BlockEl';
import { ContentCol } from '@Layout/contentGrid/contentCol/contentCol';
import { GridContainer, GridRow } from '@Layout/contentGrid/contentGrid/contentGrid';
import { useSessionContext } from '@store/context/UserSession.context';
import { ResizeContext, useResizeContext } from '@store/context/WindowResize';
import React, { Component, useEffect, useState } from 'react';
import NewsFeedSticky from '../newsFeedSticky/newsFeedSticky';
import './newsFeed.scss';
import { NewsFeedContent } from './newsFeedContent';

const NewsFeedSide_A = (props: any) => {

  // console.log('NewsFeedSide_A', );
  const shrinkSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bp-layout-shrink-size-2').replace(' ', '').replace('px', ''))
  // console.log('HomePageContent --------');


  return (
    <ContentCol small className={'col-sm side-a'} id="sideAcontent" >
      <ResizeContext.Consumer>
        {val => {
          const [windowSize, setWindowSize] = val;
          // {console.log('NewsFeedSide_A', )}
          return (
            windowSize.innerWidth <= shrinkSize ?
              null
              : <StickyScroll>
                <NewsFeedSticky />
              </StickyScroll>
          )
        }}
      </ResizeContext.Consumer>
    </ContentCol>
  )
}

const NewsFeedSide_C = (props: any) => {
  const [windowSize, setResizeState]: any = useResizeContext();
  const [sideA, showSideA] = useState(false)
  const [shopListSize, setShop] = useState([1])
  const shrinkSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bp-layout-shrink-size-2').replace(' ', '').replace('px', ''))
  const [session, setSession]: any = useSessionContext();

  let ColSide: any = null;

  useEffect(() => {
    // console.log('windowSize', windowSize);
    if (windowSize.innerWidth <= shrinkSize) {
      showSideA(true);
    } else {
      showSideA(false);
    }
  }, [shrinkSize, windowSize])

  return (
    <ContentCol className={'col-sm side-c new'} id="sideBcontent">
      {sideA ? <StickyScroll>
        <NewsFeedSticky />
        <div className="sideInside">
          {Array(25).fill(null).map((e, i) => {
            return <BlockEl key={i} height="60px" />
          })}
          <br />
        </div>
      </StickyScroll> :
        <StickyScroll>
          <div className="sideInside">
            <SectionTitle>
              <div className="title">დუელები</div>
              <div className="side-toggler toRight">
              </div>
            </SectionTitle>
            {Array(1).fill(null).map((e, i) => {
              return <BlockEl key={i} height="175px" style={{ marginBottom: 0 }}>
                <LoginPrompt />

              </BlockEl>
            })}
            <br />
          </div>
          <div className="sideInside">
            <SectionTitle>
              <div className="title">შოპი</div>
              <div className="side-toggler toRight">
              </div>
            </SectionTitle>
            <div className="flx flxAC" style={{position: 'fixed', top: 333}}>
              <div>{shopListSize.length}</div>
              <div className={'_flx toRight'}>
            <Button onClick={() => {
                setShop(oldArray => [...oldArray, 1]);
              }}>Update</Button></div>
            </div>
            {shopListSize.map((e, i) => {
              return <BlockEl key={i} height="175px">
              </BlockEl>
            })}

            <br />
          </div>
        </StickyScroll>
      }


    </ContentCol>
  )
}

class HomePageContent extends Component<any, any> {

  constructor(props: any) {
    super(props);
    // console.log('HomePageContent --------');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <GridContainer>
        <GridRow>
          <NewsFeedSide_A />
          <ContentCol large>
            <NewsFeedContent {...this.props} />
          </ContentCol>
          <NewsFeedSide_C />
        </GridRow>
      </GridContainer>
    )
  }
}

export default HomePageContent;