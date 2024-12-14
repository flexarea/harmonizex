import UserProfile from "./UserProfile";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";
import Image from "next/image";

function Layout({ children, userInfo }) {
  const router = useRouter();
  const { data: session } = useSession();
  const theme = useTheme()

  // Handle click on the harmonize title
  const handleClick = () => {
    if (!session) {
      router.push("/login/SignIn"); // Redirect to login if not signed in
    } else {
      router.push(`/swipeboard/${session?.user?.id}`); // Redirect to swipeboard
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 16,
          right: 16,
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "8px",
          background: "transparent",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1} // Adds spacing between logo and text
        >
          <Box sx={{ position: 'relative', width: '24px', height: '24px' }}>
            <Image
              src="/ourImages/logo.png"
              alt="Harmonize Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
          <Typography
            variant="h5" // Adjusted to make it larger (was "h6")
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              color: theme.palette.text.primary, // Default color white
              textTransform: 0, // Added uppercase for style
              "&:hover": {
                color: "#ff7043", // Orange on hover
              },
              fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" }, // Increased font sizes
            }}
            onClick={handleClick}
          >
            Harmonize
          </Typography>
        </Stack>
        {/* User Profile */}
        <UserProfile userInfo={userInfo} />
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          padding: "16px",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default Layout;
