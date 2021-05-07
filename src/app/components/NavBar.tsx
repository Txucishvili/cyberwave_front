import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../store/context/ThemeContext';

const NavBar = () => {
    const [theme, setTheme]: any= useContext(ThemeContext);

    return( 
        <ol className={theme.activeKey.classPrefix}>
        <li><NavLink to="/" className="breadcrumb-item" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/list" className="breadcrumb-item" activeClassName="active">Lists</NavLink></li>
        <li><NavLink to="/user" className="breadcrumb-item" activeClassName="active">user</NavLink></li>
      </ol>
      )
}


export default NavBar;