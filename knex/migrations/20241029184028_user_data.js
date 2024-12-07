/* eslint-disable func-names */
// knex/migrations/YYYYMMDDHHMMSS_user_data.js

exports.up = function (knex) {
  return knex.schema.createTable("User", (table) => {
    table.integer("user_id").primary(); 
    table.string("profile_pic");
    table.string("spotify_id");
    table.string("name");
    table.string("email");
    table.integer("age"); 
    table.string("gender");
    table.boolean("prefer_men"); // Use 'boolean' for true/false
    table.boolean("prefer_women"); // Use 'boolean' for true/false
    table.boolean("prefer_enby"); // Use 'boolean' for true/false
    table.string("song_1");
    table.string("song_2");
    table.string("song_3");
    table.string("song_4");
    table.string("song_5");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("User");
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
