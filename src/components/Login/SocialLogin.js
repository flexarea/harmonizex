// components/Login/SocialLogin.js

import React from 'react';

function SocialLogin() {
  const handleSocialLogin = (provider) => {
    // Logic for handling social login (e.g., redirect to provider's OAuth)
  };

  return (
    <div>
      <h3>Login with:</h3>
      <button onClick={() => handleSocialLogin('google')}>Google</button>
      <button onClick={() => handleSocialLogin('facebook')}>Facebook</button>
    </div>
  );
}

export default SocialLogin;
