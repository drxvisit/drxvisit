# DrxVisit Mobile App Design

## Overview

DrxVisit is India's trusted healthcare marketplace connecting patients with healthcare professionals. The app supports three user types: Patients, Healthcare Professionals, and Admins. It enables appointment booking (clinic, home, video), medical records management, payments, and comprehensive healthcare services.

## Design Principles

- **Apple-inspired**: Minimal, modern, clean interface following iOS Human Interface Guidelines
- **Healthcare theme**: Professional, trustworthy, accessible
- **Responsive**: Optimized for mobile portrait (9:16) with one-handed usage
- **Dark/Light modes**: Full support for both color schemes
- **Premium animations**: Subtle, purposeful transitions

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary Blue | #0057B8 | #0057B8 | Buttons, links, primary actions |
| Healthcare Green | #00B140 | #00B140 | Success states, verified badges |
| White | #FFFFFF | #1A1A1A | Backgrounds, surfaces |
| Background | #F8F9FA | #0F0F0F | Screen backgrounds |
| Surface | #FFFFFF | #1E1E1E | Cards, elevated surfaces |
| Foreground | #1A1A1A | #F5F5F5 | Primary text |
| Muted | #666666 | #999999 | Secondary text |
| Border | #E0E0E0 | #333333 | Dividers, borders |
| Success | #00B140 | #00B140 | Success states |
| Warning | #FF9500 | #FF9500 | Warning states |
| Error | #FF3B30 | #FF3B30 | Error states |

## Screen List

### Authentication & Onboarding
1. **Splash Screen** - App logo, loading animation
2. **Falco Onboarding** - Mascot-guided welcome flow
3. **User Type Selection** - Choose Patient or Professional
4. **Patient Login** - Email/phone authentication
5. **Patient Registration** - Basic info, profile setup
6. **Professional Login** - Email/phone authentication
7. **Professional Registration** - Multi-step form with document uploads
8. **Admin Login** - Credentials-based authentication

### Patient Screens
9. **Patient Dashboard** - Quick access to key features
10. **Appointments List** - View all appointments
11. **Appointment Detail** - Full appointment info
12. **Book Appointment** - Search and select professionals
13. **Booking Confirmation** - Review and confirm
14. **Medical Records** - View uploaded records
15. **Prescriptions** - View doctor prescriptions
16. **Notifications** - All notifications
17. **Wallet** - Balance, transaction history
18. **Patient Profile** - Edit profile, settings

### Professional Screens
19. **Professional Dashboard** - Overview and quick stats
20. **Bookings List** - View all bookings
21. **Booking Detail** - Full booking information
22. **Availability Management** - Set working hours
23. **Earnings Dashboard** - Revenue and analytics
24. **Documents** - Upload and manage credentials
25. **Reviews** - View patient reviews
26. **Professional Profile** - Edit profile, settings

### Booking & Services
27. **Booking Engine** - Main booking interface
28. **Clinic Visit Booking** - Select date/time
29. **Home Visit Booking** - Select date/time/location
30. **Video Consultation Booking** - Select time slot
31. **Reschedule Appointment** - Modify existing appointment
32. **Cancel Appointment** - Cancellation flow
33. **Booking Status** - Real-time status tracking

### Payments
34. **Payment Gateway** - Razorpay integration
35. **Invoice** - Payment receipt
36. **Payment History** - Transaction list
37. **Refund Request** - Initiate refund

### Healthcare Services
38. **Lab Tests** - Browse and book tests
39. **Medicine Delivery** - Order medicines
40. **Ambulance** - Emergency ambulance booking
41. **Physiotherapy** - Book sessions
42. **Home Nursing** - Nursing services
43. **Medical Equipment** - Equipment rental/purchase

### Admin Screens
44. **Admin Dashboard** - KPIs and metrics
45. **Users Management** - View/manage patients
46. **Professionals Management** - Verification queue
47. **Bookings Management** - All bookings
48. **Payments Management** - Transaction monitoring
49. **Reports** - Analytics and reports
50. **CMS** - Content management
51. **Verification Queue** - Approve professionals

## Primary Content & Functionality

