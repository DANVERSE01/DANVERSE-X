# Smart Commit

Create a well-formatted conventional commit with gitmoji and auto-staging.

## Steps

1. Run `git status` to see staged/unstaged files
2. If nothing is staged, run `git add -A` to stage all changes
3. Run `git diff --cached --stat` to understand scope of changes
4. Analyze diff to determine if multiple distinct logical changes exist
5. If multiple concerns detected, propose splitting into separate focused commits
6. Generate commit message using the format below
7. Run `git commit -m "<message>"`

## Commit Message Format

```
<emoji> <type>(<optional scope>): <short imperative description>
```

Keep the first line under 72 characters. Use present tense, imperative mood.

## Type → Emoji Map

| Type | Emoji | Use When |
|------|-------|----------|
| feat | ✨ | New feature or capability |
| fix | 🐛 | Bug fix |
| fix | 🚑️ | Critical hotfix |
| fix | 🔒️ | Security fix |
| docs | 📝 | Documentation only |
| style | 💄 | CSS/formatting, no logic change |
| refactor | ♻️ | Code restructure, no behaviour change |
| refactor | 🏗️ | Architectural change |
| perf | ⚡️ | Performance improvement |
| test | ✅ | Add or fix tests |
| chore | 🔧 | Build, tooling, config |
| chore | ⬆️ | Upgrade dependency |
| chore | ⬇️ | Downgrade dependency |
| ci | 👷 | CI/CD pipeline changes |
| revert | ⏪️ | Revert previous commit |
| wip | 🚧 | Work in progress |
| assets | 🍱 | Add/update assets |
| a11y | ♿️ | Accessibility improvement |
| i18n | 🌐 | Internationalisation |
| seo | 🔍️ | SEO improvement |
| ux | 🚸 | UX/usability improvement |
| breaking | 💥 | Breaking change |
| types | 🏷️ | Add/update types |
| anim | 🎨 | Animation or visual polish |

## DANVERSE-X Scope Examples

Use scopes for clarity: `hero`, `nav`, `gsap`, `three`, `cursor`, `lenis`, `tokens`, `deploy`, `perf`.

**Examples:**
```
✨ feat(hero): add kinetic scroll-linked parallax to headline
🐛 fix(lenis): resolve conflict with GSAP ScrollTrigger on mobile
⚡️ perf(three): dispose geometry and material on canvas unmount
💄 style(tokens): update glow-primary shadow spread
📝 docs: update ARCHITECTURE.md with WebGL plasma shader notes
```
