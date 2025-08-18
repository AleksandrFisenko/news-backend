import { Request } from "express";
import { extname } from "path";
import * as crypto from 'crypto';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, name: string) => void,
  randomString: () => string = crypto.randomUUID
) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${randomString()}${fileExtName}`);
};
