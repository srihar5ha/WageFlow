import React, { createContext, useContext, useState, useEffect } from 'react';
import { options,openloginAdapter,modalConfig,web3AuthModalPack } from '../components/Authkit.ts';
import { ethers } from 'ethers';
import abi from "../contracts/PayV1.json";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [eoa, setEoa] = useState(null);
  const [userType, setUserType] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
 // const [name, setName] = useState('');
  const [isReg, setIsReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contract,setContract]=useState(null);

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
      
      setProvider(ethProvider);
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


  //to create contract instance when signer and address are ready
  useEffect(()=>{
    if(signer && address){
      const contract = new ethers.Contract(contractAddress, abi, signer)
      console.log("contarct set mowa")
      setContract(contract)
    }



  },[signer,address])

  // Define the handleLogin function here
  const handleLogin = async (selectedUserType) => {
    // Your existing login logic
    
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

  // Define the handleLogout function here
  const handleLogout = async () => {
    // Your existing logout logic
    try{
      await web3AuthModalPack.signOut();
      setEoa(null);
      // resetState()
    }catch(error){
      console.log("error signing out",error);
    }
  };

  const getEmployeeList = async () => {
    try {
      
      let res = await contract.getEmployeeList(address)
      return res
    }
    catch (e) {
      console.log(e)
      alert("Something went wrong inside get emp list, try again")
    }
  }
  





  return (
    <AuthContext.Provider
      value={{
        eoa,
        userType,
        userInfo,
        provider,
        signer,
        web3AuthModalPack,
        address,
        loading,
        abi,
        contractAddress,        
        isReg,
        handleLogin,
        handleLogout,
        contract,
        getEmployeeList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
