// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
//     return knex.schema.createTable('users', (table) => {
//       // Primary key
//       table.increments('id').primary(); // Unique identifier for the user
  
//       // User's basic information
//       table.string('name').notNullable(); // User's name
//       table.string('spotify_id'); // User's Spotify ID for music data integration
//       table.integer('age').notNullable(); // User's age
//       table.string('gender'); // User's gender (e.g., male, female, non-binary)
  
//       // Preferences for matches
//       table.boolean('prefer_men').defaultTo(false);
//       table.boolean('prefer_women').defaultTo(false);
//       table.boolean('prefer_enby').defaultTo(false);
  
//       // Favorite artists
//       table.string('artist_1');
//       table.string('artist_2');
//       table.string('artist_3');
  
//       // Favorite songs
//       table.string('song_1');
//       table.string('song_2');
//       table.string('song_3');
  
//       // Favorite genres
//       table.string('genre_1');
//       table.string('genre_2');
//       table.string('genre_3');
  
//       // Location details
//       table.string('location_city', 100); // City of the user's location
//       table.float('location_latitude'); // Latitude coordinate
//       table.float('location_longitude'); // Longitude coordinate
  
//       // Location preferences
//       table.jsonb('location_preferences'); // JSONB to store location preferences like preferred radius
  
//       // Timestamp for last update
//       table.timestamp('updated').defaultTo(knex.fn.now()); // Defaults to the current timestamp
//     });
//   };
  
//   exports.down = function(knex) {
//     return knex.schema.dropTableIfExists('users');
//   };
  
