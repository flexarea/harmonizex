/* eslint-disable func-names */
// knex/migrations/YYYYMMDDHHMMSS_create_api_data_table.js

exports.up = function(knex) {
  return knex.schema.createTable("api_data", (table) => {
    table.increments("user_id").primary();
    table.string("name");
    table.string("email");
    table.int("age");
    table.string("gender");
    table.string("sexuality");
    table.string("location");
    // create info for songs, artists, etc.
    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("api_data");
};


/* Per Friday Meetind discussion
{
  id: 1,
  name: "John Doe",
  age: 25,
  gender: "male",
  preferences: {
    prefer_men: false,
    prefer_women: true,
    prefer_enby: false
  },
  spotify: ["artist1", "song1", "genre1"],
  updated: "2024-03-15T12:00:00Z"
}
*/
