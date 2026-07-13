# DrxVisit Deployment Guide

## Prerequisites

- Node.js 18+
- Firebase CLI
- Expo CLI
- GitHub account
- Apple Developer account (for iOS)
- Google Play Developer account (for Android)

## Development Deployment

### 1. Setup Firebase Project

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage
```

### 2. Setup Environment Variables

Create `.env.local`:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# In another terminal, start Metro
pnpm dev:metro
```

## Production Deployment

### 1. Build APK for Android

```bash
# Configure EAS
eas build --platform android --type apk

# Or for production release
eas build --platform android --type app-bundle
```

### 2. Build for iOS

```bash
# Build for iOS
eas build --platform ios

# Or for production release
eas build --platform ios --type archive
```

### 3. Submit to App Stores

```bash
# Submit to Google Play
eas submit --platform android

# Submit to Apple App Store
eas submit --platform ios
```

### 4. Deploy Backend

```bash
# Build backend
pnpm build

# Deploy to production server
# (Depends on your hosting provider)
```

## Firebase Hosting

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy specific functions
firebase deploy --only functions
```

## Database Migrations

```bash
# Generate migration
drizzle-kit generate

# Run migration
drizzle-kit migrate

# Push schema
pnpm db:push
```

## Monitoring

### Firebase Console
- Monitor real-time database activity
- View error logs
- Check performance metrics

### Analytics
```bash
# View analytics
firebase analytics:list
```

## Backup & Recovery

### Firebase Backup
```bash
# Export Firestore data
gcloud firestore export gs://your-bucket/backup-name

# Import Firestore data
gcloud firestore import gs://your-bucket/backup-name
```

## Scaling

### Firestore Scaling
- Use collection sharding for high-traffic collections
- Implement caching with Redis
- Use Cloud CDN for static assets

### Backend Scaling
- Deploy multiple instances
- Use load balancer
- Implement auto-scaling

## Security Checklist

- [ ] Enable 2FA for all accounts
- [ ] Rotate API keys regularly
- [ ] Review Firestore security rules
- [ ] Enable HTTPS everywhere
- [ ] Setup DDoS protection
- [ ] Enable audit logging
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .expo .next node_modules
pnpm install

# Rebuild
pnpm build
```

### Firebase Connection Issues
```bash
# Check Firebase config
firebase projects:list

# Verify credentials
firebase auth:export auth.json
```

### Performance Issues
- Check Firestore query performance
- Monitor API response times
- Analyze bundle size
- Use performance profiling tools

