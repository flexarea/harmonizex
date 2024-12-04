import { Avatar } from "@mui/material"
<<<<<<< HEAD
import PropTypes from 'prop-types'

=======
>>>>>>> main
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
<<<<<<< HEAD
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

=======

export default UserProfile
>>>>>>> main
