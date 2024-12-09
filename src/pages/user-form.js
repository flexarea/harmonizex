import React, { useEffect } from "react";
import UserForm from "../components/UserForms";
import { Box, Typography } from "@mui/material";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";


const UserFormPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {

    if (session && !session?.user?.newUser) {
      router.push(`swipeboard/${session.user.id}`)
    }
  }, [session])

  if (!session?.user?.newUser) return null

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
  )
};

export default UserFormPage;

