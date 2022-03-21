const fs = require("fs");
const AsBind = require("as-bind/dist/as-bind.cjs");

const wasm = fs.readFileSync(__dirname + "/build/optimized.wasm");
const wasmModule = AsBind.instantiateSync(wasm);

function normalizeSpaces(string) {
  const result = wasmModule.exports.normalizeSpaces(string);

  return Buffer.from(result).toString("utf16le");
}

module.exports = { normalizeSpaces };
