import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/context/ThemeContext';
// import {partition, defaults} from 'lodash';

// console.log('a', partition([1, 2, 3, 4], n => n % 2));
// console.log('b', defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
// console.log('lodash', _);

const UserPage = (props: any, data?: any) => {
    const [loading, setLoad] = useState(true);
    const [theme, setTheme]: any= useContext(ThemeContext);

    return (<React.Fragment>
        <div className="content--grid content--grid--wrap">
        <div className="content-main content-main--wrap">
          <div className="content-main--content">
          <div className="container">
            <div className="row">
              <div className="colEl col-sm side-a">
                <div className="el">a</div>
              </div>
              <div className="colEl col-xl side-b">
                <div className="el">a</div>
              </div>
              <div className="colEl col-sm side-c">
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
    </React.Fragment>)
}

export default UserPage;
