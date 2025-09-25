#!/bin/bash

# Quick version restore script for TeamLeaderOverview.tsx

if [ $# -eq 0 ]; then
    echo "Usage: ./restore-version.sh <version-name>"
    echo ""
    echo "Available versions:"
    ls -1 versions/TeamLeaderOverview/*.tsx | sed 's/versions\/TeamLeaderOverview\///' | sed 's/\.tsx$//'
    exit 1
fi

VERSION=$1
SOURCE_FILE="versions/TeamLeaderOverview/${VERSION}.tsx"
TARGET_FILE="src/components/TeamLeaderOverview.tsx"

if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Version '$VERSION' not found!"
    echo ""
    echo "Available versions:"
    ls -1 versions/TeamLeaderOverview/*.tsx | sed 's/versions\/TeamLeaderOverview\///' | sed 's/\.tsx$//'
    exit 1
fi

echo "🔄 Restoring version: $VERSION"
cp "$SOURCE_FILE" "$TARGET_FILE"
echo "✅ Restored successfully!"
echo "📁 Source: $SOURCE_FILE"
echo "📁 Target: $TARGET_FILE"
echo ""
echo "🧪 Testing build..."
npm run build
