import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function MatchBoard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error) {
        setError(error.message);
        // Redirect to login if unauthorized
        if (response.status === 401) {
          router.push('/login');
        }
      }
    };

    fetchData();
  }, [router]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>

      {data.items && data.items.map(artist => (
        <div key={artist.id}>
          <h3>{artist.name}</h3>
        </div>
      ))}
    </div>
  );
}
