import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobsCard from '../JobsCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobDetails: [],
    apiStatus: apiStatusConstants.initial,
    minimumPackage: '',
    employmentType: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getApiJobDetails()
  }

  onChangeCheckBoxInputs = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getApiJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(
            type => type !== event.target.id,
          ),
        }),
        this.getApiJobDetails,
      )
    }
  }

  onClickSalaryRange = event => {
    this.setState(
      {minimumPackage: parseInt(event.target.id)},
      this.getApiJobDetails,
    )
  }

  onClickSearchIcon = () => {
    this.getApiJobDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => this.getApiJobDetails()

  getApiJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {minimumPackage, searchInput, employmentType} = this.state
    console.log(employmentType)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTypesOfEmployment = () => (
    <>
      <h1 className="filtersHeading">Type of Employment</h1>
      <ul className="unorderedList">
        {employmentTypesList.map(eachType => (
          <li className="list" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              onChange={this.onChangeCheckBoxInputs}
            />
            <label className="labelNames" htmlFor={eachType.employmentTypeId}>
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  renderSalaryRangesList = () => (
    <>
      <h1 className="filtersHeading">Salary Range</h1>
      <ul className="unorderedList">
        {salaryRangesList.map(eachItem => (
          <li className="list" key={eachItem.salaryRangeId}>
            <input
              name="salary"
              type="radio"
              id={eachItem.salaryRangeId}
              onClick={this.onClickSalaryRange}
            />
            <label className="labelNames" htmlFor={eachItem.salaryRangeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

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

  onApiSuccess = () => {
    const {jobDetails} = this.state
    return jobDetails.length > 0 ? (
      <ul className="unorderedList">
        {jobDetails.map(eachJob => (
          <JobsCard jobData={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure-title">No Jobs Found</h1>
        <p className="failure-subTitle">
          We could not find any jobs. Try other filters
        </p>
      </>
    )
  }

  renderJobDetails = () => {
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

  renderSearchBar = () => (
    <div className="search-Container">
      <input
        type="search"
        className="searchBar"
        placeholder="Search"
        onChange={this.onChangeSearchInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="searchButton"
        onClick={this.onClickSearchIcon}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderSection1 = () => (
    <div className="section1">
      <div className="profile-container">
        <ProfileDetails />
      </div>
      <hr className="hr-line" />
      {this.renderTypesOfEmployment()}
      <hr className="hr-line" />
      {this.renderSalaryRangesList()}
    </div>
  )

  render() {
    return (
      <div>
        <Header />
        <div className="lg-jobs-container">
          <div className="sm-search-container">{this.renderSearchBar()}</div>
          {this.renderSection1()}
          <div className="section2">
            <div className="lg-search-container">{this.renderSearchBar()}</div>
            {this.renderJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
