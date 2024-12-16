/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Container, Box, Typography, createTheme, ThemeProvider, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "30px",
  padding: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    height: "63vh",
  },
  [theme.breakpoints.up('sm')]: {
    height: "60vh",
  },

  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 20%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 25%, 0.08) 0px 15px 35px -5px',

  }),
}));

function SpotifyPlayer({ trackId }) {
  return (
    <SongBox>
      <StyledPlayerContainer>

        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          sx={{
            borderRadius: '12px',
            display: "block"
          }}
        />
      </StyledPlayerContainer>
    </SongBox>
  );
}

const SongBox = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    maxWidth: "100%",
    height: "80px",
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: "70%",
    height: "80px",
  },

}));

const StyledPlayerContainer = styled(Box)(() => ({
  borderRadius: '12px',
  overflow: 'hidden',
  background: 'transparent',
  height: '100%',
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
    top: { sm: "45%" },
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 431,
      md: 750,
      lg: 1280,
      xl: 1920,
      xxl: 2000,
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



  const updateInteraction = async (targetUserId, liked) => {
    try {

      const payload = {
        targetUserId,
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
    router.push("/matches");
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
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 15 }}>
        <Typography variant="h4" gutterBottom>
          No more Users to swipe on 😢
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
          Go to your Matches
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
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          padding: 2,
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
          top: "50%",
          height: "auto",

          [theme.breakpoints.up('md')]: { //    
            maxWidth: "md",
            minHeight: "90vh",
            top: "48%"
          },
          [theme.breakpoints.down('sm')]: { //   
            maxWidth: "sm",
            top: "50%"
          },
        })}
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
            sx={() => ({
              marginBottom: 1,
              boxShadow: "15px 15px 15px rgba(0, 0, 0, 0.3)",
              width: "60px",
              height: "60px"
            })}
          />
          <Typography
            sx={{ marginBottom: "20px", fontSize: "17px" }}
            variant="h5"
          >
            {userToSwipe.name}
          </Typography>
        </Box>

        <StyledBox>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "white" }}>
            Favorite Songs
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 1, alignItems: "center" }}>
            {songs.map((song) => (
              // eslint-disable-next-line react/jsx-key
              <SpotifyPlayer trackId={song.id} />
            ))}

          </Box>

        </StyledBox>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            bottom: "0.5px",
            left: "50%",
            transform: "translateX(-50%)",
            [theme.breakpoints.down('sm')]: {
            },
            marginTop: "16px",
          }}
        >

          <IconButton
            color="secondary"
            aria-label="Not Interested"
            onClick={handleDislike}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 0, 0.1)',
              }
            }}
          >
            <CancelIcon
              fontSize="large"
              sx={(theme) => ({
                color: "yellow",
                [theme.breakpoints.down('sm')]: {
                  width: "60px",
                  height: "60px",
                  fontSize: "2rem",
                },
              })}
            />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Interested"
            onClick={handleDislike}
          >
            <Favorite
              fontSize="large"
              onClick={handleLike}
              sx={(theme) => ({
                color: "red",
                [theme.breakpoints.down('sm')]: {
                  width: "60px",
                  height: "60px",
                  fontSize: "2rem"
                },
              })}
            />
          </IconButton>
        </Box>

      </Container>
    </ThemeProvider >
  );
}

export default Swipe;

