// components/UserProfilePage.js

import React from 'react';
import PropTypes from 'prop-types';
import ProfileDetails from './ProfileDetails';


function UserProfilePage({ currentUser }) {
  return (
    <div>
      <ProfileDetails user={currentUser} />
    </div>
  );
}

UserProfilePage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default UserProfilePage;
