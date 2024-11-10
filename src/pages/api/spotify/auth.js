import { createRouter } from "next-connect";
import queryString from "query-string";

const router = createRouter();

const querystring = require('querystring');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:8888/callback';

const generateRandomString = (length) => {
	return Math.random().toString(36).substring(2, 2 + length);
}

router
	.get(async (req, res) => {
		const state = generateRandomString(16);
		const scope = 'user-top-read user-read-email playlist-read-private'


		res.redirect('https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state
			}));
	})


export default router.handler()

