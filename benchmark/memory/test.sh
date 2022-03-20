#!/bin/sh

# Text size in bytes
export TEXT_SIZE=$((100 * 1024 * 1024))

printf "Current testing text size: %s MB\n\n" "$((TEXT_SIZE / 1024 / 1024))"

printf "normalizeSpaces: %s MB\n" "$(node test.js normalizeSpaces)"
printf "normalizeSpacesAs: %s MB\n" "$(node test.js normalizeSpacesAs)"
