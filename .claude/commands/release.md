# Release

Create a tagged release for DANVERSE-X.

**Version**: $ARGUMENTS (e.g. `v1.2.0`)

## Steps

1. Confirm we're on `main` branch and it's clean: `git status`
2. Run full pre-deploy check:
   - `npx tsc --noEmit` — TypeScript clean
   - Check for raw `<img>` tags
   - Check for `console.log` in production code
3. Update `CHANGELOG.md`:
   - Get commits since last tag: `git log $(git describe --tags --abbrev=0)..HEAD --oneline`
   - Add new section `## $ARGUMENTS — $(date +%Y-%m-%d)` with categorised entries
4. Commit changelog update:
   ```bash
   git add CHANGELOG.md
   git commit -m "📝 docs: update CHANGELOG for $ARGUMENTS"
   ```
5. Create annotated tag:
   ```bash
   git tag -a $ARGUMENTS -m "Release $ARGUMENTS"
   ```
6. Push tag:
   ```bash
   git push origin $ARGUMENTS
   ```
7. Create GitHub release:
   ```bash
   gh release create $ARGUMENTS --title "DANVERSE-X $ARGUMENTS" --notes-from-tag
   ```

## Versioning Convention

Follow semantic versioning:
- `PATCH` (x.x.1) — bug fixes, copy/content updates
- `MINOR` (x.1.0) — new sections, components, features
- `MAJOR` (1.0.0) — full redesigns, breaking architecture changes
