// knex/seeds/user_data.js
const users = [
  {
    user_id: 1,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:6jJ0s89eD6tflJhX7kJ75H",  // Fake Spotify ID
    name: "Alice Smith",
    email: "alice@example.com",
    age: 28,
    gender: "female",
    prefer_men: false,
    prefer_women: true,
    prefer_enby: false,
    song_1: "02vrwnrNEeDRV96o9iPSYP",
    song_2: "7z7kvUQGwlC6iOl7vMuAr9",
    song_3: "6XjDF6nds4DE2BBbagZol6",
    song_4: "2H2ytI7ompfNmRkI2sq8Uk",
    song_5: "2tjWCe2W7sgvS3C8NHcdtI",
  },
  {
    user_id: 2,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:4tC7PnXzDms9A5ql42enfD",  // Fake Spotify ID
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 32,
    gender: "male",
    prefer_men: true,
    prefer_women: false,
    prefer_enby: false,
    song_1: "3A4cpTBPaIQdtPFb5JxtaX",
    song_2: "4GXW3Ne1jzdORKHvHjK31V",
    song_3: "7jEpRsSusmGqKFISucMnV7",
    song_4: "1XBYiRV30ykHw5f4wm6qEn",
    song_5: "4pHCz444L8yvFDar6FC0xd",
  },
  {
    user_id: 3,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:5Ce7XEqt6Q7IVtnXz2uW06",  // Fake Spotify ID
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 25,
    gender: "male",
    prefer_men: true,
    prefer_women: true,
    prefer_enby: true,
    song_1: "5zCnGtCl5Ac5zlFHXaZmhy",
    song_2: "1Es7AUAhQvapIcoh3qMKDL",
    song_3: "7q0XU83dlXOzoAor3sulOM",
    song_4: "4o4wEDRqotccDTXiQ7TORu",
    song_5: "7dJYggqjKo71KI9sLzqCs8",
  },
  {
    user_id: 4,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:6xWtiVebwn4dtHzVZPBHdx",  // Fake Spotify ID
    name: "David Lee",
    email: "david@example.com",
    age: 30,
    gender: "male",
    prefer_men: true,
    prefer_women: false,
    prefer_enby: false,
    song_1: "4j1Bk0BEIGCF9hR7cSwl9d",
    song_2: "6nP69wy9Y1PonStmqt33uk",
    song_3: "3yHyiUDJdz02FZ6jfUbsmY",
    song_4: "7G5wpuR61ABrT7R1snos7C",
    song_5: "3B4Wf3Fo11BXSuVPi1dtDO",
  },
  {
    user_id: 5,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:7ksfe8Wz9cST22mIHDeMnO",  // Fake Spotify ID
    name: "Eve White",
    email: "eve@example.com",
    age: 22,
    gender: "female",
    prefer_men: false,
    prefer_women: true,
    prefer_enby: false,
    song_1: "6cmm1LMvZdB5zsCwX5BjqE",
    song_2: "7z7kvUQGwlC6iOl7vMuAr9",
    song_3: "6XjDF6nds4DE2BBbagZol6",
    song_4: "2H2ytI7ompfNmRkI2sq8Uk",
    song_5: "2tjWCe2W7sgvS3C8NHcdtI",
  },
  {
    user_id: 6,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:3z6NMPXbJlUom4O0bu5jBp",  // Fake Spotify ID
    name: "Frank Harris",
    email: "frank@example.com",
    age: 35,
    gender: "male",
    prefer_men: false,
    prefer_women: true,
    prefer_enby: true,
    song_1: "7jEpRsSusmGqKFISucMnV7",
    song_2: "1XBYiRV30ykHw5f4wm6qEn",
    song_3: "4pHCz444L8yvFDar6FC0xd",
    song_4: "5zCnGtCl5Ac5zlFHXaZmhy",
    song_5: "1Es7AUAhQvapIcoh3qMKDL",
  },
  {
    user_id: 7,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:6EjJX4YVsTk8G91of0Oem9",  // Fake Spotify ID
    name: "Grace King",
    email: "grace@example.com",
    age: 27,
    gender: "female",
    prefer_men: true,
    prefer_women: true,
    prefer_enby: true,
    song_1: "7q0XU83dlXOzoAor3sulOM",
    song_2: "4o4wEDRqotccDTXiQ7TORu",
    song_3: "7dJYggqjKo71KI9sLzqCs8",
    song_4: "4j1Bk0BEIGCF9hR7cSwl9d",
    song_5: "6nP69wy9Y1PonStmqt33uk",
  },
  {
    user_id: 8,
    profile_pic: "https://i.scdn.co/image/ab6775700000ee85c21eeeee9294fbb653f5cb4a",
    spotify_id: "spotify:artist:2lWi9Up9WbTKdqLU61hMYd",  // Fake Spotify ID
    name: "Harry Kim",
    email: "harry@example.com",
    age: 26,
    gender: "male",
    prefer_men: true,
    prefer_women: false,
    prefer_enby: false,
    song_1: "3yHyiUDJdz02FZ6jfUbsmY",
    song_2: "7G5wpuR61ABrT7R1snos7C",
    song_3: "3B4Wf3Fo11BXSuVPi1dtDO",
    song_4: "6cmm1LMvZdB5zsCwX5BjqE",
    song_5: "7z7kvUQGwlC6iOl7vMuAr9",
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("User")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("User").insert(users);
    });
};
