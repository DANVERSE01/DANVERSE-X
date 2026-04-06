#!/bin/bash
# DANVERSE-X — Pre-Compact Context Save
# Preserves critical session info before Claude compresses the conversation

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
CONTEXT_FILE=".claude/logs/pre-compact-context.md"

mkdir -p .claude/logs

cat > "$CONTEXT_FILE" << EOF
# Pre-Compact Context Snapshot
**Saved:** $TIMESTAMP

## Git State
**Branch:** $(git branch --show-current 2>/dev/null)
**Last commit:** $(git log -1 --oneline 2>/dev/null)

## Changed Files
\`\`\`
$(git status --short 2>/dev/null)
\`\`\`

## Recent Changes (last 3 commits)
\`\`\`
$(git log --oneline -3 2>/dev/null)
\`\`\`

---
*This file was auto-generated before a conversation compaction.*
*Read this at the start of the next session for context continuity.*
EOF

echo "💾 Context snapshot saved to .claude/logs/pre-compact-context.md"
