/* eslint-disable func-names */
/* eslint-disable no-console */
import { createRouter } from "next-connect";
import { getServerSession } from "next-auth/next";
import { knex } from "../../../../knex/knex";
import { authOptions } from "../auth/[...nextauth]";
import { authenticated } from "../../../lib/middleware";

const router = createRouter();

// GET: Fetch messages between two users
// eslint-disable-next-line consistent-return
router.get(authenticated, async (req, res) => {
  const session = await getServerSession(req, res, authOptions); // Get session info
  const { matchId } = req.query; // Extract matchId from query parameters

  if (!matchId) {
    return res.status(400).json({ error: "Missing 'matchId' in query parameters." });
  }

  try {
    const userId = session.user.id; // Current user's ID from session

    const messages = await knex("messages")
      .where(function () {
        this.where("sender_id", userId).andWhere("receiver_id", matchId);
      })
      .orWhere(function () {
        this.where("sender_id", matchId).andWhere("receiver_id", userId);
      })
      .orderBy("timestamp", "asc"); // Fetch messages in ascending order of timestamp

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// POST: Send a new message
// eslint-disable-next-line consistent-return
router.post(authenticated, async (req, res) => {
  const session = await getServerSession(req, res, authOptions); // Get session info
  const { receiverId, content } = req.body; // Extract message details from the request body

  if (!receiverId || !content) {
    return res.status(400).json({ error: "Missing 'receiverId' or 'content' in request body." });
  }

  try {
    const senderId = session.user.id; // Current user's ID from session

    const [newMessage] = await knex("messages")
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content,
      })
      .returning(["message_id", "sender_id", "receiver_id", "content", "timestamp"]); // Return inserted message

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

export default router.handler();
