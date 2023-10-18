import React from 'react';
import { useAuth } from '../context/AuthContext.js';

function EmployeeDashboard() {
  // Employee-specific dashboard content
  const { eoa, name, userType, address, userInfo, handleSomething } = useAuth();
  
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div>
      
     
      <p>EOA:{eoa}</p>
      <p>address: {address}</p>
      <p>userType:{userType}</p>
</div>
     
      {/* Display transaction history and employee-related information */}
      
    </div>
  );
}

export default EmployeeDashboard;
