import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function MatchBoard() {
  const { data: session, status } = useSession({ refetchOnWindowFocus: true });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/spotify/data");
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login/signIn");
            return;
          }
          throw new Error("Failed to fetch data");
        }
        const fetchedData = await response.json();
        // console.log(fetchedData)
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (status === "loading") {
    return <div>Loading session</div>;
  }

  if (isLoading) {
    return <div>Loading Top Artits ...</div>;
  }

  if (!session) {
    return <div> Please sign in to view </div>;
  }

  return (
    <div>
      <p>
        Signed in as {session.user.email}{" "}
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </p>
      {data?.items ? (
        data.items.map((artist) => (
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
