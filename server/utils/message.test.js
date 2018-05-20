const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage:", () => {
  it("should generate correct message", () => {
    const from = "admin";
    const text = "this is a test message";
    const message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe("number");
  });
});
