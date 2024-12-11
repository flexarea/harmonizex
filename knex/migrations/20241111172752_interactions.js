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
