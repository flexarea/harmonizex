import { signOut } from 'next-auth/react';


export default function MatchBoard({ sessionData: session, data, isLoading, error, status }) {


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
