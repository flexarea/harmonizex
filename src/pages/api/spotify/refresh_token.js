import { createRouter } from "next-connect";
import queryString from "query-string";

const router = createRouter();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

router
	.get(async (req, res) => {
		const refresh_token = req.query.refresh_token;
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				method: 'POST',
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
			},
			body: queryString.stringify({
				grant_type: 'refresh_token',
				refresh_token: refresh_token
			}),
			json: true
		};

		try {
			const response = await fetch('https://accounts.spotify.com/api/token', authOptions)
			const body = response.json()

			if (response.ok) {
				res.send({
					'access_token': body.access_token,
					'refresh_token': body.refresh_token
				});
			} else {
				res.status(400).end("error")
			}
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error', message: error.message });
		}
	})


export default router.handler()

