import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMatches } from '../../context/MatchesContext';
import axios from 'axios';

function Conversation() {
  const router = useRouter();
  const { userId } = router.query; // Gets the userId from the URL
  const { matches } = useMatches(); // Retrieve matches from global state
  const [user, setUser] = useState(null); // Store the matched user
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // fetch messages for the conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) return;

      const matchedUser = matches.find((match) => match.id === userId);
      if (!matchedUser) {
        setError('User not found in matches.');
        return;
      }
      setUser(matchedUser);

      try {
        const { data } = await axios.get(`/api/messages/${userId}`); // Fetch messages from the API
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, matches]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      senderId: 'currentUserId', // Replace with the actual logged-in user's ID
      receiverId: userId,
      content: newMessage,
      timestamp: Date.now(),
    };

    try {
      const { data } = await axios.post('/api/messages', message); // Send the message to the API
      setMessages((prevMessages) => [...prevMessages, data]); // Add the new message to the UI
      setNewMessage('');
    } catch (err) {
      console.error(err);
      setError('Failed to send message.');
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Conversation with {user?.name || 'Unknown User'}</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.senderId === 'currentUserId' ? 'You' : user?.name}:</strong> {message.content}
              <span> {new Date(message.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Conversation;
