import React from "react";
import PropTypes from "prop-types";
import Avatar from "./swipeAvatar";
import MusicDisplay from "./swipeMusicDisplay";
import Controls from "./swipeButtons";
import styles from "../styles/SwipePage.module.css"; // Importing the styles

function MatchCard({ user, onLike, onDislike }) {
  return (
    <div className={styles.card}>
      {/* Avatar and user info */}
      <Avatar user={user} className={styles.avatar} />

      {/* Music display */}
      <MusicDisplay />

      {/* Controls */}
      <Controls onLike={onLike} onDislike={onDislike} />
    </div>
  );
}

MatchCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default MatchCard;
