import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/next";
import { knex } from "../../../../knex/knex";
import { authOptions } from "../auth/[...nextauth]";

const router = createRouter();

router.get(async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session.user.id;

    // Fetch the current user's likes
    const currentUserLikes = await knex("interactions")
      .where("user_id", user_id)
      .select("likes")
      .first();
    console.log(currentUserLikes.likes);

    // Fetch the users that the current user likes and who also like the current user
    let matches = await knex("interactions as i1")
      .join("User", "i1.user_id", "User.user_id")
      .where("i1.user_id", "in", currentUserLikes.likes)
      .where(knex.raw("i1.likes @> ARRAY[?]::integer[]", [userId]))
      .select("User.user_id", "User.name", "User.email", "User.profile_pic");
    console.log(matches);
    // Check if matches is an array
    if (!Array.isArray(matches)) {
      matches = [];
    }

    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router.handler();
