/* eslint-disable no-console */
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserForm from "../components/UserForms";

function UserFormPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !session?.user?.newUser) {
      console.log("current session", session);
      router.push(`swipeboard/${session.user.id}`);
    }
  }, [router, session]);

  if (!session?.user?.newUser) return null;
  const userId = session?.user?.id;

  console.log(userId);

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
      <UserForm userId={userId} />
    </Box>
  );
}

export default UserFormPage;
