import { getSession } from "next-auth/react"; // Import getSession from next-auth

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user || !session.user.id) {
      // If the session or user ID is missing, return an error
      return res.status(401).json({ error: "Not authenticated or user ID not found" });
    }

    // Return the user ID from the session
    res.status(200).json({ userId: session.user.id });
  } catch (error) {
    console.error("Error retrieving current user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
