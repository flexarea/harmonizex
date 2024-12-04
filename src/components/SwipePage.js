import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MatchCard from "./swipeCard";
import styles from "../styles/SwipePage.module.css";

function Swipe() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([]); // Track liked song IDs
  const [, setDislikes] = useState([]);
  const [justLiked, setJustLiked] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [actionHistory, setActionHistory] = useState([]); // Action history stack
  const [noMoreMatches, setNoMoreMatches] = useState(false);
  const [usersToSwipe, setUsersToSwipe] = useState([]); // New state for users to swipe
  const [userToSwipe, setUserToSwipe] = useState(null); // Current user to swipe

  // Fetch candidates from API when component mounts
  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch('/api/getCandidates?userId=1&minScore=3'); // Adjust userId as needed
        const data = await res.json();
        if (res.ok) {
          setUsersToSwipe(data.candidates);
          setCurrentIndex(0);
        } else {
          console.error('Error fetching candidates:', data.error);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    }

    fetchCandidates();
  }, []);

  // Update userToSwipe when currentIndex or usersToSwipe changes
  useEffect(() => {
    if (usersToSwipe.length > 0 && currentIndex < usersToSwipe.length) {
      const user = usersToSwipe[currentIndex];

      // Construct songs array from song_1, song_2, song_3
      const songs = [];

      if (user.song_1) {
        songs.push({
          songId: user.song_1,
          name: user.song_1,
          url: `/audio/${user.song_1}.mp3`,
        });
      }
      if (user.song_2) {
        songs.push({
          songId: user.song_2,
          name: user.song_2,
          url: `/audio/${user.song_2}.mp3`,
        });
      }      }
      if (user.song_3) {
        songs.push({
          songId: user.song_3,
          name: user.song_3,
          url: `/audio/${user.song_3}.mp3`,
        });
      }

      // Set avatarUrl, assuming user.avatar_url is available, else set default
      const avatarUrl = user.avatar_url || '/default-avatar.png';

      setUserToSwipe({
        ...user,
        songs,
        songId: songs.length > 0 ? songs[0].songId : null, // Use first song's ID
        avatarUrl,
      });
    } else {
      setUserToSwipe(null);
      setNoMoreMatches(true);
    }
  , [usersToSwipe, currentIndex]);

  // ... rest of your component code remains the same ...

  return (
    <div className={styles.swipePage}>
      {/* ... your rendering logic ... */}
    </div>
  );
}

export default Swipe;
