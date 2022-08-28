import * as ffmetadata from 'ffmetadata';
import { isFileAudio } from '../helpers/isFileAudio.js';

export const changeAudioMetadata = (fileSrc, metadata) => {
  if (!isFileAudio(fileSrc)) return;

  ffmetadata.write(fileSrc, metadata, (err) => {
    if (err) {
      console.error('Error while reading metadata:', err.message);
      return;
    }

    console.log('done:', fileSrc);
  });
};
