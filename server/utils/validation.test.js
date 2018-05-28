const expect = require("expect");

const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should allow string with non-spaces characters", () => {
    const str = "non-empty str";
    expect(isRealString(str)).toBe(true);
  });

  it("should reject string with only spaces", () => {
    const str = "     ";
    expect(isRealString(str)).toBe(false);
  });

  it("should reject non-string values", () => {
    const obj = { name: "name" };
    expect(isRealString(obj)).toBe(false);
  });
});
