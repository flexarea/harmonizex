import Head from 'next/head';
import { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Preferences() {

// profile variables to keep track of
  const [lookingFor, setLookingFor] = useState({
    friends: false, lover: false, band: false, jamBuddies: false
  });
  const [pronouns, setPronouns] = useState('');
  const [gender, setGender] = useState('');
  const [sexuality, setSexuality] = useState('');
  const [distance, setDistance] = useState(20);
  const [age, setAge] = useState({ min: 18, max: 50 });

  const boxClicked = (event) => {
    const { name, checked } = event.target;
    setLookingFor(prev => ({ ...prev, [name]: checked }));
  };


  return (
    <>
      <Head>
        <title>User Preferences</title>
        <meta name="description" content="" />
      </Head>

      <main className={styles.main}>
        <h1>Preferences</h1>
        <form style={{ width: '100%', maxWidth: '800px' }}>
          <fieldset style={{ marginBottom: '20px' }}>
            <legend>Looking for</legend>
            <div style={{ marginBottom: '15px' }}>
              <label>
                <input type="checkbox" name="friends" checked={lookingFor.friends} onChange={boxClicked} />
                Friends
              </label>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>
                <input type="checkbox" name="lover" checked={lookingFor.lover} onChange={boxClicked} />
                Lover
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input type="checkbox" name="band" checked={lookingFor.band} onChange={boxClicked} />
                Band
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input type="checkbox" name="jamBuddies" checked={lookingFor.jamBuddies} onChange={boxClicked} />
                Jam Buddies
              </label>
            </div>
          </fieldset>


          <div style={{ marginBottom: '20px' }}>
            <label>Pronouns:</label>
            <input type="text" value={pronouns} onChange={(e) => setPronouns(e.target.value)} placeholder="e.g., They/Them" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Your gender" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Sexuality:</label>
            <input type="text" value={sexuality} onChange={(e) => setSexuality(e.target.value)} placeholder="Your sexuality" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Distance (mi.):</label>
            <input type="range" min="1" max="200" value={distance} onChange={(e) => setDistance(e.target.value)} />
            {distance} mi.
          </div>

          <fieldset style={{ marginBottom: '20px' }}>


            <legend>Age range</legend>
            <input type="number" value={age.min} min="18" onChange={(e) => setAge({...age, min: e.target.value})} /> to 
            <input type="number" value={age.max} max="100" onChange={(e) => setAge({...age, max: e.target.value})} />

          </fieldset>

          <button type="submit">Save Preferences</button>

        </form>
      </main>
    </>
  );
}


