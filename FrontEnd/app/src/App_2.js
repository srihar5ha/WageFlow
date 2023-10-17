

import React, { useState,useEffect } from 'react';
import LoginRegister from './components/LoginRegister.js';
import CompanyDashboard from './components/CompanyDashboard.js';
import EmployeeDashboard from './components/EmployeeDashboard.js';
// import { web3AuthModalPack } from './components/Authkit.js';

function App() {
    const [eoa,setEoa]=useState(null);
    const [provider,setProvider]=useState(null);
    const [address,setAddress]=useState(null);
    const [userInfo,setUserinfo]=useState(null);
    const [safes,setSafes]=useState('');
    const[signer,setSigner]=useState(null);
    const [userType,setUserType]=useState(null);
   


  const handleUserLogin = (userData) => {
    // Set the user data, including eoa, v1, v2, v3, and v4, in the state
    setEoa(userData.eoa);
    setUserType(userData.userType);
    setProvider(userData.provider);
    setAddress(userData.address);
    setSigner(userData.signer);
    setUserinfo(userData.userInfo);
  
  };

  const handleUserLogout = () => {
       setEoa(null);
  };

  useEffect(() => {
    // Use a useEffect hook to set v1, v2, v3, and v4 to null when eoa is null
    if (eoa === null) {
        setUserType(null);
        setProvider(null);
        setAddress(null);
        setSigner(null);
        setUserinfo(null);
    }
  }, [eoa]);

  return (
    <div>
    {eoa ? (
      // User is logged in, display user information and dashboard
      <div>
        {userType === 'company' ? (
          <CompanyDashboard
            eoa={eoa}
            address={address}
            userType={userType}
          />
        ) : (
          <EmployeeDashboard
            eoa={eoa}
            address={address}
            userType={userType}
          />
        )}
       
      </div>
    ) : (
      // User is not logged in, display the login/registration component
      <LoginRegister onUserLogin={handleUserLogin} onUserLogout={handleUserLogout} />
    )}
  </div>
  
  );
}

export default App;