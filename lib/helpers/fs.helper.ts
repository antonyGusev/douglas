import fs from 'fs/promises';
import path from 'path';

export class FS {
  constructor() {}

  async readDir(dirPath: string) {
    let filePaths;
    try {
      const fileNames = await fs.readdir(dirPath);

      filePaths = await fileNames.reduce(async (acc, cur) => {
        const awaitedAcc = await acc;
        const filePath = path.join(dirPath, cur);
        awaitedAcc.push(filePath);

        return awaitedAcc;
      }, Promise.resolve([] as string[]));
    } catch (error) {
      throw new Error((error as Error).message);
    }

    return filePaths;
  }
}
