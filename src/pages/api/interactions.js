import { knex } from "../../../knex/knex";
import { createRouter } from "next-connect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
// import { authenticated } from "../../lib/middleware";

// const router = createRouter();
// const session = await getServerSession(req, res, authOptions);
// const user_id = session.user.id;
// console.log("User ID:", user_id);
const router = createRouter();

router.post(async (req, res) => {
  try {
    // Log the request body to confirm it is received correctly
    console.log("Received POST request with body:", req.body);

    // Send a simple success response
    return res.status(200).json({ message: "Request received successfully" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;



//     try {
        // const { target_user_id, liked } = req.body;
//         console.log("user_id", user_id);
//         console.log("target_user_id", target_user_id);
//         console.log("liked", liked);
    
//     if (!user_id || !target_user_id) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Fetch the existing interaction record for the user
//     const existingInteraction = await knex("interactions")
//       .where("user_id", user_id)
//       .first();

//     // If the user doesn't have an existing interaction record, create one
//     if (!existingInteraction) {
//       const newInteraction = {
//         user_id,
//         likes: liked ? [target_user_id] : [],
//         dislikes: !liked ? [target_user_id] : [],
//       };
//       await knex("interactions").insert(newInteraction);
//       return res.status(200).json({ message: "Interaction created successfully" });
//     }

//     // If the user has an existing interaction record, update the likes or dislikes arrays
//     const updatedInteraction = { ...existingInteraction };

//     if (liked) {
//       if (!updatedInteraction.likes.includes(target_user_id)) {
//         updatedInteraction.likes.push(target_user_id); // Add target user ID to likes array
//       }
//     } else {
//       if (!updatedInteraction.dislikes.includes(target_user_id)) {
//         updatedInteraction.dislikes.push(target_user_id); // Add target user ID to dislikes array
//       }
//     }

//     // Update the interaction record with the new arrays
//     await knex("interactions")
//       .where("user_id", user_id)
//       .update({
//         likes: updatedInteraction.likes,
//         dislikes: updatedInteraction.dislikes,
//       });

//     return res.status(200).json({ message: "Interaction updated successfully" });

//   } catch (error) {
//     console.error("Error updating interaction:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;
