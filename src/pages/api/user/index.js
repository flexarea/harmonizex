
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
		const userinfo = await fetch('https://api.spotify.com/v1/me/top/tracks', options)
		const userdata = userinfo.json()

		if (userinfo.ok) {
			//send user data
			res.status(200).json(userdata)
		} else {
			res.status(tokenresponse.status).end("token error")
		}
	})
	.post(async (req, res) => {
		try {
		  console.log('Received Data:', req.body);
		  
		  const { name, age, gender, preferences } = req.body;
		  const preferenceValues = Object.values(preferences);  // Get all the preference values
  
		
		  if (!name || !age || !gender) {
			throw new Error("Missing required fields");
		  }
		  else if (preferenceValues.every(value => value === false)) {
			throw new Error("At least one preference must be selected");
		  }
		  res.status(200).json({ message: 'Data received successfully', data: req.body });
		} catch (error) {
		  console.error('Error in POST /api/user:', error);
		  res.status(500).json({ error: error.message });
		}
	  });
	  


export default router.handler()

