import type { NextPage } from 'next';
import { useRef } from 'react';
import { useUploadTexture } from '../hooks/useUploadTexture';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLElement>();
  const { texture: colorTexture } = useUploadTexture("assets/musk.png");

  return (
    <div className={styles.container}>
      <h1>Canvas with orthographic camera</h1>
      <canvas className={styles.dessin} ref={canvasRef} />
    </div>
  );
};

export default Home;
