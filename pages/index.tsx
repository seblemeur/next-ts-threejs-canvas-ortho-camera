import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { useUploadTexture } from '../hooks/useUploadTexture';
import styles from '../styles/Home.module.css';
import * as THREE from 'three';

const Home: NextPage = () => {
  const canvas = useRef<HTMLElement>();
  const { texture } = useUploadTexture('assets/musk.png');

  useEffect(() => {
    if (!texture) {
      return;
    }
    console.log('call');

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
    });
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = texture.image.width;
    mesh.scale.y = texture.image.height;

    scene.add(mesh);

    const aspectRatio = texture.image.width / texture.image.height;
    const camera = new THREE.OrthographicCamera(
      -1 * aspectRatio,
      1 * aspectRatio,
      1,
      -1,
      0.1,
      100
    );

    //@ts-ignore
    canvas.width = mesh.offsetWidth;
    //@ts-ignore
    canvas.height = mesh.offsetHeight;
    //@ts-ignore
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }, [texture]);

  return (
    <div className={styles.container}>
      <h1>Canvas with orthographic camera</h1>
      <canvas className={styles.dessin} ref={canvas} />
    </div>
  );
};

export default Home;
