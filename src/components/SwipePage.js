import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Container, Box, Typography, createTheme, ThemeProvider, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Use theme background paper color for dark mode
  borderRadius: "8px",
  padding: theme.spacing(2),
  boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.7) 0px 15px 35px -5px",
}));

const SongBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  padding: theme.spacing(1),
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper, // Use theme background paper color for dark mode
  boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.7) 0px 15px 35px -5px",
}));

const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#2196f3", // Blue color for like button
    },
    secondary: {
      main: "#FF0000", // Red color for dislike button
    },
    background: {
      default: "#0d1117", // Dark background color
      paper: "#161b22", // Slightly lighter dark background for boxes
    },
  },
  typography: {
    h3: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "1.5rem",
    },
    body1: {
      textAlign: "center",
      margin: "10px 0",
    },
    h6: {
      textAlign: "center",
      fontSize: "1.5rem",
      color: " #bdb5e7 ",
    },
  },
});

function Swipe() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usersToSwipe, setUsersToSwipe] = useState([]);
  const [userToSwipe, setUserToSwipe] = useState(null);
  const [noMoreMatches, setNoMoreMatches] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch("/api/getCandidates");
        const data = await res.json();
        if (res.ok) {
          setUsersToSwipe(data);
          setCurrentIndex(0);
        } else {
          console.error("Error fetching candidates:", data.error);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }
    fetchCandidates();
  }, []);

  useEffect(() => {
    async function fetchSongs() {
      if (usersToSwipe.length > 0 && currentIndex < usersToSwipe.length) {
        const user = usersToSwipe[currentIndex];
        setUserToSwipe(user);

        const songIds = [user.song_1, user.song_2, user.song_3, user.song_4, user.song_5];
        const songDetails = await Promise.all(
          songIds.map(async (songId) => {
            if (songId) {
              try {
                const res = await fetch(`/api/spotify/data?type=track&track_id=${songId}`);
                return res.ok ? await res.json() : null;
              } catch (error) {
                console.error("Error fetching song details:", error);
                return null;
              }
            }
            return null;
          })
        );
        setSongs(songDetails.filter((song) => song !== null));
      } else {
        setUserToSwipe(null);
        setSongs([]);
      }
    }
    fetchSongs();
  }, [usersToSwipe, currentIndex]);

  const moveToNext = () => {
    if (currentIndex < usersToSwipe.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setNoMoreMatches(true);
    }
  };

  const handleBackToMain = () => {
    router.push("/swipeboard");
  };

  if (noMoreMatches || usersToSwipe.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          No more matches available
        </Typography>
        <Typography variant="body1">
          Check back later or update your preferences to see more profiles.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToMain}
          sx={{ marginTop: 2 }}
        >
          Back to Main Page
        </Button>
      </Container>
    );
  }

  if (!userToSwipe) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          padding: 2,
          backgroundColor: theme.palette.background.default, // Apply theme background color
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Avatar
            src={userToSwipe.profile_pic || "/default-avatar.png"}
            alt={`${userToSwipe.name}'s avatar`}
            sx={{
              width: 100,
              height: 100,
              marginBottom: 3,
              boxShadow: "15px 15px 15px rgba(0, 0, 0, 0.3)",
            }}
          />
          <Typography variant="h3" gutterBottom>
            {userToSwipe.name}
          </Typography>
        </Box>

        <StyledBox>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Favorite Songs
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {songs.map((song, index) => (
              <SongBox key={index}>
                <Avatar
                  src={song.album?.images[0]?.url || "/default-album.png"}
                  alt={song.name || "Unknown Track"}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="body1">{song.name || "Unknown Track"}</Typography>
              </SongBox>
            ))}
          </Box>
        </StyledBox>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={moveToNext}
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              fontSize: "2rem",
              marginRight: 2,
            }}
          >
            👎
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={moveToNext}
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              fontSize: "2rem",
              marginLeft: 2,
            }}
          >
            👍
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Swipe;
