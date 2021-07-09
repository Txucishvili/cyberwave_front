import { ContentCol } from 'app/Layout/contentGrid/contentCol/contentCol';
import ContentGrid, { GridContainer, GridRow } from 'app/Layout/contentGrid/contentGrid/contentGrid';
import FixedContainer from 'app/Layout/ContentSide/contentSide';
import LoaderBox from 'app/utils/LoaderBox';
import React from 'react';

const NewsFeedLoader = (props: any) => {

  let classNames: any = [];

  if (window.innerWidth <= 1802) {
    classNames = ['hidden']
  } else {
    classNames = ['showed']
    if (window.localStorage.getItem('earnFixBar') && window.localStorage.getItem('earnFixBar') == 'true') {
      classNames = ['showed', 'opened']
    }
  }
  return <React.Fragment>
    <ContentGrid
      contentSide={
        <FixedContainer
          className={classNames}
        >
          {!classNames.includes('opened')
            ? Array(1).fill(null).map((e, i) => {
              return <LoaderBox key={i}
                styles={{
                  width: '40px',
                  height: "40px",
                  marginBottom: '20px',
                  borderRadius: 8
                }}
              />
            })
            : Array(5).fill(null).map((e, i) => {
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
        </FixedContainer>
      }
    >
      <GridContainer>
        <GridRow>
          <ContentCol className="col-sm side-a">

            {
              Array(5).fill(null).map((e, i) => {
                return <LoaderBox key={i}
                  styles={{
                    width: '100%',
                    height: i == 0 ? "176px" : "100px",
                    marginBottom: '20px',
                    borderRadius: 8
                  }}
                />
              })
            }
          </ContentCol>
          <ContentCol className="col-xl side-b">
            {
              Array(12).fill(null).map((e, i) => {
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
          </ContentCol>
          <ContentCol className="col-sm side-c">
            {
              Array(2).fill(null).map((e, i) => {
                return <LoaderBox key={i}
                  styles={{
                    width: '100%',
                    height: "100px",
                    marginBottom: '20px',
                    borderRadius: 8,
                  }}
                />
              })
            }
          </ContentCol>
        </GridRow>
      </GridContainer>
    </ContentGrid>
  </React.Fragment>
}

export default NewsFeedLoader;