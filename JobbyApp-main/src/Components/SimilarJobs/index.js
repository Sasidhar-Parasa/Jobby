import './index.css'
import {AiTwotoneStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {HiShoppingBag} from 'react-icons/hi'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    employmentType,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
  } = similarJobDetails

  return (
    <li className="similarJobs">
      <div className="jobList-section1">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <div className="similarJobs-descriptionContainer">
        <h1 className="description-title">Description</h1>
        <p className="description">{jobDescription}</p>
        <div className="location-role">
          <ImLocation className="logo" />
          <p className="logo-caption">{location}</p>
          <HiShoppingBag className="logo" />
          <p className="logo-caption">{employmentType}</p>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
