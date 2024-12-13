import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material"; // Ensure ListItem is included here
import { useRouter } from "next/router";


const Chat = () => {
  const router = useRouter();
  const { matchId } = router.query; // Get the matched user's ID from the route
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null); // Store the current user ID
  const [matchUserData, setMatchUserData] = useState(null); // Store matched user's name and profile picture
  const messagesEndRef = useRef(null); // to scroll to the latest message

  // Fetch current user's ID
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const res = await fetch("/api/getCurrentUserId");
        const data = await res.json();
        if (res.ok) {
          setCurrentUserId(data.userId); // Set the current user ID
        } else {
          console.error("Failed to fetch current user ID:", data.error);
        }
      } catch (error) {
        console.error("Error fetching current user ID:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  // Fetch matched user's data
  useEffect(() => {
    const fetchMatchUserData = async () => {
      if (!matchId) return;

      try {
        const res = await fetch(`/api/user/${matchId}`);
        const data = await res.json();
        if (res.ok) {
          setMatchUserData(data); // Set matched user's data
          console.log("Matched user data:", data);
        } else {
          console.error("Failed to fetch matched user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching matched user data:", error);
      }
    };

    fetchMatchUserData();
  }, [matchId]);

  // Fetch chat old messages between the current user and the matched user or already existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!matchId || !currentUserId) return;

      try {
        const res = await fetch(`/api/chat/messages?matchId=${matchId}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [matchId, currentUserId]);

  // Auto-scroll to the latest message...got help from chatgpt for this lol
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUserId) return;

    try {
      const res = await fetch(`/api/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: matchId,
          content: newMessage,
        }),
      });

      if (res.ok) {
        const sentMessage = await res.json();
        setMessages((prev) => [...prev, sentMessage]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {//to press enter to send message
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d1117",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "80vw",
          maxWidth: "500px",
          height: "80vh",
          maxHeight: "700px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#1e1e1e",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
            color: "white",
          }}
        >
          {matchUserData && (
            <>
              <Avatar src={matchUserData.profile_pic || "/default-avatar.png"} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Chat with {matchUserData.name}
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            overflowY: "auto",
            padding: 1,
            borderRadius: 2,
            backgroundColor: "#121212",
          }}
        >
          <List>
            {messages.map((msg) => (
              <ListItem
                key={msg.message_id}
                sx={{
                  justifyContent: msg.sender_id === currentUserId ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    maxWidth: "70%",
                    backgroundColor: msg.sender_id === currentUserId ? "#007BFF" : "#E0E0E0",
                    color: msg.sender_id === currentUserId ? "white" : "black",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <ListItemText primary={msg.content} />
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            padding: 1,
            gap: 1,
            backgroundColor: "#121212",
          }}
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            variant="outlined"
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#007BFF",
                },
              },
              input: { color: "white" },
            }}
          />
          <Button
            onClick={sendMessage}
            variant="contained"
            sx={{
              backgroundColor: "#007BFF",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
