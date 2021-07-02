import SvgIcon from "app/components/utils/IconPacks";
import React from "react";

import './SearchBar.scss';

class SearchBar extends React.Component {

  render() {
    return <React.Fragment>
      <div className="searchBar searchBar--wrapper fAll">
        <div className="search-form">
          <div className="input-area flx flxAC">
            <div className="inp-icon">
              <SvgIcon pack='nav' name='search' />
            </div>
            <input type="text" placeholder='მოძებნე პოსტები, ტურნირები, მოთამაშეები...' />
          </div>
          <div className="btn-area fAll">
            <button className="btn btn--simple btn--bordered _blue">
              ძებნა
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

export default SearchBar