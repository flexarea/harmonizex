exports.seed = async function(knex) {
  // Deletes ALL existing entries in the messages table
  await knex("messages").del();

  // Insert fake messages between user ID 1 and user ID 2
  await knex("messages").insert([
    {
      sender_id: 1,
      receiver_id: 2,  // Changed from 9 to 2
      content: "Hey! How are you?",
      timestamp: new Date("2024-12-01T10:00:00Z"),
    },
    {
      sender_id: 2,  // Changed from 9 to 2
      receiver_id: 1,
      content: "I'm good! How about you?",
      timestamp: new Date("2024-12-01T10:05:00Z"),
    },
    {
      sender_id: 1,
      receiver_id: 2,  // Changed from 9 to 2
      content: "Doing great! Thanks for asking.",
      timestamp: new Date("2024-12-01T10:10:00Z"),
    },
    {
      sender_id: 2,  // Changed from 9 to 2
      receiver_id: 1,
      content: "Glad to hear that! What's up?",
      timestamp: new Date("2024-12-01T10:15:00Z"),
    },
    {
      sender_id: 1,
      receiver_id: 2,  // Changed from 9 to 2
      content: "Just working on some projects. You?",
      timestamp: new Date("2024-12-01T10:20:00Z"),
    },
  ]);
};
