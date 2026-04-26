function normalizeExtension(extension) {
  if (!extension) return null;

  return extension
    .toLowerCase()
    .replace(/^rv\d*_?/, "")
    .replace(/^rv/, "")
    .trim();
}

// Convert ISA manual format (Zba >> zba)
function normalizeManualExtension(extension) {
  return extension.toLowerCase().trim();
}

function isValidExtension(ext) {
  // ❌ Reject obvious garbage words
  if (
    ext.startsWith("zero") ||
    ext === "zip" ||
    ext === "zext"
  ) {
    return false;
  }

  // Single-letter base ISA
  if (/^[imafdcqhvus]$/.test(ext)) return true;

  // Standard extensions (must start with z + meaningful pattern)
  if (/^z[a-z0-9]{2,}$/.test(ext)) {
    // ❗ Extra safety: reject English-like words
    if (/^z(e|er|ero)/.test(ext)) return false;
    return true;
  }

  // Supervisor extensions (s...)
  if (/^s[a-z0-9]+$/.test(ext)) return true;

  return false;
}

module.exports = {
  normalizeExtension,
  normalizeManualExt: normalizeManualExtension,
  isValidExtension
};