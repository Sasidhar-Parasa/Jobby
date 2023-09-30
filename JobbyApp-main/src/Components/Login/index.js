import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMessage: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg =>
    this.setState({errorMessage: errMsg, showSubmitError: true})

  SubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const loginDetails = {username: usernameInput, password: passwordInput}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    //  console.log(data)
    //  console.log(response)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      //    response.status(data.status_code)
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginForm = () => {
    const {
      usernameInput,
      passwordInput,
      showSubmitError,
      errorMessage,
    } = this.state
    return (
      <form className="userLogin-form-container" onSubmit={this.SubmitForm}>
        <label htmlFor="username" className="labels">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="userInput"
          placeholder="Username"
          value={usernameInput}
          onChange={this.onChangeUsername}
        />
        <label htmlFor="password" className="labels">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="userInput"
          placeholder="Password"
          value={passwordInput}
          onChange={this.onChangePassword}
        />
        <button type="submit" className="submitButton">
          Login
        </button>
        {showSubmitError && <p className="errorMessage">*{errorMessage}</p>}
      </form>
    )
  }

  render() {
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          {this.renderLoginForm()}
        </div>
      </div>
    )
  }
}

export default Login
