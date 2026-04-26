const { compareExtensions } = require("../tier2");

test("detects matched extensions", () => {
  const jsonExts = new Set(["zba", "zbb"]);
  const manualExts = new Set(["zba", "zbc"]);

  const result = compareExtensions(jsonExts, manualExts);

  expect(result.matched).toContain("zba");
  expect(result.onlyInJson).toContain("zbb");
  expect(result.onlyInManual).toContain("zbc");
});