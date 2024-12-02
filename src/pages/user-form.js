import React from "react";
import UserForm from "../components/UserForms";
import { Box, Typography } from "@mui/material";

const UserFormPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="20px"
    >
      <Typography variant="h4" align="center" gutterBottom>
        Fill out your information
      </Typography>
      <UserForm />
    </Box>
  );
};

export default UserFormPage;

