import { useRouter } from 'next/router';
import MatchesPage from '../../pages/MatchesPage';


function Matches() {
  const router = useRouter();

  const matches = [
    { id: '2', name: 'John Smith', avatarUrl: 'https://example.com/avatar2.jpg' },
    { id: '3', name: 'Alice Johnson', avatarUrl: 'https://example.com/avatar3.jpg' },
  ];

  const handleMatchSelect = (matchId) => {
    // navigates to the conversations page for the selected match
    router.push(`/conversations?matchId=${matchId}`);
  };

  return (
    <MatchesPage 
      matches={matches} 
      onMatchSelect={handleMatchSelect} 
    />
  );
}

export default Matches;


