import logo from './logo.svg';
import './App.css';

import abi from "./contracts/PayV1.json";

// console.log(abi);

const contractAddress="0x565eB9B0fE93D307eD5aC33DcD5cb81896498d18"; //later use .env

const {ethers} = require("ethers");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        
      </header>
    </div>
  );
}

export default App;
