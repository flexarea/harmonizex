/*
 Profile.js

  The user profile displays the user's information, biography, playlists, and liked songs. 
  For the user, it privately shows who the user disliked, liked, and personal options for settings and 
  changing password.

  props:
    
*/

import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Profile.module.css';

function Profile({ currentUser }) {
  return (
    <div className={styles.userProfilePage}>
      <header className={styles.header}>
        <Image
          src={currentUser.avatarUrl}
          alt={`${currentUser.name}'s avatar`}
          width={100}
          height={100}
          className={styles.avatar}
        />
        <h1>{currentUser.name}</h1>
        <div className={styles.localClass}>
          <p>Age: {currentUser.age}</p>
          <p>Bio: {currentUser.bio}</p>
        </div>
      </header>
      {/* Additional sections for playlists, liked songs, etc. */}
    </div>
  );
}

Profile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default Profile;
