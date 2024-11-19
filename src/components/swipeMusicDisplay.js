import React, { useState, useEffect } from 'react';
import styles from '../styles/swipeMusicDisplay.module.css';

function MusicDisplay() {
  // mock data
  const mockPlaylists = [
    { id: '1', name: 'Chill Vibes' },
    { id: '2', name: 'Workout Energy' },
    { id: '3', name: 'Cafe Music' }
  ];

  const mockTopArtists = [
    { id: '1', name: 'Artist One' },
    { id: '2', name: 'Artist Two' },
    { id: '3', name: 'Artist Three' }
  ];

  const [playlists, setPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  // mock data
  useEffect(() => {
    // fetch mock
    setPlaylists(mockPlaylists);
    setTopArtists(mockTopArtists);
  }, []);

  return (
    <div className={styles.musicDisplay}>
      <h4>Top Artists</h4>
      <ul>
        {topArtists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
      <h4>Playlists</h4>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MusicDisplay;

