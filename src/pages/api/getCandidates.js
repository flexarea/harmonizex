import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/next";
import { knex } from "../../../knex/knex";
import { authOptions } from "./auth/[...nextauth]";
import { authenticated } from "../../lib/middleware";

const router = createRouter()

router.get(authenticated, async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  try {
    const userPreference = await knex("User")
      .where("user_id", session.user.id)
      .select("prefer_men", "prefer_women", "prefer_enby", "gender")
      .first()
    // Fetch interaction data for the current user
    const interactionData = await knex("interactions")
      .where("user_id", session.user.id)
      .select("likes", "dislikes")
      .first();
    // Get all users that the current user has already swiped on
    const alreadySwiped = new Set([
      ...(interactionData?.likes || []),
      ...(interactionData?.dislikes || []),
    ]);

    const setUpCandidatePreference = () => {
      const tempBuffer = {}
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(userPreference)) {
        if (value) {
          // eslint-disable-next-line default-case
          switch (key) {
            case "prefer_men": {
              const deepCheck =
                userPreference.gender === "male" ? "prefer_men" : "prefer_women";
              tempBuffer[`${deepCheck}`] = "male";
              break;
            }
            case "prefer_women": {
              const deepCheck =
                userPreference.gender === "female" ? "prefer_women" : "prefer_men";
              tempBuffer[`${deepCheck}`] = "female";
              break;
            }
            case "prefer_enby": {
              tempBuffer.prefer_enby = "any";
              break;
            }
          }
        }
      }
      return tempBuffer;
    };

    const candidatePreference = setUpCandidatePreference();

    // Fetch all users except the current user and those already swiped
    const users = await knex("User")
      .whereNot("user_id", session.user.id)
      .andWhere((builder) => {
        if (alreadySwiped.size > 0) {
          builder.whereNotIn("user_id", Array.from(alreadySwiped));
        }
      })
      .select();

    // Match users based on preferences
    const getMatchingCandidate = () => users.filter((user) =>
      Object.entries(user).some(([key, value]) =>
        key in candidatePreference &&
        value &&
        (user.gender === candidatePreference[key] || candidatePreference[key] === "any")
      )
    );

    const candidates = getMatchingCandidate();
    if (candidates.length > 0) {
      res.status(200).json(candidates);
    } else {
      res.status(404).json({ message: "No candidates available" });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: error.message });
  }
});


export default router.handler();

