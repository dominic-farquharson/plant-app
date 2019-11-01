import React, { useState } from 'react'
import cx from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/user'
import logo from './logo.png'
import './Nav.scss'

const Desktop = ({
  isLoggedIn,
  isUserFetchComplete,
  dispatch,
  history
}) => (
  <ul className="nav-bar__desktop">
    <li>
      <span className="nav-section-heading">About</span>
      <ul className="dropdown">
        <li>Our team</li>
        <li>Contact</li>
        <li>Water Us</li>
      </ul>
    </li>
    <li>
      <span className="nav-section-heading">Buy us plants</span>
    </li>
    {isUserFetchComplete && !isLoggedIn && (
      <li>
        <Link to="/login">
          <span className="nav-section-heading">Login</span>
        </Link>
      </li>
    )}
    {isUserFetchComplete && isLoggedIn && (
      <li>
        <span onClick={() => {
          dispatch(logout())
          history.push('/')
        }} className="nav-section-heading">Logout</span>
      </li>
    )}
  </ul>
)

const Mobile = ({
  isLoggedIn,
  isUserFetchComplete,
  dispatch,
  history
}) => {
  const [displayNav, setDisplayNav] = useState(false)
  const toggleNav = () => setDisplayNav(!displayNav)

  return (
    <section className="nav-bar__mobile-dropdown">
      <i className="fa fa-bars fa-2x" onClick={toggleNav} ></i>
      <ul className={cx("container", {
        'container--show': displayNav
      })}>
        <i className="fa fa-times fa-2x" onClick={toggleNav}></i>
          <ul className="dropdown">
            <li onClick={toggleNav}>
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/plants/new">
                <span>Create a Plant</span>
              </Link>
            </li>
            <li onClick={toggleNav}>About</li>
            <li onClick={toggleNav}>Our team</li>
            <li onClick={toggleNav}>Contact</li>
            <li onClick={toggleNav}>Water Us</li>
            <li onClick={toggleNav}>Buy us plants</li>
            {isUserFetchComplete && !isLoggedIn && (
              <li onClick={toggleNav}>
                <Link to="/register">
                  <span>Register</span>
                </Link>
              </li>
            )}
            {isUserFetchComplete && !isLoggedIn && (
              <li onClick={toggleNav}>
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </li>
            )}
          {isUserFetchComplete && isLoggedIn && (
            <li>
              <span onClick={() => {
                dispatch(logout())
                history.push('/')
              }} className="nav-section-heading">Logout</span>
            </li>
          )}
        </ul>
      </ul>
    </section>
  )
}

const Nav = ({
  isLoggedIn,
  isUserFetchComplete,
  dispatch,
  history
}) => (
  <nav className="nav-bar">
    <section>
      <Link to="/"><img src={logo} aria-label="Return to home page" /></Link>
    </section>
    <h1>Big Plant</h1>
    <Mobile dispatch={dispatch}  history={history} isLoggedIn={isLoggedIn} isUserFetchComplete={isUserFetchComplete} />
    <Desktop  dispatch={dispatch} history={history} isLoggedIn={isLoggedIn} isUserFetchComplete={isUserFetchComplete} />
  </nav>
)

const mapStateToProps = ({
  user: {
    profile,
    isUserFetchComplete,
  }
}) => ({ isLoggedIn: !!profile, isUserFetchComplete })

export default withRouter(connect(mapStateToProps)(Nav))
