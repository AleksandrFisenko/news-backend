import { editFileName } from "./editImageName";
import * as crypto from "crypto";

describe("EditImageName", () => {
  it("should generate file name", () => {
    const req = {} as any;
    const file = { originalname: "image.jpg" } as any;
    const callback = jest.fn();

    jest.spyOn(crypto, "randomUUID").mockReturnValue('unit-test-uuid-xd-mra');

    editFileName(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, "image-unit-test-uuid-xd-mra.jpg");
  });
});
