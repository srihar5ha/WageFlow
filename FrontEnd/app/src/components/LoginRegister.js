import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "../contracts/PayV1.json";
import CompanyDashboard from './CompanyDashboard.js';
import EmployeeDashboard from './EmployeeDashboard.js';
import { openloginAdapter,options,modalConfig,web3AuthModalPack } from './Authkit.ts';


function LoginRegister() {

  
  const [eoa, setEoa] = useState(null);
  const [userType, setUserType] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [provider,setProvider]=useState(null);
  const[signer,setSigner]=useState(null);
  const [address,setAddress]=useState(null);
  const [name, setName] = useState('')
  const [isReg,setIsReg]=useState(false);
  
  const [loading, setLoading] = useState(false);
  
  
  const contractAddress="0x565eB9B0fE93D307eD5aC33DcD5cb81896498d18"; //mumbai testnet
  
  useEffect(() => {
    async function initModal() {
      await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig });
    }
    initModal();



  }, []);

  
  useEffect(() => {
    // Update the other values here based on the new eoa


    const updateState = async () => {
    if (eoa) {
      // Update provider, address, signer, and userinfo based on eoa
      // For example:
      console.log("invoked effect")
      const newProvider = await web3AuthModalPack.getProvider();
      const ethProvider= new ethers.providers.Web3Provider(newProvider);
      const newSigner = await ethProvider.getSigner();
      
      const newAddress= await web3AuthModalPack.getAddress();
      const newUserinfo= await web3AuthModalPack.getUserInfo();
      
      setProvider(newProvider);
      setAddress( newAddress);
      setSigner( newSigner);
      setUserInfo(newUserinfo);
    } else {
      // If eoa is null (e.g., after logout), reset the other values to null
      setProvider(null);
      setAddress(null);
      setSigner(null);
      setUserInfo(null);
    }
   
  }
  updateState();

  }, [eoa]);




  const handleLoginOrRegistration = async (selectedUserType) => {
    
   
    
    setLoading(true);
    try {
      const { eoa: signInEoa, safes } = await web3AuthModalPack.signIn();
      console.log('Successfully signed in with Web3Auth, eoa, safes = ', signInEoa, safes);

       setEoa(signInEoa);
      setUserType(selectedUserType);
      setLoading(false);
     
    } catch (error) {
      console.error('Error signing in with Web3Auth', error);
      setLoading(false);
    }
  
  };

  const handleLogout = async () => {
    try{
      await web3AuthModalPack.signOut();
      setEoa(null);
      // resetState()
    }catch(error){
      console.log("error signing out",error);
    }
      
  };

  

  return (
    <div>
  {loading ? (
    <p>Loading...</p>
  ) : eoa && address ? (
    <div>
     (
        userType === 'company' ? (
          <CompanyDashboard eoa={eoa} name={name} userType={userType} address={address} userInfo={userInfo} />
        ) : (
          <EmployeeDashboard eoa={eoa} userType={userType} address={address} />
        )
      )
      <button onClick={handleLogout}>Log Out</button> {/* Logout button */}
    </div>
  ) : (
    <div>
      <p>Login or Register:</p>
      <button onClick={() => handleLoginOrRegistration('company')}>Company</button>
      <button onClick={() => handleLoginOrRegistration('employee')}>Employee</button>
    </div>
  )}
</div>

   
  );
}

export default LoginRegister;







// <div>
// {loading ? (<p>Loading...</p> ) : eoa && address ? (
//   <div>
//       isReg ?
//    {
//       userType === 'company' ? (
//          <CompanyDashboard eoa={eoa} name={name} userType={userType} address={address} userInfo={userInfo}/>
//           ) :
//                     (
//                      <EmployeeDashboard eoa={eoa} userType={userType} address={address} />
//                          )
//                                 }
//     <button onClick={handleLogout}>Log Out</button> {/* Logout button */}
//     : 
//   </div>
// ) : (
//   <div>
    
//     <p>Login or Register:</p>
//     <button onClick={() => handleLoginOrRegistration('company')}>Company</button>
//     <button onClick={() => handleLoginOrRegistration('employee')}>Employee</button>
//   </div>
// )}
// </div>

