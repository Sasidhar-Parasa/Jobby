import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="home-small-container">
      <h1 className="sm-home-heading">Find The Job That Fits Your Life</h1>
      <p className="sm-home-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="findJobsBtn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
