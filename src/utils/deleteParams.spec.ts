import { deleteUserParams } from "./deleteParams";
import type { User } from "../models/users.model";

describe("deleteUserParams", () => {
	it("should delete password and updatedAt and return user", () => {
		const createdAt = new Date("2024-01-01T00:00:00.000Z");
		const updatedAt = new Date("2024-01-02T00:00:00.000Z");
		const user = {
			id: 1,
			email: "user@mrazota.com",
			password: "secret",
			login: "username",
			avatarUrl: "https://mrazota.com/avatar.png",
			createdAt,
			updatedAt,
		} as unknown as User;

		const result = deleteUserParams(user);

		expect(result).toEqual({
			id: 1,
			email: "user@mrazota.com",
			login: "username",
			avatarUrl: "https://mrazota.com/avatar.png",
			createdAt,
		});
		expect(result as unknown as Record<string, unknown>).not.toHaveProperty("password");
		expect(result as unknown as Record<string, unknown>).not.toHaveProperty("updatedAt");
	});

	it("should not mutate user object", () => {
		const user = {
			id: 2,
			email: "user2@mrazota.com",
			password: "secret2",
			login: "user2",
			createdAt: new Date(),
			updatedAt: new Date(),
		} as unknown as User;

		const originalCopy = { ...user } as Record<string, unknown>;
		void deleteUserParams(user);

		expect(user).toEqual(originalCopy);
		expect((user as unknown as Record<string, unknown>).password).toBe("secret2");
		expect((user as unknown as Record<string, unknown>).updatedAt).toBeInstanceOf(Date);
	});
});
