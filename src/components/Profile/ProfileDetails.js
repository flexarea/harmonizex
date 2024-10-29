/*
 UserProfile.js

  The user profile displays the user's information, biography, playlists, and liked songs. 
  For the user, it privately shows who the user disliked, liked, and personal options for settings and 
  changing password.

  props:
    
*/

// components/ProfileDetails.js

import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileDetails.module.css'; // Optional: Import a CSS module for styling

function ProfileDetails({ user }) {
  return (
    <div className={styles.profileDetails}>
      <header className={styles.header}>
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className={styles.avatar} />
        <h1>{user.name}</h1>
        <p>Age: {user.age}</p>
        <p>Bio: {user.bio}</p>
      </header>

      <section className={styles.playlists}>
        <h2>Your Playlists</h2>
        {/* fetch or manage playlists */}
        <ul>
          <li>Playlist 1</li>
          <li>Playlist 2</li>
          <li>Playlist 3</li>
          {/* More playlists */}
        </ul>
      </section>

      <section className={styles.likedSongs}>
        <h2>Your Liked Songs</h2>
        {/* fetch or manage liked songs */}
        <ul>
          <li>Liked Song 1</li>
          <li>Liked Song 2</li>
          <li>Liked Song 3</li>
          {/* More liked songs can be dynamically rendered here */}
        </ul>
      </section>

      <section className={styles.settings}>
        <h2>Settings</h2>
        <button onClick={() => console.log('Navigate to change password')}>Change Password</button>
        <button onClick={() => console.log('Navigate to account settings')}>Account Settings</button>
      </section>

      <section className={styles.dislikedUsers}>
        <h2>Your Disliked Users</h2>
        {/* List of disliked users can be displayed here */}
        <p>You have not disliked any users yet.</p>
      </section>
    </div>
  );
}

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default ProfileDetails;

