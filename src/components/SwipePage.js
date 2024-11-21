import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MatchCard from "./swipeCard";
import styles from "../styles/SwipePage.module.css";

function Swipe() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([]); // Track liked song IDs
  const [, setDislikes] = useState([]);
  // Add state to track like action
  const [justLiked, setJustLiked] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [actionHistory, setActionHistory] = useState([]); // Action history stack
  const [noMoreMatches, setNoMoreMatches] = useState(false);
  // const [debug, setDebug] = useState(false);

  const usersToSwipe = [
    {
      id: "2",
      name: "John Smith",
      age: 30,
      bio: "I listen to music from League of Legends.",
      avatarUrl:
        "https://images.unsplash.com/photo-1725902380927-081e7400b920?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      songId: "song1", // song ID for this match
      songs: [{ songId: "song1", name: "Bubbles", url: "/audio/bubbles.mp3" }],
    },
    {
      id: "3",
      name: "Emma Brown",
      age: 27,
      bio: "Coffee lover and travel enthusiast.",
      avatarUrl:
        "https://images.unsplash.com/photo-1728646995795-2e37aa8cb13e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      songId: "song2", // song ID for this match
      songs: [
        { songId: "song1", name: "Daft Punk", url: "/audio/daftpunk.mp3" },
      ],
    },
  ];

  const userToSwipe = usersToSwipe[currentIndex];

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
    if (justLiked) {
      // console.log("Checking hasLikedSong after like:", {
      //   currentSongId: userToSwipe.songId,
      //   likes,
      //   hasLikedSong: likes.includes(userToSwipe.songId),
      // });
      setJustLiked(false);
    }
  }, [likes, justLiked, userToSwipe.songId]);

  useEffect(() => {
    // Reset the index to 0 if no more matches are available
    if (noMoreMatches) {
      setCurrentIndex(0);
    }
  }, [noMoreMatches]);

  // update onMatchCardLike/Dislike handlers
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

  // update handleUndo
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

  // a random song from the user’s list of songs
  const randomSong =
    userToSwipe.songs[Math.floor(Math.random() * userToSwipe.songs.length)];
  // console.log("Audio URL:", randomSong?.url);

  // log the exact values being compared
  // console.log({
  //   likesArray: likes,
  //   currentSongId: userToSwipe.songId,
  //   songIdFromUser: userToSwipe.songs?.[0]?.id, // Check if this is what we should be comparing
  // });

  // debug logs above hasLikedSong check
  // console.log("userToSwipe:", userToSwipe); // entire user object
  // console.log("songId type:", typeof userToSwipe.songId); // data type
  // console.log("likes array:", likes); // likes array content
  // console.log(
  //   "includes check:",
  //   likes.some((id) => id === userToSwipe.songId)
  // ); // Alternative check

  // onLike function
  const onLike = () => {
    const songToLike = userToSwipe.songId;
    // console.log("Liking song:", songToLike);

    setLikes((prev) => {
      // console.log("Previous likes:", prev);
      const newLikes = [...prev, songToLike];
      // console.log("New likes:", newLikes);
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

  // hasLikedSong check for rendering
  const hasLikedSong = likes.includes(userToSwipe.songId);

  // debug logging
  // console.log("Current state:", {
  //   songToSwipe: userToSwipe.songId,
  //   currentLikes: likes,
  //   hasLikedSong,
  // });

  // debug logging
  // console.log({
  //   currentUserSongId: userToSwipe.songId,
  //   likesArray: likes,
  //   hasLikedSong,
  // });

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
        // <MatchCard user={userToSwipe} onLike={onLike} onDislike={onDislike} />
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
