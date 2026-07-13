# DrxVisit Quick Build Guide - 5 Minutes to Production APK/AAB

## 🚀 Quick Start (TL;DR)

### Prerequisites (One-time setup)
```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Create Expo account at https://expo.dev

# 3. Login to Expo
eas login

# 4. Install dependencies
pnpm install
```

### Build APK (Testing)
```bash
# Build APK for testing on devices
eas build --platform android --type apk

# Download from https://expo.dev/builds
```

### Build AAB (Google Play Store)
```bash
# Build App Bundle for Play Store
eas build --platform android --type app-bundle

# Download from https://expo.dev/builds
```

---

## 📱 Using the Automated Build Script

### Run Interactive Build Menu
```bash
# Make script executable (first time only)
chmod +x scripts/build-production.sh

# Run the build script
./scripts/build-production.sh
```

### Menu Options
1. **Build APK** - For testing on devices
2. **Build AAB** - For Google Play Store
3. **Build Both** - APK and AAB
4. **View Status** - Check recent builds
5. **Exit** - Quit the script

---

## 🎯 Step-by-Step Build Process

### Step 1: Verify Configuration
```bash
# Check app.json
cat app.json | grep -A 5 '"name"'

# Should show: "name": "DrxVisit"
```

### Step 2: Start Build
```bash
# For APK
eas build --platform android --type apk

# For AAB
eas build --platform android --type app-bundle
```

### Step 3: Monitor Progress
```bash
# View build status
eas build:list

# View build logs
eas build:logs <BUILD_ID>
```

### Step 4: Download Package
- Go to https://expo.dev/builds
- Find your build
- Download APK or AAB
- Or use build URL provided in terminal

---

## 📲 Install & Test APK

### On Physical Device
```bash
# Connect device via USB
# Enable USB debugging

# Install APK
adb install path/to/drxvisit.apk

# Or download from Expo dashboard and install manually
```

### On Android Emulator
```bash
# Start emulator
emulator -avd Pixel_4_API_30

# Install APK
adb install path/to/drxvisit.apk
```

---

## 🎯 Submit to Google Play Store

### Quick Checklist
- [ ] Create Google Play Developer account ($25)
- [ ] Create app listing
- [ ] Upload screenshots and app icon
- [ ] Complete content rating
- [ ] Upload AAB file
- [ ] Add release notes
- [ ] Submit for review

### Submit AAB
1. Go to https://play.google.com/console
2. Select DrxVisit app
3. Go to "Releases" → "Production"
4. Click "Create new release"
5. Upload AAB file
6. Review and submit

---

## 🔍 Troubleshooting

### Build Fails
```bash
# Clear cache and retry
rm -rf node_modules/.cache
eas build --platform android --type apk --profile production
```

### Not Logged In
```bash
# Login to Expo
eas login

# Verify login
eas whoami
```

### Out of Memory
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" eas build --platform android
```

### Installation Fails
```bash
# Uninstall existing app
adb uninstall com.drxvisit.app

# Reinstall APK
adb install path/to/drxvisit.apk
```

---

## ⏱️ Build Times

| Build Type | Time | Notes |
|-----------|------|-------|
| **APK** | 10-15 min | Testing, direct distribution |
| **AAB** | 10-15 min | Google Play Store submission |
| **Both** | 20-30 min | Sequential builds |

---

## 📊 Build Profiles

### Production (APK)
- Release mode
- Optimized for testing
- Direct device installation
- Faster iteration

### Production-AAB (App Bundle)
- Release mode
- Optimized for Play Store
- Dynamic feature delivery
- Smaller download size

---

## 🔒 Security Notes

Before releasing:
- [ ] Firebase credentials configured
- [ ] API keys restricted
- [ ] Security rules set to production
- [ ] Privacy policy published
- [ ] Terms of service published

---

## 📞 Need Help?

### Common Commands
```bash
# List all builds
eas build:list

# View specific build
eas build:view <BUILD_ID>

# Cancel build
eas build:cancel <BUILD_ID>

# View credentials
eas credentials --platform android

# Update credentials
eas credentials --platform android --update
```

### Resources
- **EAS Docs**: https://docs.expo.dev/build/
- **Play Store Help**: https://support.google.com/googleplay/android-developer
- **Firebase Docs**: https://firebase.google.com/docs

---

## ✅ Success Indicators

- ✅ Build completes without errors
- ✅ APK/AAB downloads successfully
- ✅ App installs on device
- ✅ App launches without crashes
- ✅ All screens load correctly
- ✅ Authentication works
- ✅ Navigation functions properly

---

## 🎉 You're Ready!

Your DrxVisit app is ready for production deployment!

**Next**: Submit AAB to Google Play Store and reach millions of users.

---

**Questions?** Check PRODUCTION_BUILD_GUIDE.md for detailed instructions.
