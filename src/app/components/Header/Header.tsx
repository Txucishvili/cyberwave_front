import React from 'react';
import './Header.scss';
import SearchBar from './SearchBar/SearchBar';

import {ReactComponent as Logo} from '../../../assets/Cyberpunk_2077_logo.svg';

const Header = (props: any) => {
  return (
    <div className="header header--wrapper">
      <div className="content--grid content--grid--wrap">
        <div className="content-main content-main--wrap">
          <div className="content-main--content">
            <div className="container">
              <div className="row">
                <div className="colEl col-sm side-a">
                  <div className="el">
                    <div className="logo--area fAll" style={{maxWidth: 280}}>

                      <Logo style={{width: '100%', height: '100%'}} />

                    </div>
                  </div>
                </div>
                <div className="colEl col-xl side-b">
                  <SearchBar />
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
    </div>
  )
}

export default Header;