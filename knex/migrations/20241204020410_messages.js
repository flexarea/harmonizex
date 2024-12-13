// migrations/YYYYMMDDHHMMSS_create_messages_table.js

exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("message_id").primary();
    table.integer("sender_id").notNullable().references("user_id").inTable("User").onDelete("CASCADE");
    table.integer("receiver_id").notNullable().references("user_id").inTable("User").onDelete("CASCADE");
    table.text("content").notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
