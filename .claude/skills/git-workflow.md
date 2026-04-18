---
name: git-workflow
description: Professional Git workflow for DANVERSE-X — branching strategy, conventional commits, rebase, and release management.
trigger: git|branch|commit|rebase|merge|pr|pull request|tag|release|changelog|stash|conflict
---

# Git Workflow — DANVERSE-X

## Branch Strategy

```
main          ← production (auto-deploys to Netlify)
feature/*     ← new features or sections
fix/*         ← bug fixes
perf/*        ← performance improvements
docs/*        ← documentation only
chore/*       ← tooling, deps, config
```

**Never commit directly to `main`** — always branch → PR → merge.

## Branch Naming Convention

```bash
# Format: <type>/<short-kebab-description>
git checkout -b feature/hero-kinetic-scroll
git checkout -b fix/lenis-gsap-conflict-mobile
git checkout -b perf/lazy-load-three-canvas
git checkout -b chore/upgrade-gsap-3-14
```

## Commit Convention

```
<emoji> <type>(<scope>): <imperative description>
```

See `.claude/commands/commit.md` for the full emoji map.

**Rules:**
- One logical change per commit
- First line ≤ 72 characters
- Body (optional): explain *why*, not *what*
- Reference issues: `Closes #42` or `Relates to #17`

## Daily Workflow

```bash
# Start feature
git fetch origin
git checkout -b feature/my-feature origin/main

# Work...
git add -p                  # stage hunks, not whole files
git commit -m "✨ feat(hero): ..."

# Sync with main mid-feature
git fetch origin
git rebase origin/main      # NOT merge — keeps history clean

# Push
git push -u origin feature/my-feature

# Open PR
gh pr create --draft --title "✨ feat: ..." --body "..."
```

## Rebase vs Merge

| Situation | Use |
|-----------|-----|
| Syncing feature with main | `git rebase origin/main` |
| Merging PR into main | Squash merge (clean history) |
| Hotfix that must ship now | `git cherry-pick <sha>` onto main |
| Never | `git merge origin/main` on feature branches |

## Interactive Rebase (cleanup before PR)

```bash
# Squash last 3 commits into one clean commit
git rebase -i HEAD~3

# In the editor:
# pick abc1234 ✨ feat: initial hero component
# squash def5678 fix typo
# squash ghi9012 remove console.log
```

## Stashing

```bash
git stash push -m "wip: hero parallax experiment"
git stash list
git stash pop              # restore latest
git stash apply stash@{2}  # restore specific
git stash drop stash@{0}   # delete
```

## Tags & Releases

```bash
# Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0 — Add Arabic RTL support"

# Push tag
git push origin v1.2.0

# Create GitHub release
gh release create v1.2.0 --title "DANVERSE-X v1.2.0" --notes-from-tag
```

## Undoing Mistakes

```bash
# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset HEAD~1

# Discard all unstaged changes
git checkout -- .

# Revert a pushed commit (creates a new revert commit — safe for shared branches)
git revert <sha>

# Remove file from last commit
git reset HEAD~ <file>
git commit --amend --no-edit
```

## Conflict Resolution

```bash
# See conflicts
git status

# Open in editor, resolve manually
# Then:
git add <resolved-file>
git rebase --continue      # or git merge --continue

# Abort if needed
git rebase --abort
```

## CHANGELOG.md Convention

```markdown
## v1.3.0 — 2026-04-18

### ✨ Features
- Add Arabic RTL support across all sections

### 🐛 Fixes
- Fix Lenis scroll conflict on iOS Safari

### ⚡️ Performance
- Lazy-load Three.js canvas — reduces LCP by 400ms

### 🔧 Chores
- Upgrade GSAP to 3.14.1
```
