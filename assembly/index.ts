const SPACE_CODE = 32;

const WHITESPACES_CODES = new Set<number>();

WHITESPACES_CODES.add(9);
WHITESPACES_CODES.add(10);
WHITESPACES_CODES.add(11);
WHITESPACES_CODES.add(12);
WHITESPACES_CODES.add(13);
WHITESPACES_CODES.add(32);
WHITESPACES_CODES.add(160);
WHITESPACES_CODES.add(5760);
WHITESPACES_CODES.add(6158);
WHITESPACES_CODES.add(8192);
WHITESPACES_CODES.add(8193);
WHITESPACES_CODES.add(8194);
WHITESPACES_CODES.add(8195);
WHITESPACES_CODES.add(8196);
WHITESPACES_CODES.add(8197);
WHITESPACES_CODES.add(8198);
WHITESPACES_CODES.add(8199);
WHITESPACES_CODES.add(8200);
WHITESPACES_CODES.add(8201);
WHITESPACES_CODES.add(8202);
WHITESPACES_CODES.add(8232);
WHITESPACES_CODES.add(8233);
WHITESPACES_CODES.add(8239);
WHITESPACES_CODES.add(8287);
WHITESPACES_CODES.add(12288);
WHITESPACES_CODES.add(65279);

const WHITESPACES_BITMAP = new Uint8Array(65535).map((_, i) =>
  WHITESPACES_CODES.has(i) ? 1 : 0
);

/**
 * Strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */
export function normalizeSpaces(string: string): ArrayBuffer {
  const processedChars = new Uint16Array(string.length).fill(SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = 0;

  for (let i = 0; i < string.length; i++) {
    const charCode = string.charCodeAt(i);
    const isWhitespace = isWhitespaceCharCode(charCode);

    if (!isWhitespace) {
      lastProcessedIndex++;

      processedChars[lastProcessedIndex] = charCode;
    } else if (!isLastCharWhitespace) {
      lastProcessedIndex++;
    }

    isLastCharWhitespace = isWhitespace;
  }

  // If the original string has whitespaces at the start or at the end, the first and the
  // last processed chars should be single whitespaces, so we need to make offset from both
  // ends to trim they
  const firstChar = processedChars[0];
  const lastChar = processedChars[lastProcessedIndex];

  const startIndex = firstChar === SPACE_CODE ? 1 : 0;
  const endIndex =
    lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;

  return processedChars.buffer.slice(
    startIndex * Uint16Array.BYTES_PER_ELEMENT,
    endIndex * Uint16Array.BYTES_PER_ELEMENT
  );
}

// Alternative realization with Assemblyscript String.UTF16 API(it is slower)
// export function normalizeSpaces(string: string): string {
//   const chars = Uint16Array.wrap(String.UTF16.encode(string));
//   const processedChars = new Uint16Array(string.length).fill(SPACE_CODE);

//   let lastProcessedIndex = -1;
//   let isLastCharWhitespace = 0;

//   for (let i = 0; i < chars.length; i++) {
//     const charCode = chars[i];
//     const isWhitespace = isWhitespaceCharCode(charCode);

//     if (!isWhitespace) {
//       lastProcessedIndex++;

//       processedChars[lastProcessedIndex] = charCode;
//     } else if (!isLastCharWhitespace) {
//       lastProcessedIndex++;
//     }

//     isLastCharWhitespace = isWhitespace;
//   }

//   // If the original string has whitespaces at the start or at the end, the first and the
//   // last processed chars should be single whitespaces, so we need to make offset from both
//   // ends to trim they
//   const firstChar = processedChars[0];
//   const lastChar = processedChars[lastProcessedIndex];

//   const startIndex = firstChar === SPACE_CODE ? 1 : 0;
//   const endIndex =
//     lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;
//   const length = (endIndex - startIndex) * Uint16Array.BYTES_PER_ELEMENT;

//   return String.UTF16.decode(
//     processedChars.buffer.slice(
//       startIndex * Uint16Array.BYTES_PER_ELEMENT,
//       endIndex * Uint16Array.BYTES_PER_ELEMENT
//     )
//   );
// }

function isWhitespaceCharCode(code: i32): i32 {
  return WHITESPACES_BITMAP[code];
}
