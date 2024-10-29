/*
  Dismissed.js

  The dismissed display who the user rejected from MainPage.

  props:
    
*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DislikedUsers = ({ currentUserId }) => {
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDislikedUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${currentUserId}/dislikes`);
        if (!response.ok) {
          throw new Error('Failed to fetch disliked users');
        }
        const data = await response.json();
        setDislikedUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDislikedUsers();
  }, [currentUserId]);

  if (loading) return <div>Loading disliked users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="disliked-users">
      <h2>Users You Disliked</h2>
      {dislikedUsers.length === 0 ? (
        <p>No users disliked yet.</p>
      ) : (
        <ul>
          {dislikedUsers.map((user) => (
            <li key={user.id} className="disliked-user">
              <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
              <h3>{user.name}</h3>
              <p>{user.bio || "No bio available."}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DislikedUsers.propTypes = {
  currentUserId: PropTypes.string.isRequired,
};

export default DislikedUsers;
