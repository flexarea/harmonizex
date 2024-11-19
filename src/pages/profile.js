import React from 'react';


import Profile from '../components/Profile'; 

function ProfilePage() {
  // define the user data here
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 28,
    bio: 'I love listening to Indie Music!',
    avatarUrl: 'https://images.unsplash.com/photo-1730311410811-821740da6459?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  return (
    <Profile currentUser={currentUser} /> // passes the currentUser data to Profile
  );
}

export default ProfilePage;


