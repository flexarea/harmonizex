import React from 'react';
// import { useRouter } from 'next/router';
import SwipePage from '../components/SwipePage';
// import PropTypes from 'prop-types';
// import UserProfile from '../components/Profile/Profile'; // component to display user profile

function Swipe() {
  // const router = useRouter();
  
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 28,
    bio: 'I love Taylor Swift!',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  const userToSwipe = {
    id: '2',
    name: 'John Smith',
    age: 30,
    bio: 'I listen to music from League of Legends.',
    avatarUrl: 'https://images.unsplash.com/photo-1725902380927-081e7400b920?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const onLike = () => {
    console.log('Liked user:', userToSwipe.id);
    // logic for saving the like in state or database can go here
  };

  const onDislike = () => {
    console.log('Disliked user:', userToSwipe.id);
    // logic for saving the dislike in state or database can go here
  };

  return (
    <SwipePage 
      currentUser={currentUser} 
      userToSwipe={userToSwipe} 
      onLike={onLike} 
      onDislike={onDislike} 
    />
  );
}

export default Swipe;
