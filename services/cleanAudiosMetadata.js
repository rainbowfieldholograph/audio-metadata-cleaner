import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import * as ffmetadata from 'ffmetadata';
import { changeAudioMetadata } from './changeAudioMetadata.js';

// TODO: add recursive
export const cleanAudiosMetadata = async (dirPath, triggerText) => {
  try {
    const dirFilePaths = await fsPromises.readdir(dirPath);
    const fullPaths = dirFilePaths.map((filePath) => {
      return path.join(dirPath, filePath);
    });

    for (const src of fullPaths) {
      ffmetadata.read(src, (err, data) => {
        const { base } = path.parse(src);

        if (err) {
          console.error(`Error reading file: ${base}`);
          return;
        }

        const keysToClear = new Set();

        for (const [key, value] of Object.entries(data)) {
          const keyLower = key.toLowerCase();
          const valueLower = value.toLowerCase();
          const triggerLower = triggerText.toLowerCase();

          const hasTriggerText =
            keyLower.includes(triggerLower) || valueLower.includes(triggerLower);

          if (hasTriggerText) keysToClear.add(key);
        }

        const metadata = {};
        for (const key of keysToClear) {
          metadata[key] = '';
        }

        changeAudioMetadata(src, metadata);
      });
    }
  } catch (error) {
    console.error('Error when reading dir: ', error.message);
  }
};
