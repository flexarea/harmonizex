import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import User from "../../../../models/User"

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
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login/SignIn',
	},
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === "spotify" && profile?.id) {
				return true
			}
			return false //deny sign-in for other providers 
		},
		async jwt({ token, account, user }) {
			// If this is a new account, replace the existing token
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.accessTokenExpires = account.expires_at * 1000; // Convert to ms
			}
			//initial sign-in
			if (user) {
				let localUser = await User.query().findOne("spotifyId", user.id)
				if (!localUser) {
					//create new user record in db
					localUser = await User.query().insertAndFetch({
						spotifyId: user.id,
						name: user.name,
						email: user.email,
						profile_pic: user.images?.[0]?.url
					})
				}
				//add id to token
				token.user.id = localUser.id;
			}
			return token
		},
		async session({ session, token }) {
			// Add user id to the session
			session.user = {
				...session.user,
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
			}
			return session;
		},

	},
}

export default NextAuth(authOptions)


