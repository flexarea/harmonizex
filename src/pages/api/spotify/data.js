import { createRouter } from "next-connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const dataRouter = createRouter();

dataRouter.get(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  // Check if session exists
  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "No active session found",
    });
  }
  // Check if access token exists
  if (!session.user.accessToken) {
    // Note: check your session structure
    return res.status(401).json({
      error: "Unauthorized",
      message: "No access token found",
    });
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${session.user.accessToken}` },
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        error: "Spotify API Error",
        message: error.error?.message || "Failed to fetch top artists",
        status: response.status,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

export default dataRouter.handler();
