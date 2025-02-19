// components/MainPage.js

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from '../styles/MainPage.module.css';

function MainPage({ currentUser }) {
  const router = useRouter();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainPage}>
        <h2>Welcome, {currentUser.name}!</h2>
        <nav>
          <button type="button" onClick={() => router.push('/swipe')}>
            Start Swiping
          </button>
          <button type="button" onClick={() => router.push('/matches')}>
            View Matches
          </button>
          <button type="button" onClick={() => router.push('/profile')}>
            Edit Profile
          </button>
        </nav>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired, // Adjusted type based on database
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default MainPage;
