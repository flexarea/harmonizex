import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function MainPage() {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const users = [
        { id: 1, name: "User One", songs: ["Song 1", "Song 2", "Song 3"], imageUrl: "/needtoadd" },
        { id: 2, name: "User Two", songs: ["Song A", "Song B", "Song C"], imageUrl: "/needtoadd" },
    ];

    function tonextSong() {
        let newIndex = currentSongIndex + 1;
        if (newIndex >= users[currentUserIndex].songs.length) newIndex = 0;
        setCurrentSongIndex(newIndex);
    }
    function topreviousSong() {
        let newIndex = currentSongIndex - 1;
        if (newIndex < 0) newIndex = users[currentUserIndex].songs.length - 1;
        setCurrentSongIndex(newIndex);
    }
    function iflikeUser() {
        console.log(`Liked ${users[currentUserIndex].name}`);
        let nextUserIndex = currentUserIndex + 1;
        if (nextUserIndex >= users.length) nextUserIndex = 0;
        setCurrentUserIndex(nextUserIndex);
        setCurrentSongIndex(0);
    }

    const currentUser = users[currentUserIndex];



    
    return (
        <>
         <Head>
            <title>Main Page</title>
        </Head>
        <main className={styles.main}>
            <div style={{ width: '100%', position: 'absolute', top: '38%' }}>
                <button onClick={topreviousSong} style={{ float: 'left' }}>Previous Song</button>
                <button onClick={tonextSong} style={{ float: 'right' }}>Next Song</button>
            </div>
            <h1>{currentUser.name}</h1>
            <Image src={currentUser.imageUrl} alt="User Image" width={200} height={200} />
            <div>
                <h2>Current Song: {currentUser.songs[currentSongIndex]}</h2>
                <button onClick={iflikeUser} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>Like</button>
            </div>
        </main>
        </>
    );
}


