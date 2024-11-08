import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import styles from '../styles/matches.module.css';

function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  // const router = useRouter();

  const matches = [
    { id: '2', name: 'John Smith', avatarUrl: 'https://images.unsplash.com/photo-1725902380927-081e7400b920?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Alice Johnson', avatarUrl: 'https://plus.unsplash.com/premium_photo-1697477564565-2a95d76e921a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Sidebar with Matches */}
      <div className={styles.sidebar}>
        <h2>Matches</h2>
        {matches.map((match) => (
          <div
            key={match.id}
            className={styles.matchCard}
            onClick={() => handleMatchSelect(match)}
          >
            <img src={match.avatarUrl} alt={match.name} className={styles.avatar} />
            <div className={styles.matchDetails}>
              <h3>{match.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Conversation Area */}
      <div className={styles.conversationArea}>
        {selectedMatch ? (
          <>
            <div className={styles.messageList}>
              <div className={`${styles.message} ${styles.received}`}>Hello, how's it going?</div>
              <div className={`${styles.message} ${styles.sent}`}>Hi! Great, how about you?</div>
              {/* Add more messages as needed */}
            </div>
            <div className={styles.messageInputArea}>
              <input type="text" className={styles.messageInput} placeholder="Type a message..." />
              <button type = 'button' className={styles.sendButton}>→</button>
            </div>
          </>
        ) : (
          <div className={styles.messageList} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Select a match to start a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchesPage;
