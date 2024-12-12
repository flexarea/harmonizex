import { Typography, Box } from "@mui/material";
import Matches from "../components/match_component";

const MatchesPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography 
        variant="h2" 
        align="center" 
        sx={{ 
          marginTop: '10vh', 
          marginBottom: 4
        }}
      >
       Your Matches
      </Typography>
      <Matches />
    </Box>
  );
};

export default MatchesPage;
