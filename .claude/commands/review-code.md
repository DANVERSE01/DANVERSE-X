Review the code changes in the current session (or specified files: $ARGUMENTS) using the code-reviewer agent criteria.

Check for:

**1. TypeScript Issues**
- Any `: any` or `as any` or `@ts-ignore`
- Missing return types on exported functions
- Incorrect null handling

**2. Logic Bugs**
- Off-by-one errors
- Missing await on async calls
- useEffect cleanup missing
- Race conditions

**3. Security**
- User input in dangerouslySetInnerHTML
- Exposed environment variables (non-NEXT_PUBLIC_ on client)
- eval() or Function() calls

**4. Performance**
- Missing `key` props on .map()
- Three.js objects not disposed
- GSAP timelines not reverted
- Raw `<img>` instead of next/image
- Missing dynamic import on heavy components

**5. Next.js 15 Violations**
- Browser APIs in Server Components
- Hooks in Server Components
- Async Client Components

Report format:
```
BUGS: [file:line — description] or ✅ none
TS ERRORS: [file:line — description] or ✅ none  
SECURITY: [file:line — description] or ✅ none
PERFORMANCE: [file:line — description] or ✅ none
NEXT.JS: [file:line — description] or ✅ none

VERDICT: PASS / FAIL
```

Only report actual problems. Skip passing checks.
