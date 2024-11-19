import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SwipePage.module.css';

function SwipeItem({ user, onLike, onDislike }) {
  return (
    <div className={styles.card}>
      <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className={styles.avatar} />
      <h3>{user.name}, {user.age}</h3>
      <p>{user.bio}</p>
      <div className={styles.buttonContainer}>
        <button type = 'button' className={styles.button} onClick={onDislike}>Dislike</button>
        <button type = 'button' className={styles.button} onClick={onLike}>Like</button>
      </div>
    </div>
  );
}

SwipeItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default SwipeItem;

