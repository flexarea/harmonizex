import { Avatar, Box, MenuItem, MenuList, Paper, Popper, Stack } from "@mui/material";
import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import { signOut, useSession } from "next-auth/react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { createTheme, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";

function UserProfile({ userInfo }) {
  const router = useRouter();

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 391,
        md: 760,
        lg: 1280,
        xl: 1920,
        xxl: 2000,
      },
    },
  });

  const profileImage = userInfo?.images?.[0]?.url || "../../public/ourImages/prof.png";
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
    if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // Handle keyboard interactions
  function handleListKeyDown(event) {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // Navigate to matches page
  const handleMatchesClick = () => {
    router.push("/matches");
  };

  // Return focus to the button when menu closes
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
            }}
          >
            {/* Matches Icon */}
            <WhatshotIcon
              fontSize="large"
              sx={(theme) => ({
                marginTop: "25px",
                marginRight: "40px",
                color: "#ff4e26",
                cursor: "pointer",
                "&:hover": { color: "#ff7043" },
                [theme.breakpoints.down('sm')]: { // for mobile devices
                  marginTop: "20px",
                  marginRight: "15px",
                  fontSize: "large"
                },

              })}
              onClick={handleMatchesClick}
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
              sx={(theme) => ({
                width: { md: 65, sm: 40 },
                height: { md: 65, sm: 40 },
                marginRight: "10px",
                marginTop: "10px",
                cursor: "pointer",
                [theme.breakpoints.down('sm')]: { // for mobile devices
                  marginRight: "1%",
                  fontSize: "large"
                },
              })}
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
                      {/* Profile Menu Item */}
                      <MenuItem onClick={handleClose}>
                        Profile
                      </MenuItem>

                      {/* My Account Menu Item */}
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
                        }}
                      >
                        My Account
                      </MenuItem>

                      {/* Logout Menu Item */}
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
