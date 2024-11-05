import React from 'react';
import styles from './SpotifyLogin.module.css';

function SpotifyLogin() {
  const handleSpotifyLogin = () => {
    // Replace with actual Spotify OAuth logic
    console.log('Spotify login clicked');
  };

  return (
    <div className={styles.socialContainer}>
      <button onClick={handleSpotifyLogin}>Login with Spotify</button>
    </div>
  );
}

export default SpotifyLogin;

// // components/Login/SocialLogin.js

// import React from 'react';

// function SpotifyLogin() {
//   const handleSpotifyLogin = (provider) => {
//     // logic for handling social login (e.g., redirect to provider's OAuth)
//   };

//   return (
//     <div>
//       <h3>Login with:</h3>
//       <button onClick={() => handleSpotifyLogin('Spotify')}>Spotify</button>
//     </div>
//   );
// }

// export default SpotifyLogin;
