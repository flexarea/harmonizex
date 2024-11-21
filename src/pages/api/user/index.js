
import { createRouter } from "next-connect";

const router = createRouter();

router
	.get(async (req, res) => {
		const storedaccesstoken = localstorage.getitem('access_token')
		const options = {
			method: 'GET',
			headers: { 'authorization': `Bearer${req.query.access_token}` },
		};
		//use the access token to access the spotify web api
		const userinfo = await fetch('https://api.spotify.com/v1/me/top/artists', options)
		const userdata = userinfo.json()

		if (userinfo.ok) {
			//send user data
			res.status(200).json(userdata)
		} else {
			res.status(tokenresponse.status).end("token error")
		}
	})


export default router.handler()

