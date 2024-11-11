import { useEffect } from 'react';

/*
TODO: error handling, login UI, ...
 * */


import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    window.location.href = '/api/spotify/auth';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        Login with Spotify
      </button>
    </div>
  );
}

