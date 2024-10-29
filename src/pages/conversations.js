import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Conversations({ currentUserId }) {
  const [conversations, setConversations] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetching liked users
        const likedResponse = await fetch(`/api/users/${currentUserId}/likes`);
        if (!likedResponse.ok) {
          throw new Error('Failed to fetch liked users');
        }
        const likedData = await likedResponse.json();
        setLikedUsers(likedData);

        // fetching conversations
        const conversationResponse = await fetch(`/api/users/${currentUserId}/conversations`);
        if (!conversationResponse.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const conversationData = await conversationResponse.json();
        setConversations(conversationData);
        
        // finding matched users
        const matchedUserIds = likedData.filter(user => 
          conversationData.some(convo => convo.participantId === user.id)
        ).map(user => user.id);
        setMatchedUsers(matchedUserIds);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  const handleStartConversation = (userId) => {
    console.log(`Starting conversation with user ID: ${userId}`);

  };

  if (loading) return <div>Loading conversations...</div>;
  if (error) return <div className="error">{error}</div>;

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
              <button onClick={() => handleStartConversation(userId)}>
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
