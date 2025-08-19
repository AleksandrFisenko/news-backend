import { Request } from "express";
import { extname } from "path";
import * as crypto from "crypto";

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, name: string) => void,
) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  const randomUUID = crypto.randomUUID();
  callback(null, `${name}-${randomUUID}${fileExtName}`);
};
