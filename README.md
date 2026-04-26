# RISC-V Extensions Analysis Tool

## Overview
This project analyzes the RISC-V instruction set by:
- Parsing instruction metadata
- Grouping by extensions
- Cross-referencing with the official ISA manual
- Visualizing relationships between extensions

---

## Features

### Tier 1
- Parse `instr_dict.json`
- Group instructions by extension
- Detect multi-extension instructions

### Tier 2
- Extract extensions from ISA manual (AsciiDoc)
- Normalize naming differences
- Cross-reference datasets

### Tier 3 (Bonus)
- Unit tests (Jest)
- Extension relationship graph
- Graph visualization (GraphViz)

---

## Installation

```bash
git clone <your-repo>
cd project
npm install
```

## Run Tier 1
- node index.js

## Run Tier 2
- node tier2.js

## Run Tier 3 Graph
- node tier3.js

## Run Tests
- npm test

## Sample Output
- Matched Extensions: 50
- JSON Only: 26
- Manual Only: 67