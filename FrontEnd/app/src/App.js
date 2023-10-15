

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import abi from "./contracts/PayV1.json";


 import { options, modalConfig,openloginAdapter,web3AuthModalPack} from "./components/Authkit.ts";

function App() {

  const [eoaValue,setEoa]=useState(null);
  const [provider,setProvider]=useState(null);
  const [address,setAddress]=useState(null);
  const [userInfo,setUserinfo]=useState(null);
  const [safes,setSafes]=useState('');



  useEffect(() => {
    async function initModal(){
    
    await web3AuthModalPack.init({options, adapters: [openloginAdapter], modalConfig })
    }
    initModal();
  }, []);

 

  const handleSignIn = async () => {
    try {
      
      const { eoa, safes } = await web3AuthModalPack.signIn()
      console.log('Successfully signed in with Web3Auth, eoa,safes = ',eoa,safes);
      
      const newProvider = await web3AuthModalPack.getProvider();
      const newAddress= await web3AuthModalPack.getAddress();
      const newUserinfo= await web3AuthModalPack.getUserInfo();
      console.log("new provider is ",newProvider);
      console.log("new address ",newAddress);
      console.log("new Usr info ",newUserinfo);
      setEoa(eoa);
      setProvider(newProvider);
      setAddress(newAddress);
      setUserinfo(newUserinfo);

    } catch (error) {
      console.error('Error signing in with Web3Auth', error);
    }
  } 

  const handleSignOut= async() =>{
    try{
      await web3AuthModalPack.signOut();
      setEoa(null);
      setProvider(null);
      setUserinfo(null);
      setAddress(null);
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
        {/* <p>
          "Data "  {eoaValue ?  JSON.stringify(userInfo) : "no data"}
        </p> */}
        {eoaValue !== null && (
          <div className='card'>
            <p>eoa:  {eoaValue}</p>
            <p>Address: {address}</p>
          </div>
        )}
        <button onClick={handleSignOut}>SIgn Out</button>
        
      </header>
    </div>
    </>
  );
}

export default App;
