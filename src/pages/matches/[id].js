// pages/conversations/[userId].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Conversation() {
  const router = useRouter();
  const { userId } = router.query; // ID of the matched user
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Replace with actual current user ID from authentication context or session
  const currentUserId = 1;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/getMessages?userId1=${currentUserId}&userId2=${userId}`
        );
        const data = await res.json();

        if (res.ok) {
          setMessages(data.messages);
        } else {
          setError(data.error || 'Failed to fetch messages');
        }
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const res = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderId: currentUserId,
            receiverId: userId,
            content: newMessage,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setMessages((prevMessages) => [...prevMessages, data.message]);
          setNewMessage('');
        } else {
          setError(data.error || 'Failed to send message');
        }
      } catch (err) {
        setError('Failed to send message');
      }
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Conversation with User {userId}</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.message_id}>
              <strong>
                {message.sender_id === currentUserId ? 'You' : `User ${message.sender_id}`}
              :</strong>{' '}
              {message.content}
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
