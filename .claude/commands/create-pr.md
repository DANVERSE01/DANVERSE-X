# Create Pull Request

Create a branch, commit all changes with logical splits, push, and open a PR.

## Steps

1. Confirm current branch is not `main` — if it is, create a descriptive feature branch first
2. Run `git status` and `git diff --stat` to understand changes
3. Stage and commit all changes following the `/commit` conventions (split by concern if needed)
4. Push branch: `git push -u origin <branch-name>`
5. Create PR using GitHub CLI:
   ```bash
   gh pr create --title "<title>" --body "<body>" --draft
   ```
6. Report the PR URL

## PR Title Format

```
<emoji> <type>: <short description>
```

## PR Body Template

```markdown
## Summary
<!-- What does this PR do? One paragraph max. -->

## Changes
<!-- Bullet list of key changes -->

## Testing
<!-- How was this tested? -->

## Screenshots
<!-- For visual changes: before/after -->

## Notes
<!-- Anything reviewers should know -->
```

## Guidelines

- Separate commits by feature, component, or concern
- Never mix refactoring with feature additions in one commit
- Each commit must be self-contained and understandable independently
- Open as draft unless explicitly told to open as ready
