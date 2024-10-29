/*
  MainPage.js

  The main page displays the page where the user can swipe left or right to like or dislike respectfully
  on other users.

  props:
    
*/

import MainPage from './index.js';

const IndexPage = () => {
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 28,
    bio: 'Love hiking and outdoor adventures!',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  const matches = [
    { id: '2', name: 'John Smith', avatarUrl: 'https://example.com/avatar2.jpg' },
    { id: '3', name: 'Alice Johnson', avatarUrl: 'https://example.com/avatar3.jpg' },
  ];

  const onMatchSelect = (matchId) => {
    console.log('Selected match:', matchId);
  };

  return (
    <MainPage 
      currentUser={currentUser} 
      matches={matches} 
      onMatchSelect={onMatchSelect} 
    />
  );
};

export default IndexPage;

