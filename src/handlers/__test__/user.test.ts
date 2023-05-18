import * as user from "../user";

describe("user handler Unit test", () => {
  it("should create new user", async () => {
    const req = {
      body: {
        username: "testIt",
        password: "testPassword",
      },
    };
    const res = {
      json({ message, token }) {
        expect(token).toBeTruthy();
        expect(message).toBe("User created successfully");
      },
      status(code) {
        expect(code).toBe(200);
      },
    };
    await user.createUser(req, res, () => {});
  });
});
