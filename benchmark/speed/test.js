const benny = require("benny");
const fLI = require("fast-lorem-ipsum");
const { normalizeSpaces } = require("@shelf/fast-normalize-spaces");
const { normalizeSpaces: normalizeSpacesAs } = require("../../index");

const words5000 = fLI(5000, "w");
const words50000 = fLI(50000, "w");
const words500000 = fLI(500000, "w");
const words5000000 = fLI(5000000, "w");

benny.suite(
  "~33kb",
  benny.add("@shelf/fast-normalize-spaces", () => {
    normalizeSpaces(words5000);
  }),
  benny.add("@shelf/fast-normalize-spaces-as", () => {
    normalizeSpacesAs(words5000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  "~330kb",
  benny.add("@shelf/fast-normalize-spaces", () => {
    normalizeSpaces(words50000);
  }),
  benny.add("@shelf/fast-normalize-spaces-as", () => {
    normalizeSpacesAs(words50000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  "~3.3mb",
  benny.add("@shelf/fast-normalize-spaces", () => {
    normalizeSpaces(words500000);
  }),
  benny.add("@shelf/fast-normalize-spaces-as", () => {
    normalizeSpacesAs(words500000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  "~33mb",
  benny.add("@shelf/fast-normalize-spaces", () => {
    normalizeSpaces(words5000000);
  }),
  benny.add("@shelf/fast-normalize-spaces-as", () => {
    normalizeSpacesAs(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);
