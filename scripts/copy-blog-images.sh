#!/bin/bash
# Copies the Stake review screenshots into the blog post images folder.
# Run from the Bryanhadeli.com project root: ./scripts/copy-blog-images.sh

set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$HOME/.cursor/projects/Users-bryangunawan-Bryanhadeli-com/assets"
DEST="$PROJECT_ROOT/images/energy-is-a-skill"

mkdir -p "$DEST"

if [ -f "$ASSETS/Jack_W.-fc49c073-a074-4687-96ee-1bb50057a894.png" ]; then
  cp "$ASSETS/Jack_W.-fc49c073-a074-4687-96ee-1bb50057a894.png" "$DEST/jack-review.png"
  echo "✓ Copied jack-review.png"
else
  echo "✗ Source file not found: Jack_W. review"
fi

if [ -f "$ASSETS/DODO_DONOTBUY_2_posts-5cfd1914-f47b-4ee8-974b-14a11715c704.png" ]; then
  cp "$ASSETS/DODO_DONOTBUY_2_posts-5cfd1914-f47b-4ee8-974b-14a11715c704.png" "$DEST/dodo-review.png"
  echo "✓ Copied dodo-review.png"
else
  echo "✗ Source file not found: DODO review"
fi

if [ -f "$ASSETS/IMG_1787-f75f5572-cdf2-46ce-b5b7-d3e0382c1333.png" ]; then
  cp "$ASSETS/IMG_1787-f75f5572-cdf2-46ce-b5b7-d3e0382c1333.png" "$DEST/basketball-park.png"
  echo "✓ Copied basketball-park.png"
else
  echo "✗ Source file not found: Basketball park photo"
fi
