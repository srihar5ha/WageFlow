import React, { useState, useEffect } from 'react';
import { options, modalConfig,openloginAdapter,web3AuthModalPack} from "./Authkit.ts";
import { ethers} from 'ethers';


function LoginRegister({eoaflag, onUserLogin, onUserLogout}) {
  // const [userType, setUserType] = useState(''); // Company or Employee


  useEffect(() => {
    async function initModal(){
    
    await web3AuthModalPack.init({options, adapters: [openloginAdapter], modalConfig })
    }
    initModal();
  }, []);

  



  const handleLoginOrRegistration = async (userType) => {
    try {
      
        
        const { eoa, safes } = await web3AuthModalPack.signIn()
        console.log('Successfully signed in with Web3Auth, eoa,safes = ',eoa,safes);       
              
        const provider= new ethers.providers.Web3Provider(await web3AuthModalPack.getProvider())
        const userData = {
          eoa : eoa,
          address:web3AuthModalPack.getAddress(),
          userInfo: web3AuthModalPack.getUserInfo(),
          provider: provider,          
          signer: await provider.getSigner(),
          userType: userType,
          };
        // Pass the user data to the parent component
        onUserLogin(userData);
      
      // updateState(eoa, ethProvider, newAddress, newSigner, newUserinfo);
      
    } catch (error) {
      console.error('Error signing in with Web3Auth', error);
    }
  }



  const handleLogout = async () => {
    // Handle user registration logic
     await web3AuthModalPack.signOut();
    onUserLogout();
  };

  return (
    <div>
      {eoaflag ? (<button onClick={handleLogout}>Log Out</button>):( <div>
          <p>Login or Register:</p>
          <button onClick={() => handleLoginOrRegistration('company')}>Company</button>
          <button onClick={() => handleLoginOrRegistration('employee')}>Employee</button>
        </div> 
        )}
    </div>
  );
}

export default LoginRegister;
