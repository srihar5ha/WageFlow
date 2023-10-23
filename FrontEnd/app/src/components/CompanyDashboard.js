import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { ethers } from 'ethers';



function CompanyDashboard() {
  // Company-specific dashboard content
  const { eoa,userType, address,contract,provider,signer} = useAuth();
  const [loading,setLoading]=useState(true);
  const [empList,setEmpList]=useState([])
  const [balance,setBalance]=useState(0);
  const [receipt,setReceipt]=useState();
  const [pkey,setPkey]= useState([]);



  const getList=async()=>
  {
    const empl= await contract.getEmployeeList(address);
    setEmpList(empl)

  }
  

  const getBalance=async() =>{
    const balance = ethers.utils.formatEther(
      await provider.getBalance(address) // Balance is in wei
    );
    setBalance(balance);

  }

  const paySalary = async()=>{

    const destination = "0x1dC8668ad0cd03bF039E14CA89f718545Cf1AF0B";
const amount = ethers.utils.parseEther("0.005"); // Convert 1 ether to wei

// Submit transaction to the blockchain
const tx = await signer.sendTransaction({
  from: "0x50c2ff55821401547F0319181aaBD916C9C1D026",
  to: destination,
  value: amount,
  maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
  maxFeePerGas: "6000000000000", // Max fee per gas
});

// Wait for transaction to be mined
const receipt = await tx.wait();
setReceipt(receipt);
  }


  return (
    <div>
      <h2>company Dashboard</h2>
      <button onClick={getList}>get emp list</button>
      <button onClick={getBalance}>get balance</button>
      <button onClick={paySalary}>pay salary</button>
      <p>EOA:{eoa}</p>
      <p>address: {address}</p>
      <p>userType:{userType}</p>
      {address ? (<p>balance : {balance}</p>):"no"}
      {receipt ? console.log("reciept is ",receipt):"no"}
     {empList ? (
      
      <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Wallet Address</th>
          <th>Name/Email</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {empList.map((employee, index) => (
          <tr key={employee.wallet}>
            <td>{index + 1}</td>
            <td>{employee.wallet}</td>
            <td>{employee.name}</td>
            <td>{parseInt(employee.salary.toString(), 16)}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>     ):"<p>..loading</p>"}

     
      {/* Display transaction history and employee-related information */}
     
    </div>
  );
}

export default CompanyDashboard;
