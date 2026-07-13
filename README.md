# DrxVisit - Healthcare Marketplace Mobile App

A modern, production-ready healthcare marketplace application built with React Native, Expo, Firebase, and TypeScript. DrxVisit connects patients with healthcare professionals for appointments, consultations, and various healthcare services.

## 🎯 Features

### Patient Features
- **User Authentication**: Secure Firebase-based authentication
- **Browse Professionals**: Search and filter healthcare professionals by specialty
- **Book Appointments**: Schedule clinic visits, home visits, or video consultations
- **Medical Records**: Secure storage and management of medical documents
- **Prescriptions**: View and manage digital prescriptions
- **Healthcare Services**: Access lab tests, medicine delivery, ambulance, physiotherapy, home nursing, and medical equipment rental
- **Appointment Tracking**: Real-time status updates on bookings
- **Reviews & Ratings**: Rate and review healthcare professionals
- **Push Notifications**: Get instant updates on appointments and services

### Professional Features
- **Professional Registration**: Complete profile setup with credentials verification
- **Availability Management**: Set working hours and manage availability
- **Booking Management**: Accept/reject appointments and manage schedule
- **Patient Reviews**: View and respond to patient feedback
- **Document Management**: Upload and manage professional credentials
- **Clinic Details**: Manage clinic information and contact details
- **Earnings Tracking**: Monitor completed appointments and services

### Admin Features
- **User Management**: Manage patients and professionals
- **Professional Verification**: Review and verify professional credentials
- **Booking Management**: Monitor and manage all platform bookings
- **Analytics & Reports**: View platform statistics and generate reports
- **Content Management**: Manage platform content and notifications
- **Verification Queue**: Process pending professional registrations

## 🛠️ Tech Stack

- **Frontend**: React Native 0.81 with Expo SDK 54
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Language**: TypeScript 5.9
- **Backend**: Firebase (Authentication, Firestore, Cloud Storage)
- **State Management**: React Context + AsyncStorage
- **Notifications**: Firebase Cloud Messaging
- **UI Components**: React Native built-in components
- **Animations**: React Native Reanimated 4.x

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- Expo CLI installed globally
- Firebase project created
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/drxvisit/drxvisit.git
cd drxvisit
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Firebase Setup

#### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name: "DrxVisit"
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Save changes

#### Create Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose your region (preferably closest to your users)
5. Click "Create"

#### Enable Cloud Storage
1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Accept the default security rules (for development)
4. Choose your region
5. Click "Done"

#### Get Firebase Configuration
1. In Firebase Console, go to "Project settings"
2. Under "Your apps", click the web icon
3. Copy the Firebase configuration

### 4. Environment Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Update `.env` with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Run the Application

```bash
# Start the development server
pnpm dev

# For iOS (macOS only)
pnpm ios

# For Android
pnpm android

# For web
pnpm web
```

### 6. Testing on Physical Device

#### Using Expo Go
1. Install Expo Go on your device (iOS App Store or Google Play)
2. Scan the QR code displayed in the terminal
3. App will load on your device

#### Using EAS Build (Production)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 📁 Project Structure

