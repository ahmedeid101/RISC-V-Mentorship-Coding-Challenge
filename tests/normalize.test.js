const { normalizeExtension } = require("../utils");

test("removes rv prefix", () => {
  expect(normalizeExtension("rv32_zba")).toBe("zba");
});

test("handles simple extension", () => {
  expect(normalizeExtension("rv_i")).toBe("i");
});