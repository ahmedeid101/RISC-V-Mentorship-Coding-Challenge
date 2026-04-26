const { processInstructions } = require("../Tier1");

test("groups instructions by extension", () => {
  const mock = {
    add: { extension: ["rv_i"] },
    sub: { extension: ["rv_i"] },
    mul: { extension: ["rv_m"] },
  };

  const { extensionMap } = processInstructions(mock);

  expect(extensionMap.get("rv_i").count).toBe(2);
  expect(extensionMap.get("rv_m").count).toBe(1);
});
