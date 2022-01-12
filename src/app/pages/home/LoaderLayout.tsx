import { ContentCol } from '@Layout/contentGrid/contentCol/contentCol';
import ContentGrid, { GridContainer, GridRow } from '@Layout/contentGrid/contentGrid/contentGrid';
import LoaderBox from '@utils/LoaderBox';
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
<GridContainer>
        <GridRow>
          <ContentCol className="col-sm side-a">

            {
              Array(5).fill(null).map((e, i) => {
                return <LoaderBox key={i}
                  styles={{
                    width: '100%',
                    height: i == 0 ? "176px" : "45px",
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
  </React.Fragment>
}

export default NewsFeedLoader;