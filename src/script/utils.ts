import { readdir, unlink, writeFileSync } from 'fs';
import { join } from 'path';

export function writeToFile(path: string, data: any) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  writeFileSync(path, data, 'utf-8');
}

export const deleteJsFilesInDir = (dir: string) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.js')) {
        const filePath = join(dir, file);
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
            return;
          }
        });
      }
    });
  });
};
