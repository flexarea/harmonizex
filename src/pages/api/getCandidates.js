import { knex } from "../../../knex/knex";
import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/next";
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
    console.log(userPreference)
    const setUpCandidatePreference = () => {
      let tempBuffer = {}
      for (const [key, value] of Object.entries(userPreference)) {
        if (value) {
          switch (key) {
            case 'prefer_men': {
              const deepCheck = userPreference.gender === 'male' ? 'prefer_men' : 'prefer_women'
              tempBuffer[`${deepCheck}`] = 'male'
              break;
            }
            case 'prefer_women': {
              const deepCheck = userPreference.gender === 'female' ? 'prefer_women' : 'prefer_men'
              tempBuffer[`${deepCheck}`] = 'female'
              break;
            }
            case 'prefer_enby': {
              tempBuffer['prefer_enby'] = 'any'
              break;
            }
          }
        }
      }
      return tempBuffer
    }

    const candidatePreference = setUpCandidatePreference()
    console.log(candidatePreference)

    const users = await knex("User")
      .whereNot("user_id", session.user.id)
      .limit(10)
      .select()
    const getMatchingCandidate = () => {
      return users.filter((user) => {
        for (const [key, value] of Object.entries(user)) {
          if (key in candidatePreference && value) {
            if (user.gender === candidatePreference[key] || candidatePreference[key] === 'any')
              return true //found a match
          }

        }
      })
    }

    const candidates = getMatchingCandidate();
    if (candidates) {
      res.status(200).json(candidates)
      console.log(userPreference)
      console.log(candidates)
    } else {
      res.status(404).json() //display no candidate available UI
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router.handler();