```
drxvisit/
├── app/                          # Expo Router app directory
│   ├── (auth)/                  # Authentication screens
│   ├── (patient)/               # Patient app screens
│   ├── (professional)/          # Professional app screens
│   ├── (admin)/                 # Admin app screens
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── screen-container.tsx     # SafeArea wrapper
│   ├── haptic-tab.tsx           # Tab bar with haptics
│   └── ui/                      # UI components
├── services/                     # Firebase and API services
│   ├── firebase.ts              # Firebase initialization
│   ├── firestore.ts             # Firestore operations
│   ├── storage.ts               # Cloud Storage operations
│   └── auth.ts                  # Authentication service
├── lib/                          # Utilities and helpers
│   ├── auth-context.tsx         # Auth context provider
│   ├── theme-provider.tsx       # Theme context
│   └── utils/                   # Utility functions
├── types/                        # TypeScript type definitions
├── assets/                       # Images and static files
├── theme.config.js              # Theme configuration
├── app.config.ts                # Expo app configuration
└── package.json                 # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: #0057B8 (DrxVisit Blue)
- **Secondary**: #00B140 (DrxVisit Green)
- **Background**: #FFFFFF (Light) / #0f1419 (Dark)
- **Surface**: #f8f9fa (Light) / #1a1f26 (Dark)
- **Error**: #EF4444
- **Success**: #00B140
- **Warning**: #F59E0B

### Typography
- **Headings**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Labels**: Semibold, 12-14px

### Spacing
- Base unit: 4px
- Gaps: 4px, 8px, 12px, 16px, 24px, 32px

## 🔐 Security & Compliance

### Firebase Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Bookings rules
    match /bookings/{bookingId} {
      allow read: if request.auth.uid in resource.data.participants;
      allow create: if request.auth.uid == request.resource.data.patientId;
      allow update: if request.auth.uid in resource.data.participants;
    }
    
    // Medical records - only patient and assigned professional
    match /medical_records/{recordId} {
      allow read, write: if request.auth.uid == resource.data.patientId 
        || request.auth.uid == resource.data.uploadedBy;
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile pictures
    match /profile_pictures/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    
    // Medical records - only patient and professional
    match /medical_records/{patientId}/{allPaths=**} {
      allow read, write: if request.auth.uid == patientId;
    }
    
    // Professional documents
    match /professional_documents/{professionalId}/{allPaths=**} {
      allow read, write: if request.auth.uid == professionalId;
    }
  }
}
```

### Data Privacy
- All user data is encrypted in transit (HTTPS)
- Sensitive data is encrypted at rest in Firestore
- Medical records are access-controlled
- User consent is obtained before data collection
- GDPR and HIPAA compliance measures are implemented

## 📱 Building for Production

### Android APK/AAB

```bash
# Build APK
eas build --platform android --type apk

# Build AAB (for Google Play Store)
eas build --platform android --type app-bundle
```

### iOS IPA

```bash
# Build IPA
eas build --platform ios --type ipa
```

### Signing & Certificates

The app uses EAS Build for automated signing. Configure in `eas.json`:

```json
{
  "build": {
    "production": {
      "android": {
        "release": true
      },
      "ios": {
        "distribution": "store"
      }
    }
  }
}
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run linter
pnpm lint

# Format code
pnpm format

# Type check
pnpm check
```

## 📊 Performance Optimization

- **Code Splitting**: Lazy loading of screens via Expo Router
- **Image Optimization**: Compressed images and responsive sizing
- **Bundle Size**: Tree-shaking and code minification
- **Caching**: Firebase caching and AsyncStorage for offline support
- **Memory Management**: Proper cleanup of listeners and subscriptions

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Cannot find module '@/components'"
- **Solution**: Ensure `tsconfig.json` has proper path aliases configured

**Issue**: Firebase initialization fails
- **Solution**: Verify all environment variables are correctly set in `.env`

**Issue**: Android build fails
- **Solution**: Run `cd android && ./gradlew clean && cd ..` then rebuild

**Issue**: Expo Go shows blank screen
- **Solution**: Clear Expo cache: `expo start --clear`

## 📝 API Documentation

### Authentication
- `register(email, password, name, phone, role)` - Register new user
- `login(email, password)` - Sign in user
- `logout()` - Sign out user
- `getCurrentUser()` - Get current user data
- `updateUserProfile(userId, updates)` - Update user information

### Bookings
- `createBooking(bookingData)` - Create new appointment
- `getBooking(bookingId)` - Get booking details
- `updateBooking(bookingId, data)` - Update booking
- `cancelBooking(bookingId, cancelledBy, reason)` - Cancel appointment
- `getPatientBookings(patientId)` - Get patient's appointments
- `getProfessionalBookings(professionalId)` - Get professional's appointments

### Medical Records
- `createRecord(recordData)` - Upload medical record
- `getPatientRecords(patientId)` - Get patient's records
- `deleteRecord(recordId)` - Delete record

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@drxvisit.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- Firebase for backend services
- React Native community
- All contributors and users

---

**Made with ❤️ by DrxVisit Team**
