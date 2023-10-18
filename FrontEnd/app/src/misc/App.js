

import logo from '../logo.svg';
import '../App.css';
import { useEffect, useState } from 'react';
import abi from "../contracts/PayV1.json";
import { ethers} from 'ethers';
 import { options, modalConfig,openloginAdapter,web3AuthModalPack} from "../components/Authkit.ts";


function App() {

  const [eoa,setEoa]=useState(null);
  const [provider,setProvider]=useState(null);
  const [address,setAddress]=useState(null);
  const [userInfo,setUserinfo]=useState(null);
  const [safes,setSafes]=useState('');
  const[signer,setSigner]=useState(null);
  
  const contractAddress="0x565eB9B0fE93D307eD5aC33DcD5cb81896498d18"; //mumbai testnet
  

  // initialise web3AuthModalPack on startup
  useEffect(() => {
    async function initModal(){
    
    await web3AuthModalPack.init({options, adapters: [openloginAdapter], modalConfig })
    }
    initModal();
  }, []);

  // const ethProvider= new ethers.providers.Web3Provider(provider);
  // const signer = await ethProvider.getSigner();
  // const thisaddress =await  signer.getAddress();

  const resetState = () => {
    setEoa(null);
    setProvider(null);
    setAddress(null);
    setSigner(null);
    setUserinfo(null);
  }


 


  useEffect(() => {
    // Update the other values here based on the new eoa
    const updateState = async () => {
    if (eoa) {
      // Update provider, address, signer, and userinfo based on eoa
      // For example:
      const newProvider = await web3AuthModalPack.getProvider();
      const ethProvider= new ethers.providers.Web3Provider(newProvider);
      const newSigner = await ethProvider.getSigner();
      
      const newAddress= await web3AuthModalPack.getAddress();
      const newUserinfo= await web3AuthModalPack.getUserInfo();
      
      setProvider(newProvider);
      setAddress(newAddress);
      setSigner(newSigner);
      setUserinfo(newUserinfo);
    } else {
      // If eoa is null (e.g., after logout), reset the other values to null
      setProvider(null);
      setAddress(null);
      setSigner(null);
      setUserinfo(null);
    }
  }
  updateState();
  
}, [eoa]);



  const handleSignIn = async () => {
    try {
      
      const { eoa: signInEao, safes } = await web3AuthModalPack.signIn()
      console.log('Successfully signed in with Web3Auth, eoa,safes = ',signInEao,safes);
      setEoa(signInEao);
      
      // updateState(eoa, ethProvider, newAddress, newSigner, newUserinfo);
      
    } catch (error) {
      console.error('Error signing in with Web3Auth', error);
    }
  } 

    //const [Contract, setContract] = useState(new ethers.Contract(contractAddress, abi, signer))
  
  const interact=async() =>{
    try{
     const contract= new ethers.Contract(contractAddress, abi, signer);
      let name= await contract.getEmployeeList(address);
      console.log("name for the address is ",name);
  



    }catch(error){
      console.log("interaction error",error);
    }

  }

  const handleSignOut= async() =>{
    try{
      await web3AuthModalPack.signOut();
      setEoa(null);
      // resetState()
    }catch(error){
      console.log("error signing out",error);
    }
  }




  return (
    <>

<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>Click the button below to sign in with Web3Auth:</p>
    
    <button onClick={handleSignIn}>Sign In with Web3Auth</button>
    
    {/* Display eoa and address */}
    <div>
      <p>eoa: {eoa}</p>
      <p>Address: {address}</p>
    </div>

    <p>{console.log("signer and provider are ",signer,provider) } </p>
        
    <button onClick={handleSignOut}>Sign Out</button>
    <button onClick={interact}>Interact with contract</button>
  </header>
</div>

    
    
    </>
  );
}

export default App;
