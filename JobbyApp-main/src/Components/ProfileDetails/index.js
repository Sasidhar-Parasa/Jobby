import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProfileDetails extends Component {
  state = {
    name: '',
    image: '',
    bio: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.apiRequest()
  }

  onClickRetry = () => this.apiRequest()

  apiRequest = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const userDetails = {
        name: data.profile_details.name,
        image: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        name: userDetails.name,
        image: userDetails.image,
        bio: userDetails.bio,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onApiSuccess = () => {
    const {name, image, bio} = this.state
    return (
      <div className="lg-profile-container">
        <img className="profileImage" src={image} alt="profile" />
        <h1 className="profileName">{name}</h1>
        <p className="jobRole">{bio}</p>
      </div>
    )
  }

  onApiFailure = () => (
    <button type="button" className="retryButton" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onApiSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.onApiFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileDetails()
  }
}

export default ProfileDetails
