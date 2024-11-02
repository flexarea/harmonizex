import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LoginForm.module.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const bypassAuth = process.env.REACT_APP_BYPASS_SPOTIFY_AUTH === 'true';

  // Set a flag for bypassing authentication
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if bypassAuth is true, skip the email/password check
    if (bypassAuth) {
      // simulate successful login
      onLogin({ email: 'demo@example.com', password: 'demoPassword' });
      return; // exit early
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      return; // exit early
    }

    onLogin({ email, password });
  };
  

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={bypassAuth} // Optionally disable input fields
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={bypassAuth} // Optionally disable input fields
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
