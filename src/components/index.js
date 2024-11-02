/*
  index.js



  props:
    
*/

import MainPage from './MainPage'; // Adjust the path as necessary

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
    { id: '3', name: 'Alice Johnson', avatarUrl: 'https://plus.unsplash.com/premium_photo-1697477564565-2a95d76e921a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const onMatchSelect = (matchId) => {
    console.log('Selected match:', matchId);
    // navigate to a conversation page or something similar here
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
