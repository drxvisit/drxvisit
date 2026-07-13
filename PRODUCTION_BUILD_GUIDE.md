# DrxVisit Production Build & Deployment Guide

## 🚀 Complete Guide to Building and Deploying APK/AAB

This guide provides step-by-step instructions to build production-ready Android packages (APK and AAB) for the DrxVisit application.

---

## 📋 Prerequisites

Before starting the build process, ensure you have:

1. **Node.js 18+** and **pnpm** installed
2. **EAS CLI** installed globally: `npm install -g eas-cli`
3. **Expo Account** (create at https://expo.dev)
4. **Git** installed and configured
5. **Android Studio** (optional, for local builds)
6. **Java Development Kit (JDK) 11+** (for local builds)

---

## 🔑 Step 1: Expo Account Setup

### Create Expo Account
1. Go to https://expo.dev
2. Click "Sign Up"
3. Create account with email and password
4. Verify email address

### Login to Expo
```bash
eas login
```

Follow the prompts to authenticate with your Expo account.

---

## 🏗️ Step 2: EAS Build Configuration

The project includes `eas.json` with pre-configured build profiles:

```json
{
  "build": {
    "production": {
      "android": {
        "release": true,
        "buildType": "apk"
      }
    },
    "production-aab": {
      "android": {
        "release": true,
        "buildType": "app-bundle"
      }
    }
  }
}
```

### Build Profiles Explained

| Profile | Type | Use Case |
|---------|------|----------|
| **production** | APK | Testing on devices, direct distribution |
| **production-aab** | AAB | Google Play Store submission |

---

## 📱 Step 3: Build APK for Testing

### Build APK via EAS Cloud

```bash
# Navigate to project directory
cd drxvisit

# Build production APK
eas build --platform android --type apk --profile production

# Or use shorthand
eas build --platform android --type apk
```

### Build APK Locally (Advanced)

```bash
# Requires Android SDK and build tools
eas build --platform android --type apk --local

# APK will be generated in dist/ directory
```

### Monitor Build Progress

```bash
# View build status
eas build:list

# View specific build details
eas build:view <BUILD_ID>

# View build logs
eas build:logs <BUILD_ID>
```

### Download APK

After build completes:
```bash
# List all builds
eas build:list

# Download APK from the build URL provided
# Or use EAS dashboard at https://expo.dev/builds
```

---

## 📦 Step 4: Build AAB for Google Play Store

### Build App Bundle

```bash
# Build production AAB
eas build --platform android --type app-bundle --profile production-aab

# Or use shorthand
eas build --platform android --type app-bundle
```

### Monitor AAB Build

```bash
# View build status
eas build:list

# View build logs
eas build:logs <BUILD_ID>
```

### Download AAB

After build completes, download from:
- EAS Dashboard: https://expo.dev/builds
- Or via CLI with build URL provided

---

## 🔐 Step 5: Signing Configuration

### Automatic Signing (Recommended)

EAS handles signing automatically:

1. **First Build**: EAS creates a keystore and signing key
2. **Subsequent Builds**: Uses the same key for consistency
3. **Key Storage**: Credentials stored securely in EAS

### View Signing Credentials

```bash
# List signing credentials
eas credentials

# View Android credentials
eas credentials --platform android
```

### Manage Signing Key

```bash
# Rotate signing key (creates new key)
eas credentials --platform android --reset

# Update signing key
eas credentials --platform android --update
```

---

## 📲 Step 6: Install and Test APK

### Install on Physical Device

```bash
# Connect Android device via USB
# Enable USB debugging on device

# Install APK
adb install path/to/drxvisit.apk

# Or download from EAS and install manually
```

### Install on Emulator

```bash
# Start Android emulator
emulator -avd Pixel_4_API_30

# Install APK
adb install path/to/drxvisit.apk
```

### Test Application

After installation, test:
- ✅ App launches without crashes
- ✅ Authentication screens work
- ✅ Patient dashboard loads
- ✅ Professional dashboard loads
- ✅ Admin dashboard loads
- ✅ Navigation works
- ✅ Dark mode toggles
- ✅ All buttons are clickable
- ✅ Error handling works
- ✅ Performance is acceptable

---

## 🎯 Step 7: Google Play Store Submission

### Prerequisites

1. **Google Play Developer Account**
   - Cost: $25 one-time fee
   - Sign up at: https://play.google.com/console

2. **App Information**
   - App name: "DrxVisit"
   - Category: "Medical"
   - Content rating: Complete questionnaire
   - Privacy policy URL

3. **App Assets**
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - Screenshots (min 2, max 8)
   - Description (80 characters)
   - Full description (4000 characters)

### Step-by-Step Submission

#### 1. Create App in Google Play Console

```
1. Go to https://play.google.com/console
2. Click "Create app"
3. Enter app name: "DrxVisit"
4. Select category: "Medical"
5. Accept policies and click "Create"
```

#### 2. Set Up App Details

```
1. Go to "Store listing" section
2. Add app title (50 characters max)
3. Add short description (80 characters)
4. Add full description (4000 characters)
5. Upload app icon (512x512 PNG)
6. Upload feature graphic (1024x500 PNG)
7. Upload screenshots (min 2, max 8)
8. Set content rating
9. Save changes
```

#### 3. Configure App Content

```
1. Go to "Content rating" section
2. Complete questionnaire
3. Save and submit
4. Wait for rating (usually instant)
```

#### 4. Set Up Pricing & Distribution

```
1. Go to "Pricing & distribution"
2. Select countries for distribution
3. Set content rating (if not auto-assigned)
4. Accept policies
5. Save changes
```

#### 5. Upload AAB

```
1. Go to "Releases" section
2. Click "Create new release"
3. Select "Production" track
4. Upload AAB file
5. Review changes
6. Add release notes
7. Save and review
```

#### 6. Submit for Review

```
1. Review all information
2. Accept policies
3. Click "Submit"
4. Wait for review (24-48 hours typically)
5. Check email for approval/rejection
```

### Review Process

- **Timeline**: 24-48 hours typically
- **Rejection Reasons**: Policy violations, crashes, security issues
- **Resubmission**: Fix issues and resubmit

### After Approval

- App appears on Google Play Store
- Users can download and install
- Monitor reviews and ratings
- Track crashes and errors

---

## 🔄 Step 8: Version Updates

### Update App Version

Edit `app.json`:

```json
{
  "expo": {
    "version": "1.0.1"
  }
}
```

### Versioning Strategy

- **Patch** (1.0.1): Bug fixes, minor changes
- **Minor** (1.1.0): New features
- **Major** (2.0.0): Significant changes

### Build New Version

```bash
# Update version in app.json
# Then build new APK/AAB
eas build --platform android --type app-bundle

# Submit to Play Store
```

---

## 🐛 Troubleshooting

### Build Fails with "Out of Memory"

```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" eas build --platform android
```

### Keystore Not Found

```bash
# Let EAS generate new keystore
eas credentials --platform android --reset
eas build --platform android --type apk
```

### Build Stuck at "Waiting for Build"

```bash
# Check build status
eas build:list

# Cancel stuck build
eas build:cancel <BUILD_ID>

# Retry build
eas build --platform android --type apk
```

### Invalid Package Name

**Error**: "Invalid package name"

**Solution**: Ensure `android.package` in `app.json` follows format:
```
com.company.appname
```

Current: `com.drxvisit.app` ✅

### APK Installation Fails

```bash
# Uninstall existing app
adb uninstall com.drxvisit.app

# Clear cache
adb shell pm clear com.drxvisit.app

# Reinstall APK
adb install path/to/drxvisit.apk
```

### App Crashes on Launch

1. Check device logs: `adb logcat`
2. Verify Firebase credentials in `.env`
3. Check Android API level compatibility
4. Review crash reports in Firebase Console

---

## 📊 Build Performance Tips

### Reduce Build Time

```bash
# Use preview profile (faster, less optimization)
eas build --platform android --type apk --profile preview

# Skip validation
eas build --platform android --type apk --skip-validation
```

### Reduce APK Size

1. **Enable ProGuard**: Minifies code
2. **Remove unused dependencies**: Check `package.json`
3. **Compress images**: Use optimized assets
4. **Use dynamic imports**: Lazy load screens

### Monitor Build Metrics

```bash
# View build size
eas build:view <BUILD_ID>

# Compare builds
eas build:list --limit 10
```

---

## 🔒 Security Checklist

Before releasing to production:

- [ ] All environment variables configured
- [ ] Firebase security rules set to production
- [ ] API keys restricted to Android app
- [ ] Sensitive data not hardcoded
- [ ] HTTPS enabled for all APIs
- [ ] App signing key backed up
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Content rating completed
- [ ] Crash reporting enabled

---

## 📈 Post-Launch Monitoring

### Firebase Console

1. Go to https://console.firebase.google.com
2. Select DrxVisit project
3. Monitor:
   - Crash reports
   - Performance metrics
   - User analytics
   - Error rates

### Google Play Console

1. Go to https://play.google.com/console
2. Select DrxVisit app
3. Monitor:
   - User reviews and ratings
   - Crash reports
   - ANR (Application Not Responding) rates
   - Download statistics

### Set Up Alerts

```bash
# Enable crash reporting
firebase init

# Configure alerts in Firebase Console
```

---

## 🚀 Continuous Deployment (Optional)

### GitHub Actions Workflow

Create `.github/workflows/build.yml`:

```yaml
name: Build APK/AAB

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install -g eas-cli
      - run: eas login --non-interactive
      - run: eas build --platform android --type app-bundle
```

---

## 📞 Support & Resources

- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Google Play Console Help**: https://support.google.com/googleplay/android-developer
- **Firebase Docs**: https://firebase.google.com/docs
- **React Native Deployment**: https://reactnative.dev/docs/signed-apk-android

---

## ✅ Deployment Checklist

- [ ] Expo account created and logged in
- [ ] EAS CLI installed
- [ ] app.json configured correctly
- [ ] eas.json build profiles configured
- [ ] Firebase credentials set up
- [ ] APK built and tested
- [ ] AAB built and tested
- [ ] Google Play Developer account created
- [ ] App listing created
- [ ] App assets uploaded
- [ ] Content rating completed
- [ ] Privacy policy published
- [ ] AAB uploaded to Play Store
- [ ] App submitted for review
- [ ] Monitoring set up
- [ ] Post-launch plan ready

---

## 🎉 Success!

Your DrxVisit app is now live on Google Play Store!

**Next Steps**:
1. Monitor user reviews and ratings
2. Track crash reports
3. Plan future updates
4. Engage with users
5. Iterate based on feedback

---

**For questions or support, refer to the documentation or contact the development team.**
