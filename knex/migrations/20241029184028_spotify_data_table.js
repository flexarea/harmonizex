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


/* User Model
{
  id: 1, // Unique identifier for the user
  name: "John Doe", // User's name
  spotify_id: "user_spotify_id", // User's Spotify ID for music data integration
  age: 25, // User's age
  gender: "male", // User's gender
  preferences: { // User's preferences for matches
    prefer_men: false,
    prefer_women: true,
    prefer_enby: false
  },
  // Favorite artists
  artist_1: null, // First favorite artist
  artist_2: null, // Second favorite artist
  artist_3: null, // Third favorite artist
  
  // Favorite songs
  song_1: null, // First favorite song
  song_2: null, // Second favorite song
  song_3: null, // Third favorite song
  
  // Favorite genres
  genre_1: null, // First favorite genre
  genre_2: null, // Second favorite genre
  genre_3: null, // Third favorite genre

  updated: "2024-03-15T12:00:00Z" // Last updated timestamp
}
*/