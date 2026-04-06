#!/bin/bash
# DANVERSE-X — Pre-Write Path Guard
# Blocks writes to forbidden directories

FORBIDDEN_PATHS=(
  "node_modules"
  ".next"
  "out"
  "dist"
  ".git"
)

# Get the file path from the tool input (passed via stdin or env)
FILE_PATH="${1:-}"

if [ -z "$FILE_PATH" ]; then
  exit 0  # No path provided — allow
fi

for forbidden in "${FORBIDDEN_PATHS[@]}"; do
  if [[ "$FILE_PATH" == *"/$forbidden/"* ]] || [[ "$FILE_PATH" == *"/$forbidden" ]] || [[ "$FILE_PATH" == "$forbidden/"* ]]; then
    echo "❌ BLOCKED: Cannot write to $forbidden/ — this is a forbidden directory in DANVERSE-X"
    echo "   Path: $FILE_PATH"
    exit 1
  fi
done

exit 0
