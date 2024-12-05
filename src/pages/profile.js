import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useSession } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchCurrentUser() {
        try {
          const res = await fetch('/api/currentUser');
          if (res.ok) {
            const data = await res.json();
            setCurrentUser(data.currentUser);
          } else {
            // Handle error
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }
      fetchCurrentUser();
    }
  }, [status]);

  if (status === "loading" || !currentUser) {
    return <div>Loading...</div>;
  }

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return <Profile currentUser={currentUser} />;
}

export default ProfilePage;
