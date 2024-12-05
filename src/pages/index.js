// pages/index.js

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // or your authentication hook
import MainPage from '../components/MainPage';

function IndexPage() {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      async function fetchCurrentUser() {
        try {
          const res = await fetch('/api/currentUser');
          if (res.ok) {
            const data = await res.json();
            setCurrentUser(data.currentUser);
          } else {
            // Handle error, e.g., redirect to login
            console.error('Failed to fetch current user');
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }

      fetchCurrentUser();
    }
  }, [status]);

  if (status === 'loading' || !currentUser) {
    return <div>Loading...</div>;
  }

  if (!session) {
    // Redirect to login page if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return <MainPage currentUser={currentUser} />;
}

export default IndexPage;
