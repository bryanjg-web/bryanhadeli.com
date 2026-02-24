#!/bin/bash
# Copies your profile photo to the website.
# Run from the Bryanhadeli.com project root: ./scripts/copy-profile-photo.sh

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$HOME/.cursor/projects/Users-bryangunawan-Bryanhadeli-com/assets"
SRC="$ASSETS/Screenshot_2026-02-23_at_10.46.44_pm-ee5c22ed-c5ef-4d76-a613-521acfe51dd1.png"
DEST="$PROJECT_ROOT/images/profile.png"

if [ -f "$SRC" ]; then
  cp "$SRC" "$DEST"
  echo "✓ Profile photo copied to images/profile.png"
else
  echo "✗ Source file not found. Make sure the photo is in your Cursor assets."
fi
