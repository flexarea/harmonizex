import { knex } from "../../../knex/knex";
import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/session";
import { authOptions } from "./auth/[...nextauth]";
import { authenticated } from "../../lib/middleware";

const router = createRouter()
const session = await getServerSession(req, res, authOptions)

router.get(authenticated, async (req, res) => {
  try {
    const userPreference = await knex("User")
      .where("user_id", session.user.id)
      .select("prefer_men", "prefer_women", "prefer_enby")
      .first()
    const setUpCandidatePreference = () => {
      let tempBuffer = []
      for (const [key, value] of Object.entries(userPreference)) {
        if (value) {
          switch (key) {
            case 'prefer_men': {
              tempBuffer.push('prefer_women')
              break;
            }
            case 'prefer_women': {
              tempBuffer.push('prefer_men')
              break;
            }
            case 'prefer_enby': {
              tempBuffer.push('prefer_enby')
              break;
            }
            default: {
              return null
            }
          }
        }
      }
      return tempBuffer
    }

    const candidatePreference = setUpCandidatePreference()

    const users = await knex("User")
      .whereNot("user_id", session.user.id)
      .limit(10)
      .select()
    const getMatchingCandidate = () => {
      return users.filter((user) => {
        for (const [key, value] of Object.entries(user)) {
          if (['prefer_men', 'prefer_women', 'prefer_enby'].includes(key)) {
            if (value && candidatePreference.includes(key)) {
              return true //found a match
            }
          }
        }
      })
    }

    const candidates = getMatchingCandidate();
    if (candidates) {
      res.status(200).json(candidates)
    } else {
      res.status(404).json() //display no candidate available UI
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router.handler();

