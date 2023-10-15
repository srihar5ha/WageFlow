// @ts-nocheck

import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { OpenloginAdapter } from  '@web3auth/openlogin-adapter'
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";


const options= {
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

// await web3AuthModalPack.init({
//   options,
//   adapters: [openloginAdapter],
//   modalConfig
// })


// Allow to login and get the derived EOA
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

  // const web3AuthFunctions = {
  //   initWeb3Auth,
  //   signInWithWeb3Auth,
  //   signOutWithWeb3Auth,
  //   getWeb3AuthProvider,
  // };

  export {options,modalConfig,openloginAdapter,web3AuthModalPack};