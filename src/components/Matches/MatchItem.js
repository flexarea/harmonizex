// components/Matches/MatchItem.js

import React from 'react';
import PropTypes from 'prop-types';
// import styles from './MatchItem.module.css'; // Optional: Import a CSS module for styling

function MatchItem({ match }) {
  return (
    <div className={styles.matchItem}>
      <img src={match.avatarUrl} alt={`${match.name}'s avatar`} className={styles.avatar} />
      <div className={styles.details}>
        <h3 className={styles.name}>{match.name}</h3>
        {/* You can add more match details or actions here */}
        <p className={styles.bio}>{match.bio || 'No bio available.'}</p>
        <button className={styles.messageButton} onClick={() => console.log(`Message ${match.name}`)}>Message</button>
      </div>
    </div>
  );
}

MatchItem.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    bio: PropTypes.string, // Optional: Add bio if available
  }).isRequired,
};

export default MatchItem;
