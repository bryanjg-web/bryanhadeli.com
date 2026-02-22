#!/usr/bin/env bash
# Creates the GitHub repository for this project and pushes the initial commit.
# Run once from the project root with: GITHUB_TOKEN=ghp_xxx ./scripts/setup-github.sh
# Or: ./scripts/setup-github.sh   (will prompt for token)

set -e

REPO_NAME="${1:-ambition-ai}"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

# --- Token ---
if [ -z "$GITHUB_TOKEN" ]; then
  echo "GitHub Personal Access Token is required to create the repo on your behalf."
  echo "Create one at: https://github.com/settings/tokens (scope: repo)"
  echo ""
  printf "Paste your token (will not echo): "
  read -rs GITHUB_TOKEN
  echo ""
  [ -z "$GITHUB_TOKEN" ] && { echo "No token provided. Exiting."; exit 1; }
fi

# --- Resolve GitHub username ---
echo "Resolving your GitHub username..."
USER_RESPONSE=$(curl -s -S -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" "https://api.github.com/user")
USERNAME=$(echo "$USER_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('login',''))" 2>/dev/null || true)
if [ -z "$USERNAME" ]; then
  echo "Could not get GitHub username. Check your token (scope must include repo)."
  exit 1
fi
echo "Using GitHub user: $USERNAME"

# --- Create repository on GitHub ---
echo "Creating repository '$REPO_NAME' on GitHub..."
CREATE_RESPONSE=$(curl -s -S -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/user/repos" \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"description\":\"Ambition AI project\"}")
API_MSG=$(echo "$CREATE_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('message',''))" 2>/dev/null || true)
if [ -n "$API_MSG" ]; then
  echo "GitHub API error: $API_MSG"
  exit 1
fi

# --- Local git and push ---
if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit: Ambition AI project with Cursor commands"
fi

REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git"
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

# Clear token from remote URL (use SSH or credential helper for future pushes)
git remote set-url origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
echo ""
echo "Done. Repository: https://github.com/${USERNAME}/${REPO_NAME}"
