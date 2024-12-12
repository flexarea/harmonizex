import { knex } from "../../../knex/knex";
import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const user_id = session.user.id;
    const { target_user_id, liked } = req.body;

    // Validate required fields
    if (!user_id || !target_user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the existing interaction record for the user
    const existingInteraction = await knex("interactions")
      .where("user_id", user_id)
      .first();

    if (!existingInteraction) {
      // Create a new interaction record
      const newInteraction = {
        user_id,
        likes: liked ? [target_user_id] : [],
        dislikes: !liked ? [target_user_id] : [],
      };
      await knex("interactions").insert(newInteraction);
    } else {
      // Update the existing interaction record
      const updatedInteraction = { ...existingInteraction };
      const arrayToUpdate = liked ? 'likes' : 'dislikes';

      if (!updatedInteraction[arrayToUpdate].includes(target_user_id)) {
        updatedInteraction[arrayToUpdate].push(target_user_id);
      }

      await knex("interactions")
        .where("user_id", user_id)
        .update({
          [arrayToUpdate]: updatedInteraction[arrayToUpdate],
        });
    }

    return res.status(200).json({ message: "Interaction updated successfully" });
  } catch (error) {
    console.error("Error updating interaction:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();