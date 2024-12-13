import { Avatar, Box } from "@mui/material"
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { signOut, useSession } from 'next-auth/react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { createTheme, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";

function UserProfile({ userInfo }) {

  const router = useRouter()
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

  const profileImage = userInfo?.images?.[0].url || 'public//profpic2.jpg'
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { data: session } = useSession();

  const handleToggle = () => {
    if (session) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  // Navigate to the matches page
  const handleMatchesClick = () => {
    router.push("/matches");
  };

  // return focus to the button when we transitioned from !open -> open
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
              flexDirection: "row"
            }}
          >
            <WhatshotIcon
              fontSize="large"
              sx={(theme) => ({
                marginTop: "25px",
                marginRight: "40px",
                color: "#ff4e26",
                [theme.breakpoints.up('sm')]: { fontSize: "large", marginTop: "25px", marginRight: "10px" },
                [theme.breakpoints.up('md')]: { fontSize: "2rem", marginTop: "25px", marginRight: "10px" },
              })}
              onClick={handleMatchesClick} // Add click handler
            />

            <Avatar
              alt="user avatar"
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              src={profileImage}
              sx={{
                width: { md: 65, sm: 40 },
                height: { md: 65, sm: 40 },
                marginRight: "10px",
                marginTop: "10px"
              }}
            />
          </Box>
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
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={() => signOut({
                        callbackUrl: '/login/SignIn'
                      })}>Logout</MenuItem>
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

export default UserProfile

