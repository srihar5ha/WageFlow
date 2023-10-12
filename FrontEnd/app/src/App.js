// @ts-nocheck


import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import abi from "./contracts/PayV1.json";

import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit'
import { Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { WALLET_ADAPTERS } from '@web3auth/base';

// import { initWeb3Auth, signInWithWeb3Auth, signOutWithWeb3Auth, getWeb3AuthProvider } from './components/Authkit';
// import { initWeb3Auth,signInWithWeb3Auth } from './components/Authkit';

// import web3AuthFunctions from ".components/Authkit.ts";


const contractAddress="0x565eB9B0fE93D307eD5aC33DcD5cb81896498d18"; //later use .env

const {ethers} = require("ethers");


  const options = {
    clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID,
    web3AuthNetwork: 'testnet',
    chainConfig: {
      chainNamespace:CHAIN_NAMESPACES.EIP155,
      chainId: 0x1,
      rpcTarget: "https://rpc.ankr.com/eth"
    },
    uiConfig: {
      theme: 'dark',
      loginMethodsOrder: ['google', 'facebook']
    }
  }
  
  const modalConfig = {
    [WALLET_ADAPTERS.TORUS_EVM]: {
      label: 'torus',
      showOnModal: false
    },
    [WALLET_ADAPTERS.METAMASK]: {
      label: 'metamask',
      showOnDesktop: true,
      showOnMobile: false
    }
  }
  
  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: 'mandatory'
    },
    adapterSettings: {
      uxMode: 'popup',
      whiteLabel: {
        name: 'Safe'
      }
    }
  })
  
  const web3AuthModalPack = new Web3AuthModalPack({
    txServiceUrl: 'https://safe-transaction-polygon.safe.global',
  })
  
  // await web3AuthModalPack.init({options,adapters: [openloginAdapter], modalConfig })
  async function signInWithWeb3Auth() {
    await web3AuthModalPack.signIn();
  }


// Logout
async function signOutWithWeb3Auth() {
    await web3AuthModalPack.signOut();
  }

// Get the provider
function getWeb3AuthProvider() {
    return web3AuthModalPack.getProvider();
  }



function App() {
  useEffect(() => {
    console.log("init called");
  
  }, []);

  const handleSignIn = async () => {
    try {
      // Call the signInWithWeb3Auth function from comp1.tsx
      await web3AuthModalPack.init({options,adapters: [openloginAdapter], modalConfig })
      const { eoa, safes } = await web3AuthModalPack.signIn()
      console.log('Successfully signed in with Web3Auth,eoa,safes',eoa,safes);
    } catch (error) {
      console.error('Error signing in with Web3Auth', error);
    }
  } 




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Click the button below to sign in with Web3Auth:</p>

        <button onClick={handleSignIn}>Sign In with Web3Auth</button>
        
      </header>
    </div>
  );
}

export default App;
