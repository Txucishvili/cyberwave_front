import SectionTitle from 'app/components/sectionTitle/sectionTitle';
import StickyScroll from 'app/components/stickyScroll/stickyScroll';
import BlockEl from 'app/components/utils/BlockEl';
import { ContentCol } from 'app/Layout/contentGrid/contentCol/contentCol';
import { GridContainer, GridRow } from 'app/Layout/contentGrid/contentGrid/contentGrid';
import { ResizeContext, useResizeContext } from 'app/store/context/WindowResize';
import React, { Component, useEffect, useState } from 'react';
import NewsFeedSticky from '../newsFeedSticky/newsFeedSticky';
import './newsFeed.scss';
import { NewsFeedContent } from './newsFeedContent';

const NewsFeedSide_A = (props: any) => {

  return (
    <ContentCol small className={'col-sm side-a'} id="sideAcontent" >
      <ResizeContext.Consumer>
        {val => {
          const [windowSize, setWindowSize] = val;
          return (
            windowSize.innerWidth <= 1430 ?
              <NewsFeedSticky />
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

  let ColSide: any = null;

  useEffect(() => {
    if (windowSize.offsetWidth <= 1430) {
      showSideA(true);
    } else {
      showSideA(false);
    }
  }, [])


  useEffect(() => {
    if (windowSize.innerWidth <= 1430) {
      showSideA(true);
    } else {
      showSideA(false);
    }
  }, [windowSize])

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
              return <BlockEl key={i} height="175px" style={{ marginBottom: 0 }} />
            })}
            <br />
          </div>
          <div className="sideInside">
            <SectionTitle>
              <div className="title">შოპი</div>
              <div className="side-toggler toRight">
              </div>
            </SectionTitle>
            {Array(1).fill(null).map((e, i) => {
              return <BlockEl key={i} height="175px" />
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
    console.log('HomePageContent --------');
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