// pages/api/currentUser.js

const knex = require("knex");
import { getSession } from "next-auth/react"; // Import getSession from next-auth

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    // Not authenticated
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const userId = session.user.id; // Adjust based on your session object

  try {
    const user = await knex('users').where('id', userId).first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      age: user.age,
      bio: user.bio,
      avatarUrl: user.avatar_url || '/default-avatar.png',
      // Include other fields as necessary
    };

    res.status(200).json({ currentUser });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
