import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "../styles/Profile.module.css";

function Profile({ currentUser }) {
  return (
    <>
      <Image
        src={currentUser.avatarUrl}
        alt={currentUser.name}
        className={styles.avatar}
        width={300}
        height={300}
      />
      <h3>
        {currentUser.name}, {currentUser.age}
      </h3>
      <p>{currentUser.bio}</p>
    </>
  );
}

Profile.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
