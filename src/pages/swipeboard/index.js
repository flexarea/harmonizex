import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';


export default function MatchBoard({ sessionData: session, error, status }) {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)


  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return
    }
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/spotify/data?type=artists');
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login/signIn")
            return
          }
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, [session]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (status === "loading") {
    return <div>Loading session</div>
  }

  if (isLoading) {
    return <div>Loading Top Artits ...</div>
  }

  if (!session) {
    return <div> Please sign in to view </div>
  }

  return (

    <div>
      <p>
        Signed in as {session.user.email}{' '}
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </p>
      {data?.items ? (
        data.items.map(artist => (
          <div key={artist.id}>
            <h3>{artist.name}</h3>
          </div>
        ))
      ) : (
        <div>No artists found</div>
      )}
    </div>
  );

}
