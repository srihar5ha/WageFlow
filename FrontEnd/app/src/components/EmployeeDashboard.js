import React from 'react';

function EmployeeDashboard({eoa,userType,onLogout}) {
  // Employee-specific dashboard content
  
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>EOA:{eoa}</p>
      <p></p>
      <p>userType:{userType}</p>

     
      {/* Display transaction history and employee-related information */}
      
    </div>
  );
}

export default EmployeeDashboard;
