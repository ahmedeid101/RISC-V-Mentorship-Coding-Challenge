const fs = require("fs");
const path = require("path");
const {
  normalizeExtension,
  normalizeManualExt,
  isValidExtension,
} = require("./utils");

// Load JSON file >> Extract Extensions from JSON
function getJsonExtensions(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const extSet = new Set();

  for (const info of Object.values(data)) {
    const extensions = info.extension || [];

    extensions.forEach((ext) => {
      ext.split("_").forEach((part) => {
        const normalized = normalizeExtension(part);
        if (normalized) extSet.add(normalized);
      });
    });
  }

  return extSet;
}

/*Extract Extensions from ISA Manual (AsciiDoc)
  scan all .adoc files under src/
*/
function getManualExtensions(manualPath) {
  const srcPath = path.join(manualPath, "src");

  const extSet = new Set();

  function scanDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith(".adoc")) {
        const content = fs.readFileSync(fullPath, "utf-8");

        // Match extensions like Zba, Zicsr, M, F, A, etc.
        // const matches = content.match(/\b(Z[a-zA-Z0-9]+|[IMAFDC])\b/g);
        const matches = content.match(
          /\b(Z[a-z0-9]{2,}|Zv[a-z0-9]+|Zk[a-z0-9]+|Zc[a-z0-9]*|Zb[a-z0-9]*|Zf[a-z0-9]*|Zve\d+[a-z]*|[IMAFDC])\b/gi,
        );

        if (matches) {
          matches.forEach((ext) => {
            const normalized = normalizeManualExt(ext);
            if (isValidExtension(normalized)) {
              extSet.add(normalized);
            }
          });
        }
      }
    });
  }

  scanDir(srcPath);
  return extSet;
}

//Cross-Reference Logic
function compareExtensions(jsonExts, manualExts) {
  const onlyInJson = [];
  const onlyInManual = [];
  const matched = [];

  jsonExts.forEach((ext) => {
    if (manualExts.has(ext)) {
      matched.push(ext);
    } else {
      onlyInJson.push(ext);
    }
  });

  manualExts.forEach((ext) => {
    if (!jsonExts.has(ext)) {
      onlyInManual.push(ext);
    }
  });

  return { matched, onlyInJson, onlyInManual };
}

//Reporting
function printReport(result) {
  console.log("\n=== Cross Reference Report ===\n");

  console.log(`Matched Extensions: ${result.matched.length}`);
  console.log(`JSON Only: ${result.onlyInJson.length}`);
  console.log(`Manual Only: ${result.onlyInManual.length}`);

  console.log("\n--- Extensions in JSON but NOT in Manual ---");
  result.onlyInJson.forEach((ext) => console.log(ext));

  console.log("\n--- Extensions in Manual but NOT in JSON ---");
  result.onlyInManual.forEach((ext) => console.log(ext));
}

//Main Runner
function main() {
  const jsonPath = path.join(__dirname, "instr_dict.json");
  const manualPath = path.join(__dirname, "riscv-isa-manual");

  const jsonExts = getJsonExtensions(jsonPath);
  const manualExts = getManualExtensions(manualPath);

  const result = compareExtensions(jsonExts, manualExts);

  printReport(result);
}

main();

module.exports = {compareExtensions};