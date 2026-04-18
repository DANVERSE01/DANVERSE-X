# Context Prime

Prime the agent context window with a deep understanding of this codebase.

## Steps

1. Read `CLAUDE.md` — project identity, rules, and current status
2. Read `ARCHITECTURE.md` — system architecture overview
3. Run `git log --oneline -20` — understand recent history
4. Run `git status` — understand current dirty state
5. List all components: `ls components/`
6. List all hooks: `ls hooks/`
7. List all lib utilities: `ls lib/`
8. Read `package.json` — understand stack versions
9. Read `next.config.mjs` — understand build config
10. Read `.claude/settings.json` — understand hooks and automation

## Output Format

After reading, produce a single structured context summary:

```
## Project Status
Branch: <branch>
Last commit: <sha> <message>
Dirty files: <N>

## Stack
Next.js <ver> | TypeScript strict | Tailwind | GSAP <ver> | Three.js <ver> | Lenis <ver>

## Key Files
Components: <count> (<notable ones>)
Hooks: <list>
Lib: <list>

## Active Tasks (from CLAUDE.md MISSING section)
<list>

## Skills Available
<list>

## Agents Available
<list>

## Commands Available
<list>
```

Now you are fully primed. State "Context primed — ready." and await instructions.
