import React from 'react';

function CompanyDashboard({eoa,name,userType,address,userInfo}) {
  // Company-specific dashboard content

  return (
    <div>
      <h2>company Dashboard</h2>
      {console.log("inside company dash ")}
      <p>EOA:{eoa}</p>
      <p>address: {address}</p>
      <p>userType:{userType}</p>
      {/* <p>email: {userInfo.email}</p>
      <p>name : {name}</p>
      {console.log("user info inside comapnu dashboard ",userInfo)} */}

     
      {/* Display transaction history and employee-related information */}
     
    </div>
  );
}

export default CompanyDashboard;
