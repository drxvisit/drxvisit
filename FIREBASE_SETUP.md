# Firebase Setup Guide for DrxVisit

This guide provides step-by-step instructions to set up Firebase for the DrxVisit application.

## Prerequisites

- Google Account
- Firebase CLI installed (`npm install -g firebase-tools`)
- Expo CLI installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `DrxVisit`
4. Accept the terms and click "Continue"
5. Disable Google Analytics (optional) and click "Create project"
6. Wait for project creation to complete

## Step 2: Enable Authentication

1. In Firebase Console, select your project
2. Go to "Authentication" in the left sidebar
3. Click "Get started"
4. Click on "Email/Password" provider
5. Enable "Email/Password" toggle
6. Click "Save"

### Optional: Enable Phone Authentication

1. In Authentication, click "Sign-in method"
2. Click "Phone"
3. Enable the toggle
4. Click "Save"

## Step 3: Create Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your region (e.g., `asia-south1` for India)
5. Click "Create"

### Important: Set Security Rules

After creating the database, go to "Rules" tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.professionalId;
      allow create: if request.auth.uid == request.resource.data.patientId;
      allow update: if request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.professionalId;
    }
    
    // Medical records
    match /medical_records/{recordId} {
      allow read, write: if request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.uploadedBy;
    }
    
    // Reviews
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.patientId;
      allow update, delete: if request.auth.uid == resource.data.patientId;
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read, delete: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

Click "Publish" to apply the rules.

## Step 4: Enable Cloud Storage

1. Go to "Storage" in the left sidebar
2. Click "Get started"
3. Accept the default security rules
4. Select your region (same as Firestore)
5. Click "Done"

### Set Storage Security Rules

Go to "Rules" tab and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile pictures - readable by all, writable by owner
    match /profile_pictures/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    
    // Medical records - only patient can access
    match /medical_records/{patientId}/{allPaths=**} {
      allow read, write: if request.auth.uid == patientId;
    }
    
    // Professional documents - only professional can access
    match /professional_documents/{professionalId}/{allPaths=**} {
      allow read, write: if request.auth.uid == professionalId;
    }
    
    // Prescriptions - patient and professional can access
    match /prescriptions/{prescriptionId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click "Publish" to apply the rules.

## Step 5: Enable Cloud Messaging (Optional)

1. Go to "Cloud Messaging" in the left sidebar
2. Note the "Server API Key" and "Sender ID"
3. These will be used for push notifications

## Step 6: Get Firebase Configuration

1. Go to "Project settings" (gear icon)
2. Under "Your apps", click the web icon (if not present, click "Add app")
3. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 7: Configure Environment Variables

1. Create `.env` file in project root:

```bash
cp .env.example .env
```

2. Update `.env` with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

## Step 8: Create Firestore Collections

The app will automatically create collections when needed, but you can pre-create them:

1. In Firestore, click "Start collection"
2. Create the following collections:
   - `users`
   - `bookings`
   - `medical_records`
   - `reviews`
   - `notifications`
   - `prescriptions`

## Step 9: Test Firebase Connection

Run the app and test authentication:

```bash
pnpm dev
```

Try registering a new account. If successful, you should see the user in Firebase Authentication.

## Step 10: Deploy to Production

### Enable Production Mode

1. Update Firestore security rules to production mode
2. Enable App Check for additional security
3. Set up Firebase Hosting (optional)

### Recommended Production Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Users - only own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    // Bookings - participants only
    match /bookings/{bookingId} {
      allow read: if request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.professionalId;
      allow create: if request.auth.uid == request.resource.data.patientId
        && request.resource.data.status == 'pending';
      allow update: if (request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.professionalId)
        && request.resource.data.updatedAt > resource.data.updatedAt;
    }
    
    // Medical records - strict access
    match /medical_records/{recordId} {
      allow read: if request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.uploadedBy;
      allow create: if request.auth.uid == request.resource.data.patientId
        || request.auth.uid == request.resource.data.uploadedBy;
      allow delete: if request.auth.uid == resource.data.patientId;
    }
    
    // Reviews - public read, user write
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.patientId
        && request.resource.data.rating >= 1 && request.resource.data.rating <= 5;
      allow update, delete: if request.auth.uid == resource.data.patientId;
    }
    
    // Notifications - user only
    match /notifications/{notificationId} {
      allow read, delete: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Issue: "Permission denied" errors

**Solution**: Check Firestore security rules. Ensure rules match your app's data structure.

### Issue: Firebase initialization fails

**Solution**: Verify all environment variables are correctly set in `.env`.

### Issue: Storage upload fails

**Solution**: Check Cloud Storage security rules and ensure user has write permission.

### Issue: Authentication not working

**Solution**: 
1. Verify Email/Password provider is enabled
2. Check Firebase configuration in `.env`
3. Ensure user exists in Firebase Authentication

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Storage Security](https://firebase.google.com/docs/storage/security)

## Support

For issues or questions, contact the development team or refer to Firebase documentation.
