/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */exports.up = function (knex) {
  return knex.schema.createTable("interactions", (table) => {
    table
      .integer("user_id")
      .primary() // Primary key is user_id
      .notNullable()
      .references("user_id")
      .inTable("User")
      .onDelete("CASCADE"); // Cascade delete if the user is removed
    table.specificType("likes", "integer[]").defaultTo("{}"); // Array to store IDs of liked users
    table.specificType("dislikes", "integer[]").defaultTo("{}"); // Array to store IDs of disliked users
    table.timestamps(true, true); // Adds created_at and updated_at timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("interactions");
};

/**
 * The matching process in this schema works by comparing the `likes` arrays of two users.
 * 
 * - When User A likes User B, the User A's `likes` array is updated with User B's `user_id`.
 * - To find potential matches, the system checks if User A's `user_id` is present in User B's `likes` array and vice versa.
 * - A match is made if both users have each other’s `user_id` in their `likes` arrays, indicating mutual interest.
 * 
 * Example:
 * 1. User A likes User B: User A's `likes` array contains User B's `user_id`.
 * 2. If User B also likes User A, User B's `likes` array will contain User A's `user_id`.
 * 3. The system checks both arrays for a mutual `user_id`. If a match is found, they are considered a match.
 * 
 * This allows for simple, bidirectional matching based on mutual likes.
 */

