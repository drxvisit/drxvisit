# DrxVisit API Documentation

## Base URL
```
Production: https://api.drxvisit.com
Development: http://localhost:3000
```

## Authentication

All API endpoints (except auth endpoints) require authentication via JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Auth Endpoints

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "patient|professional|admin"
  }
}
```

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+91 98765 43210",
  "password": "password123",
  "role": "patient|professional"
}

Response: Same as Login
```

### Logout
```
POST /api/auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Patient Endpoints

### Get Dashboard
```
GET /api/patients/dashboard
Authorization: Bearer {token}

Response:
{
  "upcomingAppointments": 2,
  "totalAppointments": 15,
  "walletBalance": 500,
  "medicalRecords": 5,
  "prescriptions": 3
}
```

### List Appointments
```
GET /api/patients/appointments?status=confirmed&page=1&limit=10
Authorization: Bearer {token}

Response:
{
  "data": [
    {
      "id": "apt_123",
      "professionalName": "Dr. Kumar",
      "date": "2024-07-20",
      "time": "10:00 AM",
      "type": "clinic|home|video",
      "status": "confirmed|pending|completed|cancelled",
      "fee": 500
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10
}
```

### Book Appointment
```
POST /api/patients/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "professionalId": "prof_123",
  "date": "2024-07-20",
  "time": "10:00 AM",
  "type": "clinic|home|video",
  "reason": "General checkup",
  "notes": "Optional notes"
}

Response:
{
  "id": "apt_123",
  "status": "pending",
  "message": "Appointment booked successfully"
}
```

### Get Medical Records
```
GET /api/patients/records
Authorization: Bearer {token}

Response:
{
  "data": [
    {
      "id": "rec_123",
      "title": "Blood Test Report",
      "date": "2024-07-10",
      "category": "lab_report|prescription|diagnosis",
      "url": "https://storage.url/record.pdf"
    }
  ]
}
```

### Upload Medical Record
```
POST /api/patients/records
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: <binary>
- title: "Blood Test Report"
- category: "lab_report"

Response:
{
  "id": "rec_123",
  "url": "https://storage.url/record.pdf",
  "message": "Record uploaded successfully"
}
```

## Professional Endpoints

### Get Dashboard
```
GET /api/professionals/dashboard
Authorization: Bearer {token}

Response:
{
  "todayBookings": 3,
  "totalBookings": 45,
  "monthlyEarnings": 25000,
  "rating": 4.8,
  "reviews": 120,
  "verificationStatus": "verified|pending|rejected"
}
```

### Get Bookings
```
GET /api/professionals/bookings?status=confirmed&page=1&limit=10
Authorization: Bearer {token}

Response:
{
  "data": [
    {
      "id": "apt_123",
      "patientName": "John Doe",
      "date": "2024-07-20",
      "time": "10:00 AM",
      "type": "clinic|home|video",
      "status": "confirmed|pending|completed|cancelled",
      "fee": 500
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 10
}
```

### Update Availability
```
PUT /api/professionals/availability
Authorization: Bearer {token}
Content-Type: application/json

{
  "dayOfWeek": "Monday",
  "startTime": "09:00 AM",
  "endTime": "05:00 PM",
  "slotDuration": 30,
  "isAvailable": true
}

Response:
{
  "success": true,
  "message": "Availability updated"
}
```

### Get Earnings
```
GET /api/professionals/earnings?startDate=2024-07-01&endDate=2024-07-31
Authorization: Bearer {token}

Response:
{
  "totalEarnings": 25000,
  "commissionPaid": 5000,
  "netEarnings": 20000,
  "bookings": 50,
  "averagePerBooking": 500,
  "transactions": [
    {
      "id": "txn_123",
      "date": "2024-07-15",
      "amount": 500,
      "type": "booking|refund",
      "status": "completed|pending"
    }
  ]
}
```

## Admin Endpoints

### Get Users
```
GET /api/admin/users?role=patient&page=1&limit=20&search=john
Authorization: Bearer {admin_token}

Response:
{
  "data": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "role": "patient",
      "createdAt": "2024-07-01T10:00:00Z",
      "status": "active|inactive|suspended"
    }
  ],
  "total": 1234,
  "page": 1,
  "limit": 20
}
```

### Get Professionals
```
GET /api/admin/professionals?status=verified&page=1&limit=20
Authorization: Bearer {admin_token}

Response:
{
  "data": [
    {
      "id": "prof_123",
      "name": "Dr. Kumar",
      "category": "Doctor",
      "experience": 10,
      "rating": 4.8,
      "status": "verified|pending|rejected",
      "verifiedAt": "2024-07-01T10:00:00Z"
    }
  ],
  "total": 456,
  "page": 1,
  "limit": 20
}
```

### Get Verification Queue
```
GET /api/admin/verification-queue
Authorization: Bearer {admin_token}

Response:
{
  "data": [
    {
      "id": "prof_123",
      "name": "Dr. Vikram Singh",
      "category": "Doctor",
      "documents": [
        {
          "type": "license",
          "url": "https://storage.url/license.pdf",
          "status": "pending"
        }
      ],
      "submittedAt": "2024-07-10T10:00:00Z"
    }
  ],
  "total": 5
}
```

### Verify Professional
```
POST /api/admin/verify-professional
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "professionalId": "prof_123",
  "approved": true,
  "notes": "All documents verified"
}

Response:
{
  "success": true,
  "message": "Professional verified successfully"
}
```

## Error Responses

All error responses follow this format:

```
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` - Missing or invalid authentication token
- `FORBIDDEN` - User doesn't have permission
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `CONFLICT` - Resource already exists
- `INTERNAL_ERROR` - Server error

## Rate Limiting

API requests are rate limited to 1000 requests per hour per user.

Response headers include:
- `X-RateLimit-Limit: 1000`
- `X-RateLimit-Remaining: 999`
- `X-RateLimit-Reset: 1626432000`

## Webhooks

DrxVisit sends webhooks for important events:

### Appointment Confirmed
```
POST {your_webhook_url}
Content-Type: application/json

{
  "event": "appointment.confirmed",
  "data": {
    "appointmentId": "apt_123",
    "patientId": "user_123",
    "professionalId": "prof_123",
    "date": "2024-07-20",
    "time": "10:00 AM"
  }
}
```

### Payment Completed
```
POST {your_webhook_url}
Content-Type: application/json

{
  "event": "payment.completed",
  "data": {
    "transactionId": "txn_123",
    "amount": 500,
    "status": "completed",
    "appointmentId": "apt_123"
  }
}
```

