// pages/matches.js
import React from 'react';
import { useRouter } from 'next/router';
import Likes from '../components/Matches/Likes';

function MatchesPage() {
  const router = useRouter();

  const matches = [
    { id: '2', name: 'John Smith', avatarUrl: 'https://images.unsplash.com/photo-1725902380927-081e7400b920?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Alice Johnson', avatarUrl: 'https://plus.unsplash.com/premium_photo-1697477564565-2a95d76e921a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const handleMatchSelect = (matchId) => {
    router.push(`/conversations?matchId=${matchId}`);
  };

  return (
    <div>
      <h1>Your Matches</h1>
      <Likes matches={matches} onMatchSelect={handleMatchSelect} />
    </div>
  );
}

export default MatchesPage;
