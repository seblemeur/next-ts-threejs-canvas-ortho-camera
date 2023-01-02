import { useEffect, useState } from 'react';
import { Texture } from 'three';
import { uploadTexture } from '../engine/upload-texture';

export const useUploadTexture = (imgPath: string) => {
  const [texture, setTexture] = useState<Texture>();

  useEffect(() => {
    async function fetch() {
      const texture = await uploadTexture(imgPath);

      setTexture(texture);
    }
    fetch();
  }, []);

  return { texture };
};
