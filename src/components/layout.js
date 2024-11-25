import { LabelOff } from "@mui/icons-material"
import UserProfile from "./UserProfile"
import { Box } from "@mui/material"

function Layout({ children }) {
  return (
    <div>
      <Box sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
      }}>
        <UserProfile />
      </Box>
      {children}
    </div>
  )
}

export default Layout
