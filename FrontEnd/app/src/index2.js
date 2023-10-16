import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import UserProfile from './components/UserProfile';
import CompanyDashboard from './components/CompanyDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/company-dashboard" component={CompanyDashboard} />
          <Route path="/employee-dashboard" component={EmployeeDashboard} />
          <Route exact path="/" component={LoginRegister} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
