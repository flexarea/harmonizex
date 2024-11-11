/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("interactions", (table) => {
        table.increments("interaction_id").primary();
        table.int("giving_user").notNullable();
        table.int("receiving_user").notNullable();
        table.timestamps(true, true);

        table.foreign("giving_user").references("user_id").inTable("user_data").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("interactions");
};
