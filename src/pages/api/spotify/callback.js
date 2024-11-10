import { createRouter } from "next-connect";
import queryString from "query-string";

const router = createRouter();

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:3000/callback';

router
	.get(async (req, res) => {

		const code = req.query.code || null;
		const state = req.query.state || null;

		if (state === null) {
			res.redirect('/#' +
				queryString.stringify({
					error: 'state_mismatch'
				}));
		} else {
			const authOptions = {
				url: 'https://accounts.spotify.com/api/token',
				method: 'POST',
				body: queryString.stringify({
					code: code,
					redirect_uri: redirect_uri,
					grant_type: 'authorization_code'
				}),
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
				},
				json: true
			};

			try {
				//Make the POST request to get the token
				const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOptions)
				const tokenData = await tokenResponse.json()

				if (tokenResponse.ok) {
					const access_token = tokenData.access_token
					const refresh_token = tokenData.refresh_token;

					const options = {
						method: 'GET',
						headers: { 'Authorization': `Bearer${access_token}` },
						json: true
					};
					//use the access token to access the Spotify Web API
					const userInfo = await fetch('https://api.spotify.com/v1/me/top/artists', options)
					const userData = userInfo.json()

					if (userInfo.ok) {
						//send user data
						res.status(200).json(userData)
					} else {
						res.status(tokenResponse.status).end("Token error")
					}
				} else {

				}
			} catch (error) {
				res.status(500).json({ error: 'Internal Server Error', message: error.message });
			}

		}
	})


export default router.handler()



