/* eslint-disable func-names */
const knex = require("knex");
 /*
 * Main function: Filters a list of candidates based on a user's preferences and scores.
 */

/**
 * Hard Filter: Filter users by gender and age.
 */
async function hardFilter(user) {
  return knex("users")
    .whereNot("id", user.id) // Exclude the user themselves
    .andWhere(function () {
      // Gender filter
      this.whereRaw("?? = ?", ["gender", "female"])
        .andWhere(function () {
          this.where(user.prefer_women).andWhere("prefer_women", true);
        })
        .orWhereRaw("?? = ?", ["gender", "male"])
        .andWhere(function () {
          this.where(user.prefer_men).andWhere("prefer_men", true);
        })
        .orWhereRaw("?? = ?", ["gender", "enby"])
        .andWhere(function () {
          this.where(user.prefer_enby).andWhere("prefer_enby", true);
        });
    })
    .andWhere("age", ">=", user.age_pref_low)
    .andWhere("age", "<=", user.age_pref_high);
}

/**
 * Calculate scores for each candidate.
 */
async function calculateScores(user, candidatesQuery) {
  return candidatesQuery.select("users.*").select(
    knex.raw(
      `(
        (CASE WHEN users.artist_1 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.artist_2 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.artist_3 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.song_1 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.song_2 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.song_3 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.genre_1 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.genre_2 = ? THEN 1 ELSE 0 END) +
        (CASE WHEN users.genre_3 = ? THEN 1 ELSE 0 END)
      ) as score)`,
      [
        user.artist_1,
        user.artist_2,
        user.artist_3,
        user.song_1,
        user.song_2,
        user.song_3,
        user.genre_1,
        user.genre_2,
        user.genre_3,
      ],
    ),
  );
}

/**
 * Filter candidates based on a minimum score.
 */
function filterByScore(candidatesWithScores, minScore) {
  return candidatesWithScores
    .where("score", ">=", minScore)
    .orderBy("score", "desc");
}

async function filterUsers(userId, minScore = 3) {
  // Step 1: Fetch the user from the database
  const user = await knex("users").where("id", userId).first();

  // Step 2: Apply hard filters (gender and age)
  const hardFilteredCandidates = await hardFilter(user);

  // Step 3: Calculate scores for remaining candidates
  const candidatesWithScores = await calculateScores(
    user,
    hardFilteredCandidates,
  );

  // Step 4: Filter by scores
  return filterByScore(candidatesWithScores, minScore);
}

export default filterUsers;
