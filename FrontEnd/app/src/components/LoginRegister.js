import React, { useState, useEffect } from 'react';
import { web3AuthModalPack, options, openloginAdapter } from '../components/authkit.ts'; // Import from your authkit.ts

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(''); // Company or Employee

  useEffect(() => {
    async function initAuthModal() {
      await web3AuthModalPack.init({ options, adapters: [openloginAdapter] });
    }
    initAuthModal();
  }, []); // Initialize the Web3Auth modal

  const handleLogin = async () => {
    try {
      const { eoa, safes } = await web3AuthModalPack.signIn();
      // Handle the user's role and authentication logic here
    } catch (error) {
      console.error('Error signing in with Web3Auth', error);
    }
  };

  const handleRegistration = async () => {
    // Handle user registration logic
  };

  return (
    <div>
      <h2>Login or Register</h2>
      <div>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="Company">Company</option>
          <option value="Employee">Employee</option>
        </select>
        <button onClick={handleLogin}>Login with Web3Auth</button>
        <button onClick={handleRegistration}>Register</button>
      </div>
    </div>
  );
}

export default LoginRegister;
