// src/pages/api/getMessages.js

import knex from '../../knex'; // Adjust the path

export default async function handler(req, res) {
  try {
    const userId1 = parseInt(req.query.userId1);
    const userId2 = parseInt(req.query.userId2);

    if (!userId1 || !userId2) {
      return res.status(400).json({ error: 'userId1 and userId2 are required' });
    }

    // Verify that the users have matched
    const match = await knex('interactions as i1')
      .join('interactions as i2', function () {
        this.on('i1.giving_user', '=', 'i2.receiving_user')
          .andOn('i1.receiving_user', '=', 'i2.giving_user');
      })
      .where('i1.giving_user', userId1)
      .andWhere('i1.receiving_user', userId2)
      .first();

    if (!match) {
      return res.status(403).json({ error: 'Users have not matched' });
    }

    // Fetch messages between the two users
    const messages = await knex('messages')
      .where(function () {
        this.where('sender_id', userId1).andWhere('receiver_id', userId2);
      })
      .orWhere(function () {
        this.where('sender_id', userId2).andWhere('receiver_id', userId1);
      })
      .orderBy('timestamp', 'asc');

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
