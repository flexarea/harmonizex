import { createRouter } from "next-connect";
import queryString from "query-string";

const router = createRouter();

const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:3000/callback';

const generateRandomString = (length) => {
	return Math.random().toString(36).substring(2, 2 + length);
}

router
	.get(async (req, res) => {
		const state = generateRandomString(16);
		const scope = 'user-top-read user-read-email playlist-read-private'


		res.redirect('https://accounts.spotify.com/authorize?' +
			queryString.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state
			}));
	})


export default router.handler()

