#!/bin/bash
# DANVERSE-X — Session Start Hook
# Injects project context at the start of every Claude Code session

echo "╔══════════════════════════════════════╗"
echo "║         DANVERSE-X SESSION           ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "📍 Branch:     $(git branch --show-current 2>/dev/null || echo 'unknown')"
echo "📝 Last commit: $(git log -1 --oneline 2>/dev/null || echo 'no commits')"
echo "📁 Changed:    $(git status --short 2>/dev/null | wc -l | tr -d ' ') files"
echo ""
echo "🌐 Stack: Next.js 15 | TypeScript strict | Tailwind | GSAP | Three.js | Lenis"
echo "🚀 Deploy: Netlify ONLY — never Vercel"
echo "🎨 Colors: Electric-blue #E0E75B | Teal #00A6A6 | Coral #EF786A"
echo ""
echo "💡 Commands: /compact at 70% context | /clear for new task"
echo "🤖 Agents:   code-reviewer | ui-architect | performance-auditor | debug-specialist"
echo ""
