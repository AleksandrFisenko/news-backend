import { BadRequestException } from "@nestjs/common";
import { Request } from "express";

import { AppError } from "../common/errors";

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, accept: boolean) => void
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException(AppError.IMAGE_TYPE), false);
  }
  callback(null, true);
};
