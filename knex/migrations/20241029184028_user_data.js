/* eslint-disable func-names */
// knex/migrations/YYYYMMDDHHMMSS_user_data.js

exports.up = function (knex) {
  return knex.schema.createTable("user_data", (table) => {
    table.int("user_id").primary();

    table.string("name");
    table.string("email");
    table.int("age");
    table.string("gender");
    table.string("sexuality");
    table.string("location");

    // 1 yes, 0 no
    table.int("prefer_men");
    table.int("prefer_women");
    table.int("prefer_enby");

    table.string("song_1");
    table.string("song_2");
    table.string("song_3");
    table.string("song_4");
    table.string("song_5");
    table.string("song_6");
    table.string("song_7");
    table.string("song_8");
    table.string("song_9");
    table.string("artist_1");
    table.string("artist_2");
    table.string("artist_3");
    table.string("artist_4");
    table.string("artist_5");
    table.string("genre_1");
    table.string("genre_2");
    table.string("genre_3");
    table.string("playlist");

    table.timestamps(true, true); // adds created_at and updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_data");
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
