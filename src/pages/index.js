// // pages/index.js
// import MainPage from '../components/MainPage';

// function Home() {
//   return <MainPage />;
// }

// export default Home;
// pages/index.js
import MainPage from '../components/MainPage'; // Ensure this path is correct

function Home() {
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 25,
    bio: 'Loves music',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  return <MainPage currentUser={currentUser} />;
}

export default Home;
