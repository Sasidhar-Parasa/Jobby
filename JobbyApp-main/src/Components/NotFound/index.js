import './index.css'

const NotFound = () => (
  <div className="notFound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFound-Image"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFound-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
