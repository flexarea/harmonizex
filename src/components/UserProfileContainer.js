import UserProfilePage from './UserProfile';

function UserProfileContainer() {
  const currentUser = {
    id: '1',
    name: 'Jane Doe',
    age: 28,
    bio: 'Love hiking and outdoor adventures!',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  return (
    <UserProfilePage currentUser={currentUser} />
  );
}

export default UserProfileContainer;
