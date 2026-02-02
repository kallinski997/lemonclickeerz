#!/bin/bash

# Build script for Lemon Clicker Android APK
# This script prepares the web files and builds the APK

set -e  # Exit on error

echo "🍋 Lemon Clicker APK Build Script"
echo "=================================="
echo ""

# Step 1: Prepare www directory
echo "📁 Step 1: Preparing www directory..."
mkdir -p www
cp *.html *.js *.css *.png www/ 2>/dev/null || true
echo "✓ Web files copied to www/"
echo ""

# Step 2: Sync Capacitor
echo "🔄 Step 2: Syncing Capacitor..."
npx cap sync android
echo "✓ Capacitor synced"
echo ""

# Step 3: Build APK
echo "🔨 Step 3: Building APK..."
cd android
./gradlew assembleDebug
cd ..
echo "✓ APK built successfully"
echo ""

# Step 4: Show result
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo "✅ SUCCESS! APK created at:"
    echo "   $APK_PATH"
    echo ""
    echo "📱 To install on device:"
    echo "   adb install $APK_PATH"
    echo ""
    ls -lh "$APK_PATH"
else
    echo "❌ ERROR: APK not found at expected location"
    exit 1
fi
