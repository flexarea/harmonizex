/*
  MainPage.js

  The main page displays the page where the user can swipe left or right to like or dislike respectfully
  on other users.

  props:
    
*/

import MainPage from '../components/MainPage'; // Adjust the path as necessary

function IndexPage() {
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
    // You might want to navigate to a conversation page or something similar here
  };

  return (
    <MainPage 
      currentUser={currentUser} 
      matches={matches} 
      onMatchSelect={onMatchSelect} 
    />
  );
}

export default IndexPage;
