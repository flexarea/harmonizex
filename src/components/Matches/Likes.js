// components/Matches/Likes.js

import PropTypes from 'prop-types';
import Image from 'next/image';

function Likes({ matches, onMatchSelect }) {
  return (
    <div>
      {matches.map((match) => (
        <div key={match.id} onClick={() => onMatchSelect(match.id)}>
          <Image 
            src={match.avatarUrl} 
            alt={`${match.name}'s avatar`} 
            width={100} 
            height={100} 
            layout="fixed" 
          />
          <p>{match.name}</p>
        </div>
      ))}
    </div>
  );
}

Likes.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onMatchSelect: PropTypes.func.isRequired,
};

export default Likes;
