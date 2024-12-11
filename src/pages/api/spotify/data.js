import { createRouter } from "next-connect";
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth";

const dataRouter = createRouter();

dataRouter.get(async (req, res) => {
	const session = await getServerSession(req, res, authOptions);
	// Check if session exists
	if (!session) {
		return res.status(401).json({
			error: 'Unauthorized',
			message: 'No active session found'
		});
	}
	// Check if access token exists
	if (!session.user.accessToken) {  // Note: check your session structure
		return res.status(401).json({
			error: 'Unauthorized',
			message: 'No access token found'
		});
	}

	try {
		let response;

		switch (req.query.type) {
			case "user": {

				response = await fetch('https://api.spotify.com/v1/me', {
					headers: { 'Authorization': `Bearer ${session.user.accessToken}` }
				});
				break;
			}
			case "tracks": {

				response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
					headers: { 'Authorization': `Bearer ${session.user.accessToken}` }
				});
				break;
			}
			case "track": {
				response = await fetch(`https://api.spotify.com/v1/tracks/${req.query.track_id}`, {
					headers: { 'Authorization': `Bearer ${session.user.accessToken}` }
				})
				break;
			}
			default: {
				return res.status(400).json({
					error: 'Bad request',
					message: 'Invalid query type'
				})
			}
		}
		if (!response.ok) {
			const error = await response.json();
			return res.status(response.status).json({
				error: 'Spotify API Error',
				message: error.error?.message || 'Failed to fetch top artists',
				status: response.status
			});
		}

		const data = await response.json()
		console.log("Fetched data:", data);
		return res.status(200).json(data)
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error', message: error.message })
	}

})

export default dataRouter.handler();
