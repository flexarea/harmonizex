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
					return res.redirect('/login?error=auth_failed')
				}

				//store tokens in cookies or session
				res.setHeader('Set-Cookie', [
					`spotify_access_token=${tokenData.access_token}; Path=/; HttpOnly`,
					`spotify_refresh_token=${tokenData.refresh_token}; Path=/; HttpOnly`
				])

				//redirect to swipeboard
				return res.redirect('/swipeboard')


			} catch (error) {
				console.log('Auth error', error)
				return res.redirect('/login?error=server_error')
			}

		}
	})


export default router.handler()



