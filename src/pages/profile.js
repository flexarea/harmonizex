// UserProfilePage.js

import React from 'react';
import PropTypes from 'prop-types';
// import styles from './UserProfile.module.css'; // Optional: Import a CSS module for styling

function profile({ currentUser }) {
  return (
    <div className={styles.userProfilePage}>
      <header className={styles.header}>
        <img src={currentUser.avatarUrl} alt={`${currentUser.name}'s avatar`} className={styles.avatar} />
        <h1>{currentUser.name}</h1>
        <p>Age: {currentUser.age}</p>
        <p>Bio: {currentUser.bio}</p>
      </header>

      <section className={styles.playlists}>
        <h2>Your Playlists</h2>
        {/* Assuming you have a way to fetch or manage playlists */}
        <ul>
          <li>Playlist 1</li>
          <li>Playlist 2</li>
          <li>Playlist 3</li>
          {/* More playlists can be dynamically rendered here */}
        </ul>
      </section>

      <section className={styles.likedSongs}>
        <h2>Your Liked Songs</h2>
        {/* Assuming you have a way to fetch or manage liked songs */}
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

profile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default profile;
