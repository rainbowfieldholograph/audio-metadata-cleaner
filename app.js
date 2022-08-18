import { createInterface } from 'node:readline';
import { cleanAudiosMetadata } from './services/cleanAudiosMetadata.js';

const NEW_LINE = '\n';

const initCLI = () => {
  let pathToFolder = '';
  let triggerText = '';

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question('Write path to folder:  ', (answer) => {
    pathToFolder = answer;

    readline.question('Write trigger text:  ', (answer) => {
      triggerText = answer;
      readline.close();

      console.log(`folder: ${pathToFolder}${NEW_LINE}trigger text: ${triggerText}${NEW_LINE}`);

      cleanAudiosMetadata(pathToFolder, triggerText);
    });
  });
};

initCLI();
