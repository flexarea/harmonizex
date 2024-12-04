// Create an API endpoint at src/pages/api/getMatches.js

import knex from '../../knex'; // Adjust the path to your knex instance

export default async function handler(req, res) {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Get matches where both users have liked each other
    const matches = await knex('interactions as i1')
      .join('interactions as i2', function () {
        this.on('i1.giving_user', '=', 'i2.receiving_user')
          .andOn('i1.receiving_user', '=', 'i2.giving_user');
      })
      .where('i1.giving_user', userId)
      .select('i1.receiving_user as matched_user_id');

    res.status(200).json({ matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
