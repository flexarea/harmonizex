import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useRouter } from 'next/router';

function Conversations({ currentUserId }) {
  const [conversations, setConversations] = useState([]);
  const [, setLikedUsers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mockConversations = [
          {
            id: "1",
            participantId: "1",
            participantName: "Alice",
            lastMessage: "Hey there!",
            timestamp: Date.now(),
          },
          {
            id: "2",
            participantId: "2",
            participantName: "Bob",
            lastMessage: "How are you?",
            timestamp: Date.now() - 100000,
          },
        ];
        const mockLikedUsers = [
          { id: "1", name: "Alice" },
          { id: "2", name: "Bob" },
          { id: "3", name: "Charlie" },
        ];
        setLikedUsers(mockLikedUsers);
        const matchedUserIds = mockLikedUsers
          .filter((user) =>
            mockConversations.some((convo) => convo.participantId === user.id),
          )
          .map((user) => user.id);
        setMatchedUsers(matchedUserIds);
        setConversations(mockConversations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);
  if (loading) return <div>Loading conversations...</div>;
  if (error) return <div className="error">{error}</div>;

  const handleStartConversation = (userId) => {
    const newConversation = {
      id: Date.now().toString(), // Generate a unique ID for the conversation
      participantId: userId,
      participantName: `User ${userId}`, // Replace with actual user name if available
      lastMessage: "",
      timestamp: Date.now(),
    };

    setConversations((prevConversations) => [
      ...prevConversations,
      newConversation,
    ]);
    // console.log(`Starting conversation with user ${userId}`);
    // router.push(`/conversations/${newConversation.id}`);
  };

  return (
    <div className="conversations">
      <h2>Your Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation.id} className="conversation">
              <h3>{conversation.participantName}</h3>
              <p>{conversation.lastMessage || "No messages yet."}</p>
              <span>{new Date(conversation.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}

      <h2>Start a New Conversation</h2>
      {matchedUsers.length === 0 ? (
        <p>No matched users to start a conversation with.</p>
      ) : (
        <ul>
          {matchedUsers.map((userId) => (
            <li key={userId}>
              <button
                type="button"
                onClick={() => handleStartConversation(userId)}
              >
                Start Conversation with User {userId}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Conversations.propTypes = {
  currentUserId: PropTypes.string.isRequired,
};

export default Conversations;
