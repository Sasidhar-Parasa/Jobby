import './index.css'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {HiOutlineHome, HiShoppingBag, HiOutlineLogout} from 'react-icons/hi'

const Header = props => {
  const onClickLogOutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navbar">
      <ul className="navbar-options-container">
        <li>
          <Link to="/" className="link-option">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="navbar-logo"
            />
          </Link>
        </li>

        <li className="home-jobs-container">
          <Link to="/" className="link-option">
            <HiOutlineHome className="navbar-sm-react-icons" />
            <h1 className="nav-options">Home</h1>
          </Link>
          <Link to="/jobs" className="link-option">
            <HiShoppingBag className="navbar-sm-react-icons" />
            <h1 className="nav-options">Jobs</h1>
          </Link>
        </li>

        <li>
          <HiOutlineLogout
            className="navbar-sm-react-icons"
            onClick={onClickLogOutBtn}
          />
          <button
            type="button"
            className="logout-btn"
            onClick={onClickLogOutBtn}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
