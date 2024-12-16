/* eslint-disable no-console */
import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/next";
import { knex } from "../../../knex/knex";
import { authOptions } from "./auth/[...nextauth]";
import { authenticated } from "../../lib/middleware";

const router = createRouter();

router.post(authenticated, async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session.user.id;
    const { targetUserId, liked } = req.body;

    // Validate required fields
    if (!userId || !targetUserId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the existing interaction record for the user
    const existingInteraction = await knex("interactions")
      .where("user_id", userId)
      .first();

    if (!existingInteraction) {
      // Create a new interaction record
      const newInteraction = {
        userId,
        likes: liked ? [targetUserId] : [],
        dislikes: !liked ? [targetUserId] : [],
      };
      await knex("interactions").insert(newInteraction);
    } else {
      // Update the existing interaction record
      const updatedInteraction = { ...existingInteraction };
      const arrayToUpdate = liked ? 'likes' : 'dislikes';

      if (!updatedInteraction[arrayToUpdate].includes(targetUserId)) {
        updatedInteraction[arrayToUpdate].push(targetUserId);
      }

      await knex("interactions")
        .where("user_id", userId)
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
