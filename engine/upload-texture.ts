import * as THREE from 'three';
import { TextureLoader } from 'three';

export const uploadTexture = async (
  imgPath: string
): Promise<THREE.Texture> => {
  return await new TextureLoader().loadAsync(imgPath);
};
