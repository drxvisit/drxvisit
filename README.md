# DrxVisit - Healthcare Marketplace Platform

DrxVisit is India's most trusted healthcare marketplace connecting patients with verified healthcare professionals. Built with React Native, Expo, and Firebase, it provides seamless appointment booking, medical records management, and comprehensive healthcare services.

## Features

### Patient Features
- **Easy Appointment Booking**: Book clinic visits, home visits, or video consultations
- **Medical Records**: Secure storage and management of health documents
- **Prescriptions**: Digital prescriptions from healthcare professionals
- **Wallet**: Prepaid wallet for easy payments
- **Notifications**: Real-time updates on bookings and appointments
- **Reviews**: Rate and review healthcare professionals

### Professional Features
- **Practice Management**: Manage clinic details, fees, and availability
- **Booking Management**: Accept and manage patient bookings
- **Earnings Dashboard**: Track earnings and commissions
- **Document Management**: Upload and manage credentials
- **Reviews & Ratings**: View patient feedback and ratings
- **Analytics**: Performance metrics and insights

### Admin Features
- **User Management**: Manage patients and professionals
- **Verification Queue**: Approve/reject professional registrations
- **Booking Management**: Monitor all bookings
- **Payment Management**: Track transactions and commissions
- **Reports & Analytics**: Comprehensive platform analytics
- **CMS**: Manage static content

## Tech Stack

- **Frontend**: React Native 0.81, Expo SDK 54
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context + AsyncStorage
- **Backend**: Node.js with Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Payments**: Razorpay Integration
- **Notifications**: Firebase Cloud Messaging

## Project Structure

```
drxvisit-mobile/
├── app/
│   ├── (auth)/              # Authentication screens
│   │   ├── index.tsx        # User type selection
│   │   ├── patient-login.tsx
│   │   ├── patient-register.tsx
│   │   ├── professional-login.tsx
│   │   ├── professional-register.tsx
│   │   └── admin-login.tsx
│   ├── (patient)/           # Patient dashboard & tabs
│   │   ├── index.tsx        # Dashboard
│   │   ├── appointments.tsx
│   │   ├── records.tsx
│   │   ├── wallet.tsx
│   │   └── profile.tsx
│   ├── (professional)/      # Professional dashboard & tabs
│   │   ├── index.tsx        # Dashboard
│   │   ├── bookings.tsx
│   │   ├── earnings.tsx
│   │   ├── documents.tsx
│   │   └── profile.tsx
│   ├── (admin)/             # Admin panel
│   │   ├── index.tsx        # Dashboard
│   │   ├── users.tsx
│   │   ├── professionals.tsx
│   │   ├── verification.tsx
│   │   ├── bookings.tsx
│   │   ├── payments.tsx
│   │   └── reports.tsx
│   ├── _layout.tsx          # Root layout with auth
│   └── splash.tsx           # Splash screen
├── components/              # Reusable components
├── lib/                     # Utilities and context
├── types/                   # TypeScript type definitions
├── server/                  # Backend API
├── design.md                # UI/UX design specifications
├── todo.md                  # Development checklist
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

```bash
# Clone repository
git clone https://github.com/drxvisit/drxvisit.git
cd drxvisit

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev

# On another terminal, start Expo
pnpm dev:metro
```

### Running on Device

```bash
# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm dev:web
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay Configuration
EXPO_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key

# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000
```

## Branding

- **Primary Color**: #0057B8 (DrxVisit Blue)
- **Secondary Color**: #00B140 (Healthcare Green)
- **Logo**: DrxVisit official logo
- **Mascot**: Falco
- **Helpline**: +91 74086 00050

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-phone` - Phone verification

### Patient Endpoints
- `GET /api/patients/dashboard` - Patient dashboard data
- `GET /api/patients/appointments` - List appointments
- `POST /api/patients/appointments` - Book appointment
- `GET /api/patients/records` - Medical records
- `GET /api/patients/wallet` - Wallet balance

### Professional Endpoints
- `GET /api/professionals/dashboard` - Professional dashboard
- `GET /api/professionals/bookings` - List bookings
- `PUT /api/professionals/availability` - Update availability
- `GET /api/professionals/earnings` - Earnings data

### Admin Endpoints
- `GET /api/admin/users` - List all users
- `GET /api/admin/professionals` - List professionals
- `GET /api/admin/verification-queue` - Verification queue
- `POST /api/admin/verify-professional` - Verify professional

## Firebase Security Rules

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /appointments/{appointmentId} {
      allow read: if request.auth.uid in resource.data.participants;
      allow write: if request.auth.uid == resource.data.createdBy;
    }
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
    match /documents/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## Deployment

### Firebase Hosting
```bash
firebase deploy --only hosting
```

### APK Build
```bash
eas build --platform android --type apk
```

### App Store Build
```bash
eas build --platform ios
```

## Testing

```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, email support@drxvisit.com or call +91 74086 00050

## Roadmap

- [ ] Video consultation integration
- [ ] AI-powered health recommendations
- [ ] Telemedicine platform
- [ ] Insurance integration
- [ ] Prescription fulfillment
- [ ] Lab test integration
- [ ] Ambulance service
- [ ] Home nursing services
- [ ] Medical equipment rental

---

**DrxVisit** - Connecting Patients with Trusted Healthcare Professionals
