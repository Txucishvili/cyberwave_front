import BlockEl from 'app/components/utils/BlockEl';
import SvgIcon from 'app/components/utils/IconPacks';
import React, { Component, useEffect, useState } from 'react';
import SectionTitle from 'app/components/sectionTitle/sectionTitle';
import Button from 'app/components/Shared/Button/Button';
import { useResizeContext, ResizeContext } from 'app/store/context/WindowResize';
import Scrollbar, { ScrollbarContext } from 'react-scrollbars-custom';
import HTTPClient from 'API/axios';
import LoaderBox from 'app/utils/LoaderBox';
import ContentSide from 'app/Layout/ContentSide/contentSide';

const NewsFeedFixed = (props: any) => {
  const [jobList, setJobs]: any[] = useState([]);
  const [isHidden, setHidden]: any = useState(null);
  const [isOpen, setOpen]: any = useState(null);
  const [isLocked, setLocked]: any = useState(false);
  const [wSize, setWindowSize] = useResizeContext();

  // console.log('[ContentSide]');

  useEffect(() => {
    getUserWorks('data');
    console.log('[ContentSide] ----------');
  }, []);

  //#region effect
  // useEffect(() => {
  //   const wSize = {
  //     innerWidth: window.innerWidth
  //   }
  //   if (wSize.innerWidth <= 1802) {
  //     setHidden(true);
  //   } else {
  //     setHidden(false);
  //   }
  //   // Listen for the event.
  //   window.addEventListener('resize', function (e: any) {
  //     console.log('BUILD EVENT', window.innerWidth);

  //     if (window.innerWidth <= 1802) {
  //       setHidden(true);
  //     } else {
  //       setHidden(false);

  //     }
  //   }, false);

  // }, []);

  //#endregion

  useEffect(() => {
    if (wSize.innerWidth <= 1802) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [wSize]);

  useEffect(() => {
    const localValue = window.localStorage.getItem('earnFixBar');
    if (isHidden !== null) {

      if (isHidden) {
        setOpen(false);
      } else {

        if (localValue == null) {

          setLocalStorage(true)
          setOpen(true);
          return;
        } else {
          const value = localValue === 'true' ? true : false;
          setOpen(value);
        }
      }
    }

  }, [isHidden]);

  const setLocalStorage = (value: boolean | any) => {
    console.log('------ [setStorage] ------');

    window.localStorage.setItem('earnFixBar', value);
  }

  const getUserWorks = (props?: any) => {
    // console.log('---get---', HTTPClient.get('user-jobs.json'));
    HTTPClient.get('user-jobs.json')
      .then(resp => {
        console.log('resp', resp.data);
        setJobs(resp.data);
      });
  }

  return (

    <ContentSide className={[
      isHidden ? 'hidden' : 'showed',
      isOpen ? 'opened' : null].join(' ')
    }
    >
      <div className="side-toggler">
        <div className="side-toggler--wrapper">
          <button
            style={{
              background: 'transparent'
            }}
            className={'btn btn--none'}
            onClick={() => {
              if (!isHidden) {
                setOpen(!isOpen);
                setLocalStorage(!isOpen);
              } else {
                setOpen(!isOpen);
              }
              if (!isLocked) {
                setLocked(true);
              }
            }}
          >
            <SvgIcon pack='shared' name='sideToggle' />
          </button>
        </div>
      </div>

      <div className="content-inside">
        <div className="content-inside--wrapper _rsp"
          style={{}}
        >
          <Scrollbar
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
                {/* <Scrollbar
          style={{ width: '100%', height: 900 }}> */}
                {
                  jobList.length
                    ? jobList.map((e: any, i: any) => {
                      return <BlockEl key={i} height="100px" />
                    })
                    : Array(2).fill(null).map((e, i) => {
                      return <LoaderBox key={i}
                        styles={{
                          width: '100%',
                          height: "100px",
                          marginBottom: '20px',
                          borderRadius: 8
                        }}
                      />
                    })}
                {/* </Scrollbar> */}
              </div>

            </div>
          </Scrollbar>
        </div>
      </div>

    </ContentSide>
  )
}

export default NewsFeedFixed;