import './App.css'

import {Redirect, Switch, Route} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import JobItemDetails from './Components/JobItemDetails'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
