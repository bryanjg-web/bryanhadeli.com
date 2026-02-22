#!/usr/bin/env bash
# Push this project to your existing GitHub repo.
# Run from project root: ./scripts/push-to-github.sh

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

REMOTE_URL="https://github.com/bryanjg-web/bryanhadeli.com.git"

if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit: Ambition AI project with Cursor commands"
else
  if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "Update: Ambition AI project" || true
  fi
fi

if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "Done. Repository: https://github.com/bryanjg-web/bryanhadeli.com"
