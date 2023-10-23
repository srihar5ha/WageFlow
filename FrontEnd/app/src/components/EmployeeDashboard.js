import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { ethers } from 'ethers';

function EmployeeDashboard() {
  // Employee-specific dashboard content
  const { eoa,userType, address,contract} = useAuth();
  const [myname,setMyname]=useState('');
  
  const InteractwithContract=async ()=>{

    const myname= await contract.Name(address);
    setMyname(myname);
    console.log("myname is ",myname);
  
  }



  return (
    <>
    <div>
      <h2>Employee Dashboard</h2>
      <div>
      <button onClick={InteractwithContract}>Interact with Contract</button>
        <p>Name:{myname}</p>
      <p>EOA:{eoa}</p>
      <p>address: {address}</p>
      <p>myname:{myname}</p>
      <p>userType:{userType}</p>
</div>
     
      {/* Display transaction history and employee-related information */}
      
    </div>
    </>
  );
}

export default EmployeeDashboard;
