#!/bin/bash
# DANVERSE-X — Pre-Build Validation Hook
# Runs TypeScript check + catches common issues before build

echo "🔍 Running pre-build validation..."

ERRORS=0

# 1. TypeScript check
echo ""
echo "📋 TypeScript..."
npx tsc --noEmit 2>&1
TSC_EXIT=$?
if [ $TSC_EXIT -ne 0 ]; then
  echo "❌ TypeScript errors found — fix before building"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ TypeScript: clean"
fi

# 2. Check for raw <img> tags (violation)
IMG_COUNT=$(grep -rn "<img " --include="*.tsx" app/ components/ 2>/dev/null | grep -v "//.*<img" | wc -l | tr -d ' ')
if [ "$IMG_COUNT" -gt "0" ]; then
  echo "❌ $IMG_COUNT raw <img> tags found — use next/image:"
  grep -rn "<img " --include="*.tsx" app/ components/ 2>/dev/null | grep -v "//.*<img"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ No raw <img> tags"
fi

# 3. Check for console.log in production code
LOG_COUNT=$(grep -rn "console\.log" --include="*.tsx" --include="*.ts" app/ components/ lib/ hooks/ 2>/dev/null | grep -v "//.*console" | wc -l | tr -d ' ')
if [ "$LOG_COUNT" -gt "0" ]; then
  echo "⚠️  $LOG_COUNT console.log found (will be stripped in prod, but remove anyway):"
  grep -rn "console\.log" --include="*.tsx" --include="*.ts" app/ components/ lib/ hooks/ 2>/dev/null | grep -v "//.*console"
else
  echo "✅ No console.log in production code"
fi

# 4. Check for direct GSAP imports (violation — must use lib/gsap.ts)
DIRECT_GSAP=$(grep -rn "from 'gsap'" --include="*.tsx" --include="*.ts" app/ components/ hooks/ 2>/dev/null | grep -v "lib/gsap" | wc -l | tr -d ' ')
if [ "$DIRECT_GSAP" -gt "0" ]; then
  echo "❌ $DIRECT_GSAP direct GSAP imports found — must import from lib/gsap.ts:"
  grep -rn "from 'gsap'" --include="*.tsx" --include="*.ts" app/ components/ hooks/ 2>/dev/null | grep -v "lib/gsap"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ All GSAP imports via lib/gsap.ts"
fi

# 5. Check for any token color used (locked)
INLINE_COLORS=$(grep -rn "style={{.*#[0-9a-fA-F]\{6\}" --include="*.tsx" app/ components/ 2>/dev/null | grep -v "Three\|shader\|glsl" | wc -l | tr -d ' ')
if [ "$INLINE_COLORS" -gt "0" ]; then
  echo "⚠️  $INLINE_COLORS inline hex colors found — prefer CSS token variables"
fi

echo ""
if [ "$ERRORS" -gt "0" ]; then
  echo "❌ Pre-build check: $ERRORS errors. Fix before running next build."
  exit 1
else
  echo "✅ Pre-build check passed — safe to build"
  exit 0
fi
