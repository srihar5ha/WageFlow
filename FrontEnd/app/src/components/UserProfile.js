import React, { useState } from 'react';

function UserProfile() {
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');

  const handleUpdateProfile = () => {
    // Handle profile update logic
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Wallet Address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
