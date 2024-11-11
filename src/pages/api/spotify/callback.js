import { createRouter } from "next-connect";
import queryString from "query-string";
import { use } from "react";

const router = createRouter();

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:3000/api/spotify/callback';

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
				method: 'POST',
				body: queryString.stringify({
					code: code,
					redirect_uri: redirect_uri,
					grant_type: 'authorization_code'
				}),
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + (Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
				},
				json: true
			};

			try {
				//Make the POST request to get the token
				const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOptions)
				const tokenData = await tokenResponse.json()

				if (!tokenResponse.ok) {
					return res.status(400).json({ error: 'Unable to retrieve tokens' })

				}
				const access_token = tokenData.access_token
				const refresh_token = tokenData.refresh_token;

				const options = {
					method: 'GET',
					headers: { 'Authorization': `Bearer ${access_token}` },
					json: true
				};
				//use the access token to access the spotify web api
				const userinfo = await fetch('https://api.spotify.com/v1/me/top/artists', options)
				const userdata = await userinfo.json()

				if (!userinfo.ok) {
					return res.status(userinfo.status).json({
						error: 'Token error',
						details: userdata.error
					})
				}

				return res.status(200).json(userdata)


			} catch (error) {
				res.status(500).json({ error: 'Internal Server Error', message: error.message });
			}

		}
	})


export default router.handler()



