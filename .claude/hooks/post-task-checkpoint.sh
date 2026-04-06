#!/bin/bash
# DANVERSE-X — Post-Task Checkpoint Hook
# Runs when Claude finishes a task — logs completion

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
LOG_FILE=".claude/logs/sessions.log"

# Ensure log directory exists
mkdir -p .claude/logs

# Log task completion
echo "[$TIMESTAMP] Task completed — Branch: $(git branch --show-current 2>/dev/null)" >> "$LOG_FILE"

# Show changed files summary
CHANGED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
if [ "$CHANGED" -gt "0" ]; then
  echo ""
  echo "📋 Session summary:"
  echo "   Changed files: $CHANGED"
  git status --short 2>/dev/null | head -10
  echo ""
  echo "💾 Tip: Run 'git add -p && git commit' to checkpoint your work"
fi
