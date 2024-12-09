import { createRouter } from "next-connect";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const user_id = req.query.id;
    console.log(`Authenticated user_id: ${user_id}`);

    console.log("Received Data:", req.body);

    const { name, age, gender, preferences } = req.body;
    const preferenceValues = Object.values(preferences); // Get all the preference values

    if (!name || !age || !gender) {
      throw new Error("Missing required fields");
    } else if (preferenceValues.every((value) => value === false)) {
      throw new Error("At least one preference must be selected");
    }
    const updatedRows = await knex("User")
      .where("user_id", user_id) // Find the user by ID
      .update({
        name: name,
        age: age,
        gender: gender,
        prefer_men: preferences.prefer_men,
        prefer_women: preferences.prefer_women,
        prefer_enby: preferences.prefer_enby,
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
