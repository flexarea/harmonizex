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
        const res = await fetch("/api/getCandidates"); // Adjust userId as needed
        const data = await res.json();
        if (res.ok) {
          //setUsersToSwipe(data.candidates);
          //setCurrentIndex(0);
          console.log(data)
        } else {
          console.error("Error fetching candidates:", data.error);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
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
      }
      if (user.song_3) {
        songs.push({
          songId: user.song_3,
          name: user.song_3,
          url: `/audio/${user.song_3}.mp3`,
        });
      }

      // Set avatarUrl, assuming user.avatar_url is available, else set default
      const avatarUrl = user.avatar_url || "/default-avatar.png";

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
  }, [usersToSwipe, currentIndex]);

  const moveToNext = () => {
    if (currentIndex < usersToSwipe.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setNoMoreMatches(true); // main page if no more users
    }
  };

  const handleBackToMain = () => {
    router.push("/"); // main page
  };

  // useEffect to handle hasLikedSong check
  useEffect(() => {
    if (justLiked && userToSwipe) {
      console.log("Checking hasLikedSong after like:", {
        currentSongId: userToSwipe.songId,
        likes,
        hasLikedSong: likes.includes(userToSwipe.songId),
      });
      setJustLiked(false);
    }
  }, [likes, justLiked, userToSwipe]);

  useEffect(() => {
    // Reset the index to 0 if no more matches are available
    if (noMoreMatches) {
      setCurrentIndex(0);
    }
  }, [noMoreMatches]);

  const onMatchCardLike = () => {
    setActionHistory((prev) => [
      ...prev,
      {
        type: "matchLike",
        userId: userToSwipe.id,
        prevIndex: currentIndex,
      },
    ]);
    setCanUndo(true);
    moveToNext();
  };

  const onMatchCardDislike = () => {
    setActionHistory((prev) => [
      ...prev,
      {
        type: "matchDislike",
        userId: userToSwipe.id,
        prevIndex: currentIndex,
      },
    ]);
    setCanUndo(true);
    moveToNext();
  };

  const handleUndo = () => {
    const lastAction = actionHistory[actionHistory.length - 1];
    if (!lastAction) return;

    // revert to previous index
    setCurrentIndex(lastAction.prevIndex);

    // remove last action from history
    setActionHistory((prev) => prev.slice(0, -1));

    // update undo button visibility
    setCanUndo(actionHistory.length > 1);
  };

  if (noMoreMatches) {
    return (
      <div className={styles.noMoreMatches}>
        <h2>No more matches available</h2>
        <p>Check back later or update your preferences to see more profiles.</p>
        <button
          type="button"
          onClick={handleBackToMain}
          className={styles.noMoreMatchesButton}
        >
          Back to Main Page
        </button>
      </div>
    );
  }

  // If userToSwipe is null, show a loading state
  if (!userToSwipe) {
    return <div>Loading...</div>;
  }

  // Now it's safe to access userToSwipe.songs
  const randomSong =
    userToSwipe.songs[Math.floor(Math.random() * userToSwipe.songs.length)];
  console.log("Audio URL:", randomSong?.url);

  console.log({
    likesArray: likes,
    currentSongId: userToSwipe.songId,
    songIdFromUser: userToSwipe.songs?.[0]?.id,
  });

  console.log("userToSwipe:", userToSwipe);
  console.log("songId type:", typeof userToSwipe.songId);
  console.log("likes array:", likes);
  console.log(
    "includes check:",
    likes.some((id) => id === userToSwipe.songId)
  );

  const onLike = () => {
    const songToLike = userToSwipe.songId;
    console.log("Liking song:", songToLike);

    setLikes((prev) => {
      console.log("Previous likes:", prev);
      const newLikes = [...prev, songToLike];
      console.log("New likes:", newLikes);
      setJustLiked(true);
      return newLikes;
    });
  };

  const onDislike = () => {
    setActionHistory((prevHistory) => [
      ...prevHistory,
      { type: "dislike", userId: userToSwipe.id, prevIndex: currentIndex },
    ]);
    setDislikes((prev) => [...prev, userToSwipe.id]);
    moveToNext();
  };

  const hasLikedSong = likes.includes(userToSwipe.songId);

  console.log("Current state:", {
    songToSwipe: userToSwipe.songId,
    currentLikes: likes,
    hasLikedSong,
  });

  console.log({
    currentUserSongId: userToSwipe.songId,
    likesArray: likes,
    hasLikedSong,
  });

  return (
    <div className={styles.swipePage}>
      <div>
        <button
          type="button"
          onClick={handleUndo}
          className={styles.undoButton}
          disabled={!canUndo}
        >
          🔙 Undo
        </button>
      </div>
      {hasLikedSong ? (
        <MatchCard
          user={userToSwipe}
          onLike={onMatchCardLike} // specific match card handlers
          onDislike={onMatchCardDislike}
        />
      ) : (
        <div className={styles.matchHidden}>
          <h4>Like the song to reveal the match!</h4>
          <div className={styles.songDisplay}>
            <h5>Now playing: {randomSong.name}</h5>
            <audio key={randomSong.url} controls>
              <source src={randomSong.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <button
              type="button"
              onClick={onLike}
              className={styles.likeButton}
            >
              👍
            </button>
            <button
              type="button"
              onClick={onDislike}
              className={styles.dislikeButton}
            >
              👎
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Swipe;
