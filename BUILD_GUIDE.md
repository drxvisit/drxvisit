# DrxVisit Production Build Guide

This guide explains how to build and deploy DrxVisit for production.

## Prerequisites

- Node.js 18+ and pnpm
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Expo account (create at https://expo.dev)
- Android Studio (for local Android builds)
- Xcode (for iOS builds on macOS)

## Local Android Build

### Build APK Locally

```bash
# Install dependencies
pnpm install

# Build APK
eas build --platform android --type apk --local

# APK will be generated in dist/ directory
```

### Build AAB Locally

```bash
# Build App Bundle
eas build --platform android --type app-bundle --local

# AAB will be generated in dist/ directory
```

## EAS Cloud Build

### Setup EAS

```bash
# Login to Expo
eas login

# Configure EAS for your project
eas build:configure
```

### Build APK via EAS

```bash
# Build production APK
eas build --platform android --type apk

# Build preview APK
eas build --platform android --type apk --profile preview
```

### Build AAB via EAS

```bash
# Build production AAB (for Google Play Store)
eas build --platform android --type app-bundle

# Build preview AAB
eas build --platform android --type app-bundle --profile preview
```

## Build Profiles

The project includes several build profiles in `eas.json`:

- **development**: For testing with Expo Go
- **preview**: For testing before production
- **production**: Production APK build
- **production-aab**: Production AAB for Google Play Store

## Signing Configuration

### Automatic Signing (Recommended)

EAS handles signing automatically. On first build, it will:
1. Create a keystore
2. Generate a signing key
3. Store credentials securely

### Manual Signing

If you have existing signing credentials:

```bash
# Provide keystore file
eas build --platform android --type apk --keystore-path ./my-keystore.jks
```

## Installation & Testing

### Install APK on Device

```bash
# Connect Android device via USB
# Enable USB debugging on device

# Install APK
adb install path/to/drxvisit.apk

# Or use EAS build output
eas build:list  # Find your build
```

### Test on Emulator

```bash
# Start Android emulator
emulator -avd Pixel_4_API_30

# Install APK
adb install path/to/drxvisit.apk
```

## Google Play Store Submission

### Prerequisites

1. Google Play Developer account ($25 one-time fee)
2. App signing key (EAS generates this)
3. App bundle (AAB format)

### Submission Steps

1. **Create App in Google Play Console**
   - Go to https://play.google.com/console
   - Click "Create app"
   - Enter app name: "DrxVisit"
   - Select app category: "Medical"
   - Accept policies

2. **Add App Details**
   - Add app title, description, screenshots
   - Add app icon and feature graphic
   - Set content rating
   - Set privacy policy URL

3. **Upload AAB**
   - Go to "Release" → "Production"
   - Click "Create new release"
   - Upload AAB file
   - Review changes

4. **Submit for Review**
   - Review all details
   - Accept policies
   - Submit for review
   - Wait for approval (typically 24-48 hours)

## Version Management

### Update Version

Edit `app.json`:

```json
{
  "expo": {
    "version": "1.0.1"
  }
}
```

Then rebuild:

```bash
eas build --platform android --type app-bundle
```

## Build Troubleshooting

### Issue: Build fails with "Out of memory"

**Solution**: 
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" eas build --platform android
```

### Issue: "Keystore not found"

**Solution**: 
```bash
# Let EAS generate a new keystore
eas build --platform android --type apk
```

### Issue: Build stuck at "Waiting for build"

**Solution**:
```bash
# Check build status
eas build:list

# Cancel stuck build
eas build:cancel <BUILD_ID>
```

### Issue: "Invalid package name"

**Solution**: Ensure `android.package` in `app.json` follows format: `com.company.appname`

## Performance Optimization

### Reduce Build Size

```bash
# Enable code minification
eas build --platform android --type apk --env-file .env.production
```

### Faster Builds

```bash
# Use preview profile (faster, less optimization)
eas build --platform android --type apk --profile preview
```

## Post-Build

### Monitor App Performance

1. Set up Firebase Analytics
2. Monitor crash reports
3. Track user engagement
4. Monitor app store reviews

### Update Strategy

1. **Patch Updates** (1.0.1): Bug fixes, minor changes
2. **Minor Updates** (1.1.0): New features
3. **Major Updates** (2.0.0): Significant changes

## Security Checklist

- [ ] All environment variables configured
- [ ] Firebase security rules set to production
- [ ] API keys restricted
- [ ] Sensitive data not hardcoded
- [ ] HTTPS enabled for all APIs
- [ ] App signing key backed up
- [ ] Privacy policy published
- [ ] Terms of service published

## Support

For build issues:
1. Check [Expo Build Documentation](https://docs.expo.dev/build/introduction/)
2. Check [EAS Build Troubleshooting](https://docs.expo.dev/build/troubleshooting/)
3. Review build logs: `eas build:list` then `eas build:view <BUILD_ID>`

## Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Guide](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [React Native Deployment](https://reactnative.dev/docs/signed-apk-android)
