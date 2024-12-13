import UserProfile from "./UserProfile";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Layout({ children, userInfo }) {
  const router = useRouter();
  const { data: session } = useSession();

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
          top: 16,
          left: 16,
          right: 16,
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "8px",
          background: "transparent",
        }}
      >
        {/* Harmonize Title */}
        <Typography
          variant="h6" // Smaller size
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "white", // Default color white
            textTransform: "",
            "&:hover": {
              color: "#ff7043", // Orange on hover
            },
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
          }}
          onClick={handleClick}
        >
          Harmonize
        </Typography>

        {/* User Profile */}
        <UserProfile userInfo={userInfo} />
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          marginTop: "80px", // Prevent overlap with fixed header
          padding: "16px",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default Layout;
