import BlockEl from 'app/components/utils/BlockEl';
import React, { useContext, useEffect } from 'react';
import Scrollbar from 'react-scrollbars-custom';
// import defaults from 'lodash/defaults';
import { ThemeContext } from '../../store/context/ThemeContext';
import { useSessionContext } from '../../store/context/UserSession.context';

const ListPage = (props: any) => {
    const myData = Array(55).fill(null).map((e, i) => {
        return <BlockEl key={i} height="35px" />
    });
//     console.log('myData', myData);
    return <div>
        <div className="content--grid content--grid--wrap">
            <div className="content-main content-main--wrap">
                <div className="content-main--content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm side-a">
                                <div className="el">
                                    <Scrollbar
                                        disableTracksWidthCompensation={true}

                                        style={{ width: '100%', height: 300 }}
                                    >
                                        <div className="stiky"
                                            style={{
                                                position: 'sticky',
                                                top: 0
                                            }}>
                                            header
                                        </div>
                                        {myData}
                                    </Scrollbar>
                                </div>
                            </div>
                            <div className="col-xl side-b">
                                <div className="child">
                                    Listt
                                </div>
                            </div>
                            <div className="col-sm side-c">
                                <div className="el">a</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-side">
                <div className="container">
                    <div className="row">
                        <div className="colOut">
                            col
            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ListPage;