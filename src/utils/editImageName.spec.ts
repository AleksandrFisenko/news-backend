import { editFileName } from "./editImageName";

describe("EditImageName", () => {
  it("should generate file name", () => {
    const req = {} as any;
    const file = { originalname: "image.jpg" } as any;
    const callback = jest.fn();
    const fixUUID = () => "unit-test-uuid";

    editFileName(req, file, callback, fixUUID);

    expect(callback).toHaveBeenCalledWith(null, "image-unit-test-uuid.jpg");
  });
});
