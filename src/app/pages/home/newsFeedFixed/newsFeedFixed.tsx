import BlockEl from '@components/utils/BlockEl';
import SvgIcon from '@components/utils/IconPacks';
import React, { Component, Fragment, useEffect, useState } from 'react';
import SectionTitle from '@components/sectionTitle/sectionTitle';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import HTTPClient from '@API/axios';
import LoaderBox from '@utils/LoaderBox';
import { toggleFixedBar, useLayoutContext } from '@store/context/LayoutContext';
import { useResizeContext } from '@store/context/WindowResize';
import { useAppSelector } from '@store/redux';
import { pushJobs } from '@store/redux/Slices/userJobs.store';
import { useDispatch } from 'react-redux';

const NewsFeedToggler = (props: any) => {
  const [, setLayoutState]: any = useLayoutContext();

  // console.log('------- toggler');

  return (
    <div className="side-toggler--wrapper">
      <button
        style={{
          background: 'transparent'
        }}
        className={'btn btn--none'}
        onClick={() => {
          setLayoutState(toggleFixedBar());
          // if (!layoutState.isHidden) {
          //   // window.localStorage.setItem('earnFixBar', layoutState.fixedSide);
          // }
        }}
      >
        <SvgIcon pack='shared' name='sideToggle' />
      </button>
    </div>
  )
}

const NewsFeedFixed = (props: any) => {
  const [jobList, setJobs]: any[] = useState([]);
  // const [wSize, setWindowSize] = useResizeContext();
  const userJobs = useAppSelector(state => state.userJobs.list);
  const dispatch = useDispatch();

  // console.log('[NewsFeedFixed]');

  useEffect(() => {
    getUserWorks();
    // console.log('[ContentSide] ----------');
  }, []);

  const getUserWorks = (props?: any) => {
    // console.log('---get---', HTTPClient.get('user-jobs.json'));
    HTTPClient.get('user-jobs.json')
      .then((resp: any) => {
        // console.log('resp', resp.data);
        // const a = [];

        // for (let index = 0; index < 5; index++) {
        //   a.push(...resp.data)
        // }

        // console.log('a', a);
        dispatch(pushJobs(resp.data));

      });
  }

  console.log('userJobs', userJobs);

  let ListView;

  if (!userJobs.length) {
    ListView = (<div>
      {
        Array(2).fill(null).map((e, i) => {
          return <LoaderBox key={i}
            styles={{
              width: '100%',
              height: "100px",
              marginBottom: '20px',
              borderRadius: 8
            }}
          />
        })
      }
    </div>);
  } else {
    ListView = <Scrollbar
      style={{
        width: '100%',
        height: 'calc(100%)',
      }}
    >
      <div className="container">

        <SectionTitle pds>
          <div className="title">დავალებები</div>
          <div className="side-toggler toRight">
          </div>
        </SectionTitle>

        <div className="ct-side--inside"
        // hidden={isHidden}
        >

          {userJobs.map((e: any, i: any) => {
            return <BlockEl key={i} height="100px" />
          })}
        </div>

      </div>
    </Scrollbar>
  }



  return (
    <Fragment>

      <div className="side-toggler">
        <NewsFeedToggler />
      </div>

      <div className="content-inside">
        <div className="content-inside--wrapper _rsp"
          style={{}}
        >
          {ListView}
        </div>
      </div>

    </Fragment>
  )
}

export default NewsFeedFixed;