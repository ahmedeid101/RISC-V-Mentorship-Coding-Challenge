const fs = require("fs");
const { processInstructions } = require("./Tier1");

function buildExtensionGraph(extensionMap) {
  const graph = {};

  for (const ext of extensionMap.keys()) {
    graph[ext] = [];
  }

  return graph;
}

function printGraph(graph) {
  for (const [ext, neighbors] of Object.entries(graph)) {
    console.log(ext, "->", neighbors.join(", "));
  }
}

function main() {
  const data = JSON.parse(fs.readFileSync("instr_dict.json", "utf8"));

  const { extensionMap } = processInstructions(data);

  const graph = buildExtensionGraph(extensionMap);

  printGraph(graph);
}

if (require.main === module) {
  main();
}