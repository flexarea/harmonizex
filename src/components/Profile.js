/*
 Profile.js

  The user profile displays the user's information, biography, playlists, and liked songs. 
  For the user, it privately shows who the user disliked, liked, and personal options for settings and 
  changing password.

  props:
    
*/
import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Profile.module.css";

const mockPlaylists = [
  {
    id: "1",
    title: "Chill Vibes",
    coverUrl:
      "https://images.unsplash.com/photo-1728848448514-ef05d827907b?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "Workout Mix",
    coverUrl:
      "https://images.unsplash.com/photo-1729934399194-09ba96dbed74?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    title: "Top Hits",
    coverUrl:
      "https://images.unsplash.com/photo-1729180801690-d7db9ea35867?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
        <h1 className={styles.userName}>{currentUser.name}</h1>
        <div className={styles.localClass}>
          <p>Age: {currentUser.age}</p>
          <p>Bio: {currentUser.bio}</p>
        </div>
      </header>
      <section className={styles.playlistsSection}>
        <h2>Your Playlists</h2>
        <div className={styles.playlistContainer}>
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              <Image
                src={playlist.coverUrl}
                alt={playlist.title}
                width={200}
                height={200}
                className={styles.playlistCover}
              />
              <p className={styles.playlistTitle}>{playlist.title}</p>
            </div>
          ))}
        </div>
      </section>
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
