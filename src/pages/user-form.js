// import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSession } from 'next-auth/react';
import UserForm from "../components/UserForms";
// import { useRouter } from "next/router";


function UserFormPage(){
  const { data: session } = useSession()
  // const router = useRouter()

  // useEffect(() => {

  //   if (session && !session?.user?.newUser) {
  //     console.log("current session", session)
  //     router.push(`swipeboard/${session.user.id}`)
  //   }
  // }, [session])

  // if (!session?.user?.newUser) return null
  const userId = session?.user?.id


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
      <UserForm user_id={userId} />
    </Box>
  );
}
export default UserFormPage;

