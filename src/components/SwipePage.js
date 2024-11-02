// pages/swipe.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/SwipePage.module.css'; 

function Swipe() {
  const router = useRouter();
  
  // const currentUser = {
  //   id: '1',
  //   name: 'Jane Doe',
  //   age: 28,
  //   bio: 'I love Taylor Swift!',
  //   avatarUrl: 'https://example.com/avatar.jpg',
  // };

  const usersToSwipe = [
    {
      id: '2',
      name: 'John Smith',
      age: 30,
      bio: 'I listen to music from League of Legends.',
      avatarUrl: 'https://images.unsplash.com/photo-1725902380927-081e7400b920?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      name: 'Emma Brown',
      age: 27,
      bio: 'Coffee lover and travel enthusiast.',
      avatarUrl: 'https://images.unsplash.com/photo-1728646995795-2e37aa8cb13e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  // state to store likes and dislikes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [noMoreMatches, setNoMoreMatches] = useState(false);

  const userToSwipe = usersToSwipe[currentIndex];

  const moveToNext = () => {
    if (currentIndex < usersToSwipe.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setNoMoreMatches(true); // navigate to main page if no more users
    }
  };

  const onLike = () => {
    setLikes((prevLikes) => [...prevLikes, userToSwipe.id]); // store liked user ID
    console.log('Liked user:', userToSwipe.id);
    moveToNext();
  };

  const onDislike = () => {
    setDislikes((prevDislikes) => [...prevDislikes, userToSwipe.id]); // store disliked user ID
    console.log('Disliked user:', userToSwipe.id);
    moveToNext();
  };

  const handleBackToMain = () => {
    router.push('/'); // Navigate back to main page
  };

  if (noMoreMatches) {
    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h2>No more matches available.</h2>
        <button type = 'button' onClick={handleBackToMain} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Back to Main Page
        </button>
      </div>
    );
  }

  return (
        <div className={styles.swipePage}>
          <div className={styles.card}>
            <img src={userToSwipe.avatarUrl} alt={userToSwipe.name} className={styles.avatar} />
            <h3>{userToSwipe.name}, {userToSwipe.age}</h3>
            <p>{userToSwipe.bio}</p>
            <div className={styles.buttonContainer}>
              <button type = 'button' className={styles.dislikeButton} onClick={onDislike}>👎</button>
              <button type = 'button' className={styles.likeButton} onClick={onLike}>👍</button>
            </div>
          </div>
        </div>
      );
}

export default Swipe;

// import React from 'react';
// // import { useRouter } from 'next/router';
// import styles from '../styles/SwipePage.module.css'; 

// function Swipe() {
//   // const router = useRouter();

//   // const currentUser = {
//   //   id: '1',
//   //   name: 'Jane Doe',
//   //   age: 28,
//   //   bio: 'I love Taylor Swift!',
//   //   avatarUrl: 'https://example.com/avatar.jpg',
//   // };

//   const userToSwipe = {
//     id: '2',
//     name: 'John Smith',
//     age: 30,
//     bio: 'I listen to music from League of Legends.',
//     avatarUrl: 'https://images.unsplash.com/photo-1725902380927-081e7400b920?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   };

//   const onLike = () => {
//     console.log('Liked user:', userToSwipe.id);
//     // logic for saving the like in state or database can go here
//   };

//   const onDislike = () => {
//     console.log('Disliked user:', userToSwipe.id);
//     // logic for saving the dislike in state or database can go here
//   };

//   return (
//     <div className={styles.swipePage}>
//       <div className={styles.card}>
//         <img src={userToSwipe.avatarUrl} alt={userToSwipe.name} className={styles.avatar} />
//         <h3>{userToSwipe.name}, {userToSwipe.age}</h3>
//         <p>{userToSwipe.bio}</p>
//         <div className={styles.buttonContainer}>
//           <button type = 'button' className={styles.dislikeButton} onClick={onDislike}>👎</button>
//           <button type = 'button' className={styles.likeButton} onClick={onLike}>👍</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Swipe;
