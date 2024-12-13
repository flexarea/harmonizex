import { createRouter } from "next-connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const router = createRouter();

router
.get(async (req, res) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Query the database for the user details
    const user = await knex("User")
      .select("name", "profile_pic")
      .where("user_id", userId)
      .first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
.post(async (req, res) => {
  try {
    const user_id = req.query.id;
    // Fetch session and access token
    const session = await getServerSession(req, res, authOptions);

    console.log(`Authenticated user_id: ${user_id}`);

    console.log("Received Data:", req.body);

    const { name, age, gender, preferences } = req.body;
    const preferenceValues = Object.values(preferences); // Get all the preference values

    if (!name || !age || !gender) {
      throw new Error("Missing required fields");
    } else if (preferenceValues.every((value) => value === false)) {
      throw new Error("At least one preference must be selected");
    }
    // Fetch the top tracks from Spotify API
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
      headers: { 'Authorization': `Bearer ${session.user.accessToken}` }
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        error: 'Spotify API Error',
        message: error.error?.message || 'Failed to fetch top tracks',
        status: response.status
      });
    }

    const data = await response.json();
    console.log("Fetched top tracks:", data);

    // Extract the Spotify IDs of the top 5 songs
    const songIds = data.items.map(song => song.id);

    const updatedRows = await knex("User")
      .where("user_id", user_id) // Find the user by ID
      .update({
        name: name,
        age: age,
        gender: gender,
        prefer_men: preferences.prefer_men,
        prefer_women: preferences.prefer_women,
        prefer_enby: preferences.prefer_enby,
        song_1: songIds[0],
        song_2: songIds[1],
        song_3: songIds[2],
        song_4: songIds[3],
        song_5: songIds[4],
        updated_at: knex.fn.now() // Update the 'updated_at' timestamp
      });
    res
      .status(200)
      .json({ message: "Data received successfully", data: req.body });
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router.handler();
