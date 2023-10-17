import React from 'react';

function CompanyDashboard({eoa,userType,onLogout}) {
  // Company-specific dashboard content

  return (
    <div>
      <h2>company Dashboard</h2>
      <p>EOA:{eoa}</p>
      <p></p>
      <p>userType:{userType}</p>

     
      {/* Display transaction history and employee-related information */}
     
    </div>
  );
}

export default CompanyDashboard;
