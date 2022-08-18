import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import * as ffmetadata from 'ffmetadata';
import { isFileAudio } from '../helpers/isAudio.js';

// TODO: add recursive
export const cleanAudiosMetadata = async (dirPath, triggerText) => {
  try {
    const dirFilePaths = await fsPromises.readdir(dirPath);
    const fullPaths = dirFilePaths.map((filePath) => {
      return path.join(dirPath, filePath);
    });

    for (const src of fullPaths) {
      const { base } = path.parse(src);

      if (!isFileAudio(base)) continue;

      ffmetadata.read(src, (err, data) => {
        if (err) {
          console.error('Error reading metadata:', err);
          return;
        }

        const keysToClear = new Set();

        for (const [key, value] of Object.entries(data)) {
          const keyLower = key.toLowerCase();
          const valueLower = value.toLowerCase();
          const triggerLower = triggerText.toLowerCase();

          const hasTriggerText =
            keyLower.includes(triggerLower) ||
            valueLower.includes(triggerLower);

          if (hasTriggerText) {
            keysToClear.add(key);
          }
        }

        const metadata = {};
        for (const key of keysToClear) {
          metadata[key] = '';
        }

        ffmetadata.write(src, metadata, (err) => {
          if (err) {
            console.error('Error while reading metadata:', err);
            return;
          }

          console.log('done:', src);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};
