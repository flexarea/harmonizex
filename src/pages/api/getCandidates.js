import hardFilter from "../../services/candidatesFinder";

export default async function handler(req, res) {
  try {
    const userId = req.query.userId || 1; // Replace with actual user ID
    // const minScore = req.query.minScore || 3;
    const candidates = await hardFilter(userId);
    res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
