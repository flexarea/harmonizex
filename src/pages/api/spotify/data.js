import { createRouter } from "next-connect";
import queryString from "query-string";

const dataRouter = createRouter();

dataRouter.get(async (req, res) => {
	const access_token = req.cookies.spotify_access_token;
	const refresh_token = req.cookies.spotify_refresh_token;

	if (!access_token) {
		return res.status(401).json({ error: 'No access token' });
	}

	try {
		// Try to fetch data with current access token
		const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
			headers: { 'Authorization': `Bearer ${access_token}` }
		});

		if (response.status === 401 && refresh_token) {
			// Token expired, use refresh token to get new access token
			const refreshResponse = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + (Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
				},
				body: queryString.stringify({
					grant_type: 'refresh_token',
					refresh_token: refresh_token
				})
			});

			const refreshData = await refreshResponse.json();

			if (!refreshResponse.ok) {
				return res.status(401).json({ error: 'Unable to refresh token' });
			}

			// Update access token in cookie
			res.setHeader('Set-Cookie',
				`spotify_access_token=${refreshData.access_token}; Path=/; HttpOnly`
			);

			// Retry the request with new access token
			const newResponse = await fetch('https://api.spotify.com/v1/me/top/artists', {
				headers: { 'Authorization': `Bearer ${refreshData.access_token}` }
			});
			const newData = await newResponse.json();
			return res.status(200).json(newData);
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error', message: error.message });
	}
});

export default dataRouter.handler();
