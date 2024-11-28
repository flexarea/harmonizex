import { Avatar } from "@mui/material"
import PropTypes from 'prop-types'

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
UserProfile.propTypes = {
  userInfo: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string
      })
    )
  })
}

export default UserProfile

