import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";

const scope = "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read";
export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: {
				params: { scope },
			}
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === "spotify") {
				return profile?.email && profile?.id;
			}
			return false //deny sign-in for other providers 
		},
		async jwt({ token, account, user, profile }) {
			//initial sign-in
			if (account && user) {
				token.accessToken = account.access_token
				token.refreshToken = account.refresh_token
				token.spotifyId = profile.id
				token.accessTokenExpires = account.expires_at * 1000
			}
		},
		async session({ session, token }) {
			// Add user id to the session
			// eslint-disable-next-line no-param-reassign
			session.user.id = token.sub
			return session;
		},

	},
	pages: {
		signIn: "/login/signIn"
	}
}

export default NextAuth(authOptions)


