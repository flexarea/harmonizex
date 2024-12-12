import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Container, Box, Typography, createTheme, ThemeProvider, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "30px",
  padding: theme.spacing(2),

  height: "48vh",
  backgroundColor: "#99d1d1",
  boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.7) 0px 15px 35px -5px",
}));

const SongBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "30px",
  width: "350px",
  height: "42px",
  padding: theme.spacing(1),
  gap: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.7) 0px 15px 35px -5px",
}));

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#FF0000",
    },
    background: {
      default: "#0d1117",
      paper: "#161b22",
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

  const updateInteraction = async (target_user_id, liked) => {
    try {

      const payload = {
        target_user_id,
        liked,
      };
      console.log("Payload being sent:", JSON.stringify(payload, null, 2));

      const res = await fetch("/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Failed to update interaction:", await res.json());
      }
      else {
        console.log("Interaction updated successfully");
      }
    } catch (error) {
      console.error("Error updating interaction:", error);
    }
  };

  const handleBackToMain = () => {
    router.push("/swipeboard");
  };

  const handleLike = async () => {
    if (userToSwipe) {
      await updateInteraction(userToSwipe.user_id, true); // Like
    }
    moveToNext();
  };

  const handleDislike = async () => {
    if (userToSwipe) {
      await updateInteraction(userToSwipe.user_id, false); // Dislike
    }
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex + 1 < usersToSwipe.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setNoMoreMatches(true);
    }
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
          //justifyContent: "center",
          height: "90vh",
          padding: 2,
          position: "absolute",  // Add this
          top: "40%",           // Add this
          left: "50%",          // Add this
          transform: "translate(-50%, -50%)", // Add this
          margin: 0,            // Add this
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <Avatar
            src={userToSwipe.profile_pic || "/default-avatar.png"}
            alt={`${userToSwipe.name}'s avatar`}
            sx={{
              width: 65,
              height: 65,
              marginBottom: 1,
              boxShadow: "15px 15px 15px rgba(0, 0, 0, 0.3)",
            }}
          />
          <Typography
            sx={{ marginBottom: "25px", fontSize: "17px" }}
            variant="h5" gutterBottom
          >
            {userToSwipe.name}
          </Typography>
        </Box>

        <StyledBox>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
            Favorite Songs
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2, alignItems: "center" }}>
            {songs.map((song, index) => (
              <SongBox key={index}>
                <Avatar
                  src={song.album?.images[0]?.url || "/default-album.png"}
                  alt={song.name || "Unknown Track"}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography
                  sx={{ color: "black" }}
                  variant="body1">
                  {song.name || "Unknown Track"}
                </Typography>
              </SongBox>
            ))}

          </Box>

        </StyledBox>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: "0.5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleDislike}
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              fontSize: "2rem",
              marginRight: 2,
              background: "#ff575a"
            }}
          >
            👎
          </Button>
          <Button
            variant="contained"
            onClick={handleLike}
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              fontSize: "2rem",
              marginLeft: 2,
              background: "#6cf257"
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
