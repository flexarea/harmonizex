import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Container, Box, Typography, createTheme, ThemeProvider, styled } from "@mui/material";
import { Favorite, HeightTwoTone } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "30px",
  padding: theme.spacing(2),

  height: "80vh",
  [theme.breakpoints.down('sm')]: { // for mobile devices
    height: "60vh",
  },
  [theme.breakpoints.up('sm')]: { // for tablets and up
    height: "650px",
  },

  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 20%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 25%, 0.08) 0px 15px 35px -5px',

  }),
}));

const SpotifyPlayer = ({ trackId }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width="400px"
      height="80px"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
      style={{ borderRadius: '12px' }}
    />
  );
};

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

  [theme.breakpoints.down('sm')]: { // for mobile devices
    width: "230px",
    height: "27px",
  },
  [theme.breakpoints.up('md')]: { // for tablets and up
    width: "350px",
  },

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
    top: { sm: "45%" },           // Add this
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
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 4 }}>
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
          //justifyContent: "center",
          padding: 2,
          position: "absolute",  // Add this
          left: "50%",          // Add this
          transform: "translate(-50%, -50%)", // Add this

          [theme.breakpoints.up('md')]: { // for tablets and up
            maxWidth: "md",
            maxHeight: "90vh",
            top: "40%"
          },
          [theme.breakpoints.down('sm')]: { // for tablets and up
            maxWidth: "sm",
            top: "40%"
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
            sx={(theme) => ({
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
            {songs.map((song, index) => (
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
            width: "100%",
            maxWidth: "400px",
            [theme.breakpoints.down('sm')]: { // for mobile devices
            },
            marginTop: "80px",

          }}
        >
          <CancelIcon
            fontSize="large"
            onClick={handleDislike}
            sx={(theme) => ({
              marginRight: 2,
              color: "yellow",
              [theme.breakpoints.down('sm')]: { // for mobile devices
                width: "60px",
                height: "60px",
                fontSize: "2rem",
              },
            })}
          />

          <Favorite
            fontSize="large"
            onClick={handleDislike}
            sx={(theme) => ({
              marginRight: 2,
              color: "red",
              [theme.breakpoints.down('sm')]: { // for mobile devices
                width: "60px",
                height: "60px",
                fontSize: "2rem"
              },
            })}
          />
        </Box>

      </Container>
    </ThemeProvider >
  );
}

export default Swipe;

