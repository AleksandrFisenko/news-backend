import { Request } from "express";
import { extname } from "path";

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, name: string) => void
) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${crypto.randomUUID()}${fileExtName}`);
};
