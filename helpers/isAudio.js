import * as mime from 'mime-types';

export const isFileAudio = (filePath) => {
  const mimeType = mime.contentType(filePath); // return false if can't detect mimetype
  if (!mimeType) return false;

  const isAudio = mimeType.includes('audio');
  if (!isAudio) return false;

  return true;
};
