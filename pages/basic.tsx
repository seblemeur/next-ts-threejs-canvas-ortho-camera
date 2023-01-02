import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { useUploadTexture } from '../hooks/useUploadTexture';
import styles from '../styles/Home.module.css';
import * as THREE from 'three';

const Basic: NextPage = () => {
  const canvasRef = useRef<HTMLElement>();

  useEffect(() => {
    if (!canvasRef) {
      return;
    }
    console.log('call');

    const sizes = {
      width: 800,
      height: 600,
    };

    // Scene
    const scene = new THREE.Scene();

    // Object
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(mesh);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    // const aspectRatio = sizes.width / sizes.height
    // const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  }, [canvasRef]);

  return (
    <div className={styles.container}>
      <h1>Canvas with orthographic camera</h1>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Basic;
