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
  const candidates = await hardFilter(user);

  // Step 4: Filter by scores
  return filterByScore(candidates, minScore);
}

export default filterUsers;
