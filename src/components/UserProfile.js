/*
 UserProfile.js

  The user profile displays the user's information, biography, playlists, and liked songs. 
  For the user, it privately shows who the user disliked, liked, and personal options for settings and 
  changing password.

  props:
    
*/

import UserProfilePage from '../components/UserProfilePage';

const Profile = () => {
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 28,
    bio: 'Love hiking and outdoor adventures!',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  return (
    <UserProfilePage currentUser={currentUser} />
  );
};

export default Profile;


