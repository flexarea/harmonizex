import React, { useState, useEffect } from "react";

function MusicDisplay() {
  // mock data

  const [playlists, setPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  // mock data
  useEffect(() => {
    const mockPlaylists = [
      { id: "1", name: "Chill Vibes" },
      { id: "2", name: "Workout Energy" },
      { id: "3", name: "Cafe Music" },
    ];

    const mockTopArtists = [
      { id: "1", name: "Artist One" },
      { id: "2", name: "Artist Two" },
      { id: "3", name: "Artist Three" },
    ];

    // fetch mock
    setPlaylists(mockPlaylists);
    setTopArtists(mockTopArtists);
  }, []);
  return (
    <div>
      <h4>Top Artists</h4>
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
      <div>
        <h4>Playlists</h4>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MusicDisplay;
