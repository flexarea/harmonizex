// components/Matches/MatchesList.js

import React from 'react';
import PropTypes from 'prop-types';
import MatchItem from './MatchItem'; // Import the MatchItem component for displaying individual matches

function MatchesList({ matches }) {
  return (
    <ul className="matches-list">
      {matches.map((match) => (
        <li key={match.id}>
          <MatchItem match={match} />
        </li>
      ))}
    </ul>
  );
}

MatchesList.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
      // Add any other match properties as needed
    })
  ).isRequired,
};

export default MatchesList;
