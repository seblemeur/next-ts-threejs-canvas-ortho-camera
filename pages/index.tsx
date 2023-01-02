import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { useUploadTexture } from '../hooks/useUploadTexture';
import styles from '../styles/Home.module.css';
import * as THREE from 'three';

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLElement>();
  const { texture } = useUploadTexture('musk.png');

  useEffect(() => {
    if (!canvasRef || !texture) {
      return;
    }

    // setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    // image
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = texture.image.width;
    mesh.scale.y = texture.image.height;
    scene.add(mesh);

    // Calculate the width and height of the bounding box
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const width = boundingBox.max.x - boundingBox.min.x;
    const height = boundingBox.max.y - boundingBox.min.y;

    const sizes = {
      width,
      height,
    };

    // camera
    const left = -width / 2;
    const right = width / 2;
    const top = height / 2;
    const bottom = -height / 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.OrthographicCamera(
      left,
      right,
      top,
      bottom,
      near,
      far
    );

    camera.position.z = 1;

    // render
    scene.add(camera);
    renderer.setSize(sizes.width, sizes.height);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }, [texture]);

  return (
    <div className={styles.container}>
      <h1>Canvas with orthographic camera</h1>
      <canvas className={styles.dessin} ref={canvasRef} />
    </div>
  );
};

export default Home;
