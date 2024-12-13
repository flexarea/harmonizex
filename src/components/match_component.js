import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, styled } from "@mui/material";

const MatchCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: 600,
  marginBottom: theme.spacing(2),
  position: "relative",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
}));

const Email = styled(Typography)(({ theme }) => ({
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  "&:hover": {
    opacity: 1,
  },
  [`${MatchCard}:hover &`]: {
    opacity: 1,
  },
}));

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      console.log("fetching matches");
      const matchesData = await fetch("/api/user/getMatches");
      const matchesJson = await matchesData.json();
      setMatches(matchesJson);
      console.log("matches:", matchesJson);
    };
    fetchMatches();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
        backgroundColor: "#0d1117",
      }}
    >
      {matches.length > 0 ? (
        matches.map((match) => (
          <MatchCard key={match.user_id}>
            <Avatar
              src={match.profile_pic || "/default-avatar.png"}
              alt={`${match.name}'s avatar`}
              sx={{ width: 60, height: 60 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {match.name}
              </Typography>
              <Email variant="body2" sx={{ color: "text.secondary" }}>
                {match.email}
              </Email>
            </Box>
          </MatchCard>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          No matches found
        </Typography>
      )}
    </Box>
  );
};

export default Matches;
