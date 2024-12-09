// src/pages/api/sendMessage.js

const knex = require("knex");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    // Verify that the users have matched
    const match = await knex('interactions as i1')
      .join('interactions as i2', function () {
        this.on('i1.giving_user', '=', 'i2.receiving_user')
          .andOn('i1.receiving_user', '=', 'i2.giving_user');
      })
      .where('i1.giving_user', senderId)
      .andWhere('i1.receiving_user', receiverId)
      .first();

    if (!match) {
      return res.status(403).json({ error: 'Users have not matched' });
    }

    // Insert the new message into the database
    const [message] = await knex('messages')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        timestamp: new Date(),
      })
      .returning('*');

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
