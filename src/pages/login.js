import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';  

export default function LoginPage() {
  const handleLogin = async () => {
    window.location.href = '/api/spotify/auth'; // Modify as necessary for the Spotify auth endpoint
  };

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>Login to Your Account</h1>

        <div className={styles.inputbox}>
          <ion-icon name="mail-outline"></ion-icon>
          <input type="email" required placeholder="Email" className={styles.input} />
        </div>

        <div className={styles.inputbox}>
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input type="password" required placeholder="Password" className={styles.input} />
        </div>

        <div className={styles.forget}>
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>

        <button type="button" className={styles.button}>Log in</button>
        <button type="button" onClick={handleLogin} className={styles.spotifyBtn}>
          Login with Spotify
        </button>

        <div className={styles.register}>
          <p>
            Don&apos;t have an account? <a href="#">Register Now</a>
          </p>
        </div>
      </form>
    </section>
  );
}
