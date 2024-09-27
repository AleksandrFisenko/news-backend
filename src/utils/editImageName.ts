import { Request } from "express";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, name: string) => void
) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${uuidv4()}${fileExtName}`);
};
