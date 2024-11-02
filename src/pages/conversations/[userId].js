// pages/conversations/[userId].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Conversation() {
  const router = useRouter();
  const { userId } = router.query; // Get the userId from the URL
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        // mock messages data
        const mockMessages = [
          { id: '1', senderName: 'Alice', content: 'Hey! How are you?', timestamp: Date.now() - 100000 },
          { id: '2', senderName: 'Bob', content: 'What are you up to?', timestamp: Date.now() - 50000 },
        ];

        // simulate a delay to mimic fetching from an API
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockMessages);
          }, 1000); // 1-second delay
        });

        setMessages(data);
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
            <li key={message.id}>
              <strong>{message.senderName}:</strong> {message.content}
              <span>{new Date(message.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Conversation;
