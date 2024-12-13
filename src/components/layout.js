import { LabelOff } from "@mui/icons-material"
import UserProfile from "./UserProfile"
import { Box, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

function Layout({ children, userInfo }) {

  const router = useRouter()
  const { data: session } = useSession()
  const handleClick = () => {
    if (!session) {
      router.push('/login/SignIn')
    }
    router.push(`/swipeboard/${session?.user?.id}`)
  }
  return (
    <div>
      <Box sx={{
        display: "flex",
        position: "fixed",
        top: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
      }}>
        <Typography
          variant="h2"
          sx={{
            marginRight: "16px"
          }}
          onClick={handleClick}
        >
          harmonize
        </Typography>
      </Box>
      <Box sx={{
        display: "flex",
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
      }}>
        <UserProfile userInfo={userInfo} />
      </Box>
      {children}
    </div>
  )
}

export default Layout
