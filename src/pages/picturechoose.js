import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function PictureChoose() {
  const [selectedImages, setSelectedImages] = useState([]); // can hold the images
  const [selectedVideo, setSelectedVideo] = useState(null);

  const choosingImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setSelectedImages(theseImages => [...theseImages, newImage]);
    }
  };
  const choosingVideo = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  return (
    <>
      <Head>
        <title>Select Media</title>
        <meta name="description" content="Please choose some pictures and/or videos for your account." />
      </Head>
      <main className={styles.main}>
        <div className={styles.center} style={{ flexDirection: 'column' }}>
          <Image src="/../../ourImages/profpic3.jpg" alt="Profile Pictures" width={100} height={150} priority />
          <h1>Photos and videos for your Harmonize</h1>


          <div className={styles.center} style={{ margin: '20px 0' }}>
            <Image src="/../../ourImages/profpic2.jpg" alt="Profile Pictures" width={200} height={300} priority />
            <div>
              <h2>Choose some photos for your account!</h2>
              <input type="file" accept="image/*" onChange={choosingImage} multiple />
            </div>
            


          </div>
          <Image src="/../../ourImages/grid1.png" alt="Profile Videos" width={400} height={350} priority />

          <div className={styles.center} style={{ margin: '20px 0' }}>
            <Image src="/../../ourImages/profpic1.jpg" alt="Profile Videos" width={220} height={220} priority />
            <div>
              <h2>Choose some videos that will play with your songs!</h2>
              <video src={selectedVideo} controls width="320" height="240" />
              <input type="file" accept="video/*" onChange={choosingVideo} />
            </div>
          </div>

     
        </div>
      </main>
    </>
  );
}


