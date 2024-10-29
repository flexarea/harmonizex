import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile'; // component to display user profile

const SwipePage = ({ currentUser, userToSwipe, onLike, onDislike }) => {
  const router = useRouter();

  const handleLike = () => {
    onLike();
    // navigate to matches page after liking
    router.push('/matches');
  };

  const handleDislike = () => {
    onDislike();
    // navigate to swipe page for the next user
    router.push('/swipe');
  };

  return (
    <div className="swipe-page">
      <header>
        <h1>Tinder</h1>
        <nav>
          <button onClick={() => router.push('/matches')}>Matches</button>
          <button onClick={() => router.push('/profile')}>Profile</button>
        </nav>
      </header>

      <main>
        <section className="swipe-section">
          {userToSwipe ? (
            <UserProfile 
              user={userToSwipe} 
              onLike={handleLike} 
              onDislike={handleDislike} 
            />
          ) : (
            <p>No users to swipe on at the moment.</p>
          )}
        </section>
      </main>

      <footer>
        <button className="swipe-button dislike" onClick={handleDislike}>👎</button>
        <button className="swipe-button like" onClick={handleLike}>👍</button>
      </footer>
    </div>
  );
};

SwipePage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  userToSwipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default SwipePage;
