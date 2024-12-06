/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("interactions", (table) => {
      table.increments("interaction_id").primary(); // Auto-incrementing primary key
      table.integer("giving_user").notNullable();  // Usinng 'integer' instead of 'int'
      table.integer("receiving_user").notNullable(); // Using 'integer' instead of 'int'
      table.timestamps(true, true); // Adds created_at and updated_at
  
      table
        .foreign("giving_user")
        .references("user_id")
        .inTable("user_data")
        .onDelete("CASCADE");
      
      table
        .foreign("receiving_user")
        .references("user_id")
        .inTable("user_data")
        .onDelete("CASCADE");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("interactions");
  };
  