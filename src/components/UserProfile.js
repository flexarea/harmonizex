import { Avatar } from "@mui/material"
function UserProfile({ userInfo }) {
  const profileImage = userInfo?.images?.[0].url || 'public//profpic2.jpg'
  return (
    <Avatar
      alt="user avatar"
      src={profileImage}
      sx={{ width: 40, height: 40 }}
    />
  )
}

export default UserProfile
