// pages/matches.js

import React from 'react';
import Likes from '../components/Matches/Likes'; // Adjust the import path if necessary

function MatchesPage() {
  return (
    <div>
      <h1>Your Matches</h1>
      <Likes /> {/* Render the Likes component to display liked matches */}
    </div>
  );
}

export default MatchesPage;

// pages/matches.js

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import MatchesList from '../components/Matches/MatchesList'; // Component for displaying matches
// import { fetchMatches } from '../utils/api'; // Utility function to fetch matches

// const MatchesPage = () => {
//   const router = useRouter();
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadMatches = async () => {
//       try {
//         const currentUserId = '1'; // This should come from your authentication logic
//         const matchesData = await fetchMatches(currentUserId);
//         setMatches(matchesData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadMatches();
//   }, []);

//   if (loading) return <div>Loading matches...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="matches-page">
//       <h1>Your Matches</h1>
//       {matches.length === 0 ? (
//         <p>No matches found.</p>
//       ) : (
//         <MatchesList matches={matches} />
//       )}
//     </div>
//   );
// };

// export default MatchesPage;
