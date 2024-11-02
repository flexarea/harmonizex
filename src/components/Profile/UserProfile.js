// components/UserProfilePage.js

import React from 'react';
// import PropTypes from 'prop-types';
// import ProfileDetails from './ProfileDetails';
// import styles from '../../styles/UserProfilePage.module.css';
import Profile from '../../pages/profile';

// function UserProfile({ currentUser }) {
//   return (
//     <div className={styles.userProfilePageContainer}>
//       <div className={styles.profileDetailsWrapper}>
//         <ProfileDetails user={currentUser} />
//         <Profile currentUser={currentUser} />
//       </div>
//     </div>
//   );
// }
function UserProfile() {
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 28,
    bio: 'Love hiking and outdoor adventures!',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  return <Profile currentUser={currentUser} />;
}

export default UserProfile;

// UserProfile.propTypes = {
//   currentUser: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     age: PropTypes.number,
//     bio: PropTypes.string,
//     avatarUrl: PropTypes.string,
//   }).isRequired,
// };

