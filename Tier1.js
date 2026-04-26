const fs = require("fs");

function processInstructions(data) {
  // will group by extension tag
  const extensionMap = new Map();

  //this array will store Instructions with mulitble Extension 
  const multiExtensionInstructions = [];

  for (const [mnemonic, details] of Object.entries(data)) {
    const extensions = details.extension || [];

    if (extensions.length > 1) {
      multiExtensionInstructions.push({ mnemonic, extensions });
    }

    for (const extension of extensions) {
      if (!extensionMap.has(extension)) {
        extensionMap.set(extension, {
          count: 0,
          example: mnemonic.toUpperCase()
        });
      }

      const entry = extensionMap.get(extension);
      entry.count += 1;
    }
  }

  return { extensionMap, multiExtensionInstructions };
}

// Main Runner
function main() {
  //load json file
  const file_directory = JSON.parse(
    fs.readFileSync("instr_dict.json", "utf8")
  );

  const { extensionMap } = processInstructions(file_directory);

  const sortedExtensions = Array.from(extensionMap.keys()).sort();

  for (const extension of sortedExtensions) {
    const data = extensionMap.get(extension);
    console.log(
      `${extension} | ${data.count} instructions | e.g. ${data.example}`
    );
  }
}

// ONLY RUN WHEN CALLED DIRECTLY
if (require.main === module) {
  main();
}

// EXPORT FOR TESTS
module.exports = {
  processInstructions
};