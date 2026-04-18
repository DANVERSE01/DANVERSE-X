# Fix GitHub Issue

**Issue**: $ARGUMENTS

Systematically analyze and fix the specified GitHub issue.

## Steps

1. Fetch issue details:
   ```bash
   gh issue view $ARGUMENTS
   ```
2. Read the issue description, labels, and comments carefully
3. Search the codebase for all files relevant to the reported problem
4. Reproduce the problem mentally — understand the root cause
5. Implement the minimal correct fix
6. Verify TypeScript compiles: `npx tsc --noEmit`
7. Verify build passes (if changed next.config, tailwind.config, or app/): `next build`
8. Commit using conventional format referencing the issue:
   ```
   🐛 fix(<scope>): <description>

   Closes #$ARGUMENTS
   ```
9. Push and create a PR:
   ```bash
   gh pr create --title "🐛 fix: <title>" --body "Closes #$ARGUMENTS\n\n<summary>"
   ```

## Rules

- Fix only what the issue describes — no scope creep
- Zero `any` types introduced by the fix
- If the fix requires a design decision, state options and pick the most conservative one
- Always run TypeScript check before committing
