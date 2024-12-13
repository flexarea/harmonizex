import { Avatar, Box, MenuItem, MenuList, Paper, Popper, Stack } from "@mui/material";
import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { createTheme, ThemeProvider } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function UserProfile({ userInfo }) {
  const router = useRouter();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 370,
        md: 760,
        lg: 1280,
        xl: 1920,
        xxl: 2000,
      },
    },
  });

  // Fallback image if userInfo is unavailable or does not contain profile image
  const profileImage = userInfo?.images?.[0]?.url || '../../../ourImages/prof.png'
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { data: session } = useSession();

  // Toggle dropdown menu
  const handleToggle = () => {
    if (session) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  // Close dropdown menu
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // Handle keyboard interactions with the menu
  function handleListKeyDown(event) {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // Navigate to Matches page
  const handleMatchesClick = () => {
    router.push("/matches");
  };

  // Restore focus to the button when the menu closes
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Matches Button */}
            <WhatshotIcon
              fontSize="large"
              sx={(theme) => ({
                marginTop: "10px",
                marginRight: "10px",
                color: "#ff4e26",
                cursor: "pointer",
                "&:hover": { color: "#ff7043" },
                [theme.breakpoints.up("sm")]: { fontSize: "large" },
                [theme.breakpoints.up("md")]: { fontSize: "2rem" },
              })}
              onClick={handleMatchesClick}
              tabIndex={0} // For keyboard focus
              aria-label="Go to Matches"
            />

            {/* Profile Avatar */}
            <Avatar
              alt="user avatar"
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              src={profileImage}
              sx={{
                width: { md: 65, sm: 40 },
                height: { md: 65, sm: 40 },
                cursor: "pointer",
                "&:hover": { boxShadow: "0 4px 10px rgba(0,0,0,0.25)" },
              }}
            />
          </Box>

          {/* Dropdown Menu */}
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          router.push("/profile"); // Navigate to Profile
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleClose}>My Account</MenuItem>
                      <MenuItem
                        onClick={() =>
                          signOut({
                            callbackUrl: "/login/SignIn",
                          })
                        }
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </ThemeProvider>
  );
}

export default UserProfile;
