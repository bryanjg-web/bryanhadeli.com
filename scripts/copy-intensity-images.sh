#!/bin/bash
# Copies the Intensity is the strategy blog images from Cursor assets.
# Run from the Bryanhadeli.com project root: ./scripts/copy-intensity-images.sh

set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$HOME/.cursor/projects/Users-bryangunawan-Bryanhadeli-com/assets"
DEST="$PROJECT_ROOT/images/intensity-is-the-strategy"

mkdir -p "$DEST"

if [ -f "$ASSETS/issue_tree_screenshot-cfa924d2-a924-445f-a247-0ed0b4cc9426.png" ]; then
  cp "$ASSETS/issue_tree_screenshot-cfa924d2-a924-445f-a247-0ed0b4cc9426.png" "$DEST/issue-tree.png"
  echo "✓ Copied issue-tree.png"
else
  echo "✗ Source file not found: issue tree screenshot"
fi

if [ -f "$ASSETS/amazon_shoe_screenshot-f6be7fed-6425-427d-8b1d-3fa220a4033d.png" ]; then
  cp "$ASSETS/amazon_shoe_screenshot-f6be7fed-6425-427d-8b1d-3fa220a4033d.png" "$DEST/amazon-shoe.png"
  echo "✓ Copied amazon-shoe.png"
else
  echo "✗ Source file not found: Amazon shoe screenshot"
fi
