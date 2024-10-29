import SwipePage from '../components/SwipePage';
import { useRouter } from 'next/router';

const Swipe = () => {
  const router = useRouter();
  
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
    avatarUrl: 'https://example.com/avatar2.jpg',
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
};

export default Swipe;
