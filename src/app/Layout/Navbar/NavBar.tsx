import HTTPClient from 'API/axios';
import { LayoutContext } from 'app/store/context/LayoutContext';
import { ThemeContext } from 'app/store/context/ThemeContext';
import LoaderBox from 'app/utils/LoaderBox';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, withRouter } from 'react-router-dom';
import { ScrollbarContext } from 'react-scrollbars-custom';
import SvgIcon from '../../components/utils/IconPacks';
import './NavBar.scss';


const navLists = [
  {
    title: 'News Feed',
    path: '/',
    icon: 'controller'
  },
  {
    title: 'Championship',
    path: '/list',
    icon: 'award'
  },
  {
    title: 'Stream',
    path: '/user',
    icon: 'video'
  },
  {
    title: 'Leader Boards',
    path: '/board',
    icon: 'battleBoard'
  },
  {
    title: 'Battle Field',
    path: '/battle',
    icon: 'battleShip'
  }
];

interface NavListItem {
  title: string,
  path: string,
  icon: string
}

const NavBar = (props: any) => {
  const [theme, setTheme]: any = useContext(ThemeContext);
  const [navMode, setMode]: [boolean, any] = useState(false);
  const scrollbarContext = useContext(ScrollbarContext);
  const [layoutParams, dispatchLayout] = useContext(LayoutContext);
  const [navList, setNavList]: [NavListItem[], any] = useState([]);

  useEffect(() => {
    HTTPClient.get('navigation.json').then(r => {
      setNavList(r.data);
    })
  }, [])

  function toggleSideNav() {
    dispatchLayout({
      navOpened: !layoutParams.navOpened
    })
  }

  function navClick(e: any) {
    if (layoutParams.navOpened) {
      dispatchLayout({
        navOpened: false
      })
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // console.log('useParams', scrollbarContext.parentScrollbar.eventEmitter._handlers);
    if (e.path === props.history.location.pathname) {
      scrollbarContext.parentScrollbar?.scrollToTop();
    }
  }

  return (
    <div className={'sideNav nav--wrap ' + (layoutParams.navOpened ? 'opened' : '')}>
      <div className="nav--toggler">
        <button className="btn btn--none toggler"
          onClick={toggleSideNav}
        >
          <SvgIcon pack='nav' name='burger' />
        </button>
      </div>

      {
//     console.log('[---- NAVBAR]')
  }
  
      <div className="nav--area">
        <ul className={'nav--list ' + theme.activeKey}>
          {navList.length ? navList.map((e, key) => {
            return <li key={key}>
              <NavLink to={e.path}
                exact
                className="breadcrumb-item"
                activeClassName="active"
                onClick={ev => navClick(e)}
              >
                <div className="icon-area">
                  <SvgIcon pack='nav' name={e.icon} />
                </div>
                <div className="titler">{e.title}</div>
              </NavLink>
            </li>
          }) : Array(5).fill(null).map((e, k) => {
            return <li className="loader" key={k}>
              <LoaderBox styles={{ borderRadius: 100 }} />
            </li>
          })}

        </ul>
      </div>
      <div className="nav--info">
        <div className="nav--info--wrap">
          <button className="btn btn--simple btn--circled">
            <SvgIcon pack='nav' name='strongMark' />
          </button>
          <button className="btn btn--simple btn--circled">
            <SvgIcon pack='nav' name='flag' />
          </button>
        </div>
      </div>
    </div>
  )
}


export default withRouter(NavBar);