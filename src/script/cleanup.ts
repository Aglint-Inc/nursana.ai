import { deleteJsFilesInDir } from './utils';

const cleanupDirs = [__dirname, 'src/constant'];
cleanupDirs.forEach((path) => deleteJsFilesInDir(path));
