#!/usr/bin/env bash
# Push this project to your existing GitHub repo.
# GitHub no longer accepts account passwords — use a Personal Access Token.
# Run: GITHUB_TOKEN=ghp_xxx ./scripts/push-to-github.sh
# Or run without env and paste your token when prompted.

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

REMOTE_URL="https://github.com/bryanjg-web/bryanhadeli.com.git"

# --- Token (required for HTTPS push) ---
if [ -z "$GITHUB_TOKEN" ]; then
  echo "GitHub requires a Personal Access Token (not your account password)."
  echo "Create one at: https://github.com/settings/tokens (scope: repo)"
  echo ""
  printf "Paste your token (will not echo): "
  read -rs GITHUB_TOKEN
  echo ""
  [ -z "$GITHUB_TOKEN" ] && { echo "No token provided. Exiting."; exit 1; }
fi

if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit: Bryanhadeli.com project with Cursor commands"
else
  if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "Update: Bryanhadeli.com project" || true
  fi
fi

# Use token in URL for this push only
AUTH_URL="https://${GITHUB_TOKEN}@github.com/bryanjg-web/bryanhadeli.com.git"
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$AUTH_URL"
else
  git remote add origin "$AUTH_URL"
fi

echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

# Remove token from remote URL (safe for future pushes via credential helper or SSH)
git remote set-url origin "$REMOTE_URL"
echo ""
echo "Done. Repository: https://github.com/bryanjg-web/bryanhadeli.com"
