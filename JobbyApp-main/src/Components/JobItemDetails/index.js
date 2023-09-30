import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiTwotoneStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {HiShoppingBag, HiExternalLink} from 'react-icons/hi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
  }

  componentDidMount() {
    this.jobItemApiRequest()
  }

  onClickRetry = () => this.jobItemApiRequest()

  jobItemApiRequest = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    //  console.log(response)
    if (response.ok) {
      const data = await response.json()
      //    console.log(data)
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: data.job_details.life_at_company,
        skills: data.job_details.skills,
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }
      //        console.log(updatedData)
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onApiSuccess = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
      packagePerAnnum,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobDetails
    console.log(similarJobs)
    return (
      <>
        <div className="mainJobDetailsContainer">
          <div className="jobList-section1">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="companyLogo"
            />
            <div className="ratingContainer">
              <h1 className="jobTitle">{title}</h1>
              <div className="jobRating">
                <AiTwotoneStar className="star-logo" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobList-section2">
            <div className="location-role">
              <ImLocation className="logo" />
              <p className="logo-caption">{location}</p>
              <HiShoppingBag className="logo" />
              <p className="logo-caption">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="jobCard-hr-line" />
          <div className="description-container">
            <h1 className="description-title">Description</h1>
            <a href={companyWebsiteUrl} target="/about" className="anchorEl">
              Visit <HiExternalLink className="externalLink" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="mainJobDetails-title">Skills</h1>
          <ul className="skillsContainer">
            {skills.map(eachItem => (
              <li className="eachSkill" key={eachItem.name}>
                <img
                  src={eachItem.image_url}
                  alt={eachItem.name}
                  className="skillImage"
                />
                <p className="skillName">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="mainJobDetails-title">Life at Company</h1>
          <div className="lifeAtCompany-container">
            <p className="description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <h1 className="similarJobs-title">Similar Jobs</h1>
        <ul className="similarJobs-unorderedList">
          {similarJobs.map(eachItem => (
            <SimilarJobs similarJobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  onApiFailure = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureView"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-subTitle">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retryButton" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
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
    return (
      <div>
        <Header />
        <div className="JobItemContainer">{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}
export default JobItemDetails
