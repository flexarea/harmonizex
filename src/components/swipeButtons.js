import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SwipePage.module.css';

function Controls({ onLike, onDislike }) {
  return (
    <div >
      <div className={styles.controls}>
        <button
          type="button"
          onClick={onDislike}
          className={styles.dislikeButton}
        >
          👎
        </button>
        <button
          type="button"
          onClick={onLike}
          className={styles.likeButton}
        >
          👍
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default Controls;
