import { useRouter } from 'next/router';

function MainPage({ currentUser, matches, onMatchSelect }) {
  const router = useRouter();

  return (
    <div className="main-page">
      <h2>Welcome, {currentUser.name}!</h2>
      <nav>
        <button onClick={() => router.push('/swipe')}>Start Swiping</button>
        <button onClick={() => router.push('/matches')}>View Matches</button>
        <button onClick={() => router.push('/profile')}>Edit Profile</button>
      </nav>
      {/* render matches or other components */}
    </div>
  );
}

export default MainPage;
