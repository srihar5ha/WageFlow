import React from 'react';
import { useAuth } from '../context/AuthContext.js';

import CompanyDashboard from './CompanyDashboard.js';
import EmployeeDashboard from './EmployeeDashboard.js';

function LoginRegister() {
  const {
    eoa,
    userType,
    userInfo,
   
    address,
    loading,
    handleLogin,
    handleLogout,
  } = useAuth();



  return (
    <div>
  {loading ? (
    <p>Loading...</p>
  ) : eoa && address ? (
    <div>
     
       { userType === 'company' ? (
          <CompanyDashboard  />
        ) : (
          <EmployeeDashboard />
        )
        }
      <button onClick={handleLogout}>Log Out</button> {/* Logout button */}
    </div>
  ) : (
    <div>
      <p>Login or Register:</p>
      <button onClick={() => handleLogin('company')}>Company</button>
      <button onClick={() => handleLogin('employee')}>Employee</button>
    </div>
  )}
</div>

   
  );
 
}

export default LoginRegister;
