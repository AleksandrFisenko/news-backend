import { BadRequestException } from "@nestjs/common";
import { imageFileFilter } from "./imageFilter";

describe("imageFilter", () => {
  it("should allow image files", () => {
    const req = {} as any;
    const file = { originalname: "image.jpg" } as any;
    const callback = jest.fn();

    imageFileFilter(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it("should reject non-image files", () => {
    const req = {} as any;
    const file = { originalname: "image.txt" } as any;
    const callback = jest.fn();

    imageFileFilter(req, file, callback);

    expect(callback).toHaveBeenCalledWith(expect.any(BadRequestException), false);
  });

  it("should reject unsupported image formats", () => {
    const req = {} as any;
    const file = { originalname: "image.gif" } as any;
    const callback = jest.fn();

    imageFileFilter(req, file, callback);

    expect(callback).toHaveBeenCalledWith(expect.any(BadRequestException), false);
  });
});
