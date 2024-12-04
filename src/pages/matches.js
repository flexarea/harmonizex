// pages/matches.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUserId = 1; // Replace with authenticated user ID

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/getMatches?userId=${currentUserId}`);
        const data = await res.json();

        if (res.ok) {
          setMatches(data.matches);
        } else {
          setError(data.error || 'Failed to fetch matches');
        }
      } catch (err) {
        setError('Failed to fetch matches');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Your Matches</h2>
      {matches.length === 0 ? (
        <p>You have no matches yet.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.matched_user_id}>
              <Link href={`/conversations/${match.matched_user_id}`}>
                <a>User {match.matched_user_id}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Matches;