### Patient Dashboard
- Quick stats: Upcoming appointments, medical records, wallet balance
- Action buttons: Book appointment, view records, manage wallet
- Recent activity feed
- Emergency helpline button (+91 74086 00050)

### Professional Dashboard
- Quick stats: Today's bookings, earnings, reviews
- Action buttons: Manage availability, view bookings
- Earnings graph
- Pending verifications (if applicable)

### Booking Engine
- Search professionals by category and specialty
- Filter by availability, ratings, fees
- Display professional profile with credentials
- Select booking type: Clinic, Home, Video
- Choose date and time slots
- Add notes/symptoms
- Review and confirm booking

### Payment Flow
- Display booking cost
- Razorpay payment gateway integration
- Show invoice after payment
- Transaction history with filters

## Key User Flows

### Patient Appointment Booking
1. Patient opens app → Patient Dashboard
2. Tap "Book Appointment" → Search Professionals
3. Browse and filter professionals by category
4. Tap professional → View profile and credentials
5. Select booking type (Clinic/Home/Video)
6. Choose date and time slot
7. Add notes → Review booking
8. Proceed to payment → Razorpay
9. Confirmation screen → Appointment added to calendar

### Professional Registration & Verification
1. Professional opens app → User Type Selection
2. Select "Healthcare Professional"
3. Enter basic info → Phone verification
4. Upload documents: Photo, Aadhaar, PAN, Medical Registration
5. Upload qualifications and certificates
6. Enter clinic details and fees
7. Set availability schedule
8. Submit for verification
9. Admin reviews and approves
10. Professional gets verified badge

### Admin Verification Flow
1. Admin logs in → Admin Dashboard
2. Navigate to "Verification Queue"
3. View pending professional applications
4. Review documents and credentials
5. Approve or reject application
6. Send notification to professional

## Navigation Structure

```
Root
├── Auth Stack
│   ├── Splash
│   ├── Onboarding
│   ├── UserTypeSelection
│   ├── Login
│   └── Register
├── Patient Stack (Tabs)
│   ├── Dashboard
│   ├── Appointments
│   ├── Medical Records
│   ├── Wallet
│   └── Profile
├── Professional Stack (Tabs)
│   ├── Dashboard
│   ├── Bookings
│   ├── Earnings
│   ├── Documents
│   └── Profile
└── Admin Stack
    ├── Dashboard
    ├── Users
    ├── Professionals
    ├── Bookings
    ├── Payments
    ├── Reports
    └── Verification Queue
```

## Interaction Patterns

### Button States
- **Default**: Full opacity, normal scale
- **Pressed**: Scale 0.97, haptic feedback
- **Disabled**: 50% opacity, no interaction

### List Items
- **Default**: Full opacity
- **Pressed**: 70% opacity
- **Swipe actions**: Delete, reschedule (where applicable)

### Cards
- **Default**: Subtle shadow, border
- **Pressed**: Increased shadow, slight scale
- **Hover**: Slight color change

### Modals & Sheets
- **Bottom sheets**: For secondary actions
- **Full modals**: For critical flows (payment, registration)
- **Alerts**: For confirmations and errors

## Accessibility

- Minimum touch target: 44x44 points
- Color contrast: WCAG AA compliant
- Text size: Minimum 16pt for body text
- VoiceOver support for all interactive elements
- Haptic feedback for important actions

## Animation Guidelines

- **Transitions**: 200-300ms for screen transitions
- **Button feedback**: 80ms scale animation
- **List animations**: 150ms fade-in for items
- **Loading states**: Subtle spinner or progress indicator
- **Success feedback**: Brief haptic + green checkmark animation

## Branding Assets

- **Logo**: DrxVisit logo (to be generated)
- **Mascot**: Falco mascot (to be generated)
- **Icon**: App icon (to be generated)
- **Splash**: Splash screen with logo
- **Colors**: Primary Blue (#0057B8), Healthcare Green (#00B140)

## Responsive Breakpoints

- **Mobile**: 320px - 480px (primary)
- **Tablet**: 481px - 768px (secondary support)
- **Desktop Web**: 769px+ (web preview only)

## Dark Mode

- Automatic detection based on system settings
- Manual toggle in settings
- All colors automatically adjust
- No hardcoded color values in components
