import fs from 'fs/promises';
import path from 'path';

export abstract class FS {

  public static async readDir(dirPath: string) {
    let filePaths;
    try {
      const fileNames = await fs.readdir(dirPath);

      filePaths = await fileNames.reduce(
        async (acc, cur) => {
          const awaitedAcc = await acc;
          const filePath = path.join(dirPath, cur);
          awaitedAcc.push(filePath);

          return awaitedAcc;
        },
        Promise.resolve([] as string[]),
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }

    return filePaths;
  }

  public static async fileToBuffer(filePath: string) {
    let contents;
    try {
      const absolutePath = path.resolve(filePath);
      contents = await fs.readFile(absolutePath);
    } catch (err: any) {
      throw new Error(err.message)
    }

    return contents;
  }
}
