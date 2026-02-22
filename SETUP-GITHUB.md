# One-time GitHub setup

This project includes a script that **creates the GitHub repository and pushes your code** in one go. You run it once from your machine.

## 1. Create a Personal Access Token (2 minutes)

1. Open **https://github.com/settings/tokens**
2. Click **Generate new token (classic)**
3. Name it (e.g. `Ambition AI setup`), choose **Expiration**, and enable scope: **repo**
4. Click **Generate token** and **copy the token** (starts with `ghp_`)

## 2. Run the setup script

In Terminal (or Cursor’s terminal), from the project folder:

```bash
cd "/Users/bryangunawan/Ambition AI"
chmod +x scripts/setup-github.sh
./scripts/setup-github.sh
```

When prompted, paste your token (input is hidden). The script will:

- Create the **ambition-ai** repository on your GitHub account
- Initialize git, commit all files, and push to `main`

**Or** pass the token via environment (no prompt):

```bash
GITHUB_TOKEN=ghp_your_token_here ./scripts/setup-github.sh
```

**Custom repo name:**

```bash
./scripts/setup-github.sh my-repo-name
```

After it finishes, the repo URL will be printed (e.g. `https://github.com/yourusername/ambition-ai`). Future pushes use normal `git push`; the token is not stored in the remote URL.
