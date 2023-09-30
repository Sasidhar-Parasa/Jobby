import './index.css'
import {Link} from 'react-router-dom'
import {AiTwotoneStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {HiShoppingBag} from 'react-icons/hi'

const JobsCard = props => {
  const {jobData} = props
  //    console.log(jobData)
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData
  return (
    <Link to={`jobs/${id}`} className="eachJob-link-option">
      <li className="jobList">
        <div className="jobList-section1">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="description-title">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
