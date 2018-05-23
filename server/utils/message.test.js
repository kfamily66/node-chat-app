const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message", () => {
    const from = "admin";
    const text = "this is a test message";
    const message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe("number");
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location message", () => {
    const from = "admin";
    const latitude = 50;
    const longitude = 100;

    const message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(typeof message.createdAt).toBe("number");
    expect(message.url).toBe("https://google.com/maps?q=50,100");
  });
});
