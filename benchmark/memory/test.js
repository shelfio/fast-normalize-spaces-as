/* eslint-disable @typescript-eslint/no-var-requires */
const {normalizeSpaces} = require('@shelf/fast-normalize-spaces');
const {normalizeSpaces: normalizeSpacesAs} = require('../../index');

const allFunctions = {normalizeSpaces, normalizeSpacesAs};
const functionName = process.argv[2];
const normalizationFunction = allFunctions[functionName];

if (!normalizationFunction) {
  console.error(`Unknown function name "${functionName}"`);

  process.exit(1);
}

const TEXT_SIZE = +process.env.TEXT_SIZE;

(async () => {
  const data = Buffer.alloc(TEXT_SIZE, ' foo   bar  bazz   ').toString();

  const memoryBefore = process.memoryUsage.rss() / 1024 / 1024;

  await normalizationFunction(data);

  const memoryAfter = process.memoryUsage.rss() / 1024 / 1024;

  process.stdout.write(`${memoryAfter - memoryBefore}`);
})();
