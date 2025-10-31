# 📡 FWC HRMS API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

### JWT Token Authentication
All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

### Token Structure
```json
{
  "userId": "string",
  "email": "string",
  "roleId": "number",
  "iat": "number",
  "exp": "number"
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": {}
}
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "roleId": 4
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roleId": 4
    },
    "token": "jwt_token_here"
  },
  "message": "User registered successfully"
}
```

### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roleId": 4,
      "role": {
        "id": 4,
        "name": "Employee"
      }
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### POST /auth/logout
Logout user (client-side token removal).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST /auth/forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

## User Management Endpoints

### GET /users/profile
Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "123 Main St",
    "avatar": "avatar_url",
    "roleId": 4,
    "role": {
      "id": 4,
      "name": "Employee"
    },
    "twoFactorEnabled": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /users/profile
Update current user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "456 New St"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "456 New St"
  },
  "message": "Profile updated successfully"
}
```

### GET /users
Get all users (Admin/HR only).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `role` (optional): Filter by role ID

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "roleId": 4,
        "role": {
          "name": "Employee"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

### POST /users/avatar
Upload user avatar.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:** FormData with `avatar` file

**Response:**
```json
{
  "success": true,
  "data": {
    "avatarUrl": "http://localhost:3000/uploads/avatars/filename.jpg"
  },
  "message": "Avatar uploaded successfully"
}
```

## Leave Management Endpoints

### GET /leaves
Get leave requests.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): Filter by status (pending, approved, rejected)
- `userId` (optional): Filter by user ID (Admin/HR/Manager only)
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "leave_id",
      "userId": "user_id",
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "type": "vacation",
      "startDate": "2024-02-01",
      "endDate": "2024-02-05",
      "reason": "Family vacation",
      "status": "pending",
      "managerComments": null,
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### POST /leaves
Create new leave request.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "vacation",
  "startDate": "2024-02-01",
  "endDate": "2024-02-05",
  "reason": "Family vacation"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "leave_id",
    "userId": "user_id",
    "type": "vacation",
    "startDate": "2024-02-01",
    "endDate": "2024-02-05",
    "reason": "Family vacation",
    "status": "pending",
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  "message": "Leave request submitted successfully"
}
```

### PUT /leaves/:id/approve
Approve leave request (Manager/HR/Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "managerComments": "Approved for vacation"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "leave_id",
    "status": "approved",
    "managerComments": "Approved for vacation",
    "updatedAt": "2024-01-16T00:00:00.000Z"
  },
  "message": "Leave request approved"
}
```

### PUT /leaves/:id/reject
Reject leave request (Manager/HR/Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "managerComments": "Insufficient staffing during requested period"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "leave_id",
    "status": "rejected",
    "managerComments": "Insufficient staffing during requested period",
    "updatedAt": "2024-01-16T00:00:00.000Z"
  },
  "message": "Leave request rejected"
}
```

## Job Management Endpoints

### GET /jobs
Get job postings.

**Query Parameters:**
- `status` (optional): Filter by status (active, closed, draft)
- `department` (optional): Filter by department
- `search` (optional): Search in title and description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "job_id",
      "title": "Software Engineer",
      "description": "Full-stack developer position",
      "department": "Engineering",
      "location": "Remote",
      "salaryRange": "$80,000 - $120,000",
      "requirements": "3+ years experience with React and Node.js",
      "status": "active",
      "deadline": "2024-03-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /jobs
Create new job posting (HR/Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Full-stack developer position",
  "department": "Engineering",
  "location": "Remote",
  "salaryRange": "$80,000 - $120,000",
  "requirements": "3+ years experience with React and Node.js",
  "deadline": "2024-03-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "job_id",
    "title": "Software Engineer",
    "description": "Full-stack developer position",
    "department": "Engineering",
    "location": "Remote",
    "salaryRange": "$80,000 - $120,000",
    "requirements": "3+ years experience with React and Node.js",
    "status": "active",
    "deadline": "2024-03-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Job posting created successfully"
}
```

### POST /jobs/:id/apply
Apply for a job position.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:** FormData with:
- `coverLetter`: Text
- `resume`: File

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "application_id",
    "jobId": "job_id",
    "userId": "user_id",
    "coverLetter": "I am interested in this position...",
    "resume": "resume_file_url",
    "status": "pending",
    "appliedAt": "2024-01-15T00:00:00.000Z"
  },
  "message": "Application submitted successfully"
}
```

### GET /jobs/:id/applications
Get applications for a job (HR/Admin only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "application_id",
      "jobId": "job_id",
      "userId": "user_id",
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "coverLetter": "I am interested in this position...",
      "resume": "resume_file_url",
      "status": "pending",
      "appliedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

## AI Analytics Endpoints

### GET /ai/performance-insights
Get AI-powered performance insights.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `period` (optional): Time period (week, month, quarter, year)
- `department` (optional): Filter by department

**Response:**
```json
{
  "success": true,
  "data": {
    "overallScore": 85,
    "trends": {
      "productivity": "increasing",
      "satisfaction": "stable",
      "retention": "improving"
    },
    "insights": [
      {
        "category": "productivity",
        "message": "Team productivity has increased by 15% this quarter",
        "confidence": 0.92,
        "recommendations": [
          "Continue current project management practices",
          "Consider expanding successful team structures"
        ]
      }
    ],
    "metrics": {
      "avgPerformanceScore": 4.2,
      "employeeSatisfaction": 4.1,
      "retentionRate": 0.94,
      "productivityIndex": 1.15
    },
    "generatedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

### GET /ai/predictive-analytics
Get predictive analytics data.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "predictions": [
      {
        "type": "turnover_risk",
        "probability": 0.23,
        "timeframe": "next_quarter",
        "factors": ["workload", "compensation", "career_growth"],
        "recommendations": [
          "Review compensation packages",
          "Implement career development programs"
        ]
      },
      {
        "type": "budget_forecast",
        "amount": 125000,
        "category": "hiring_costs",
        "timeframe": "next_quarter",
        "confidence": 0.87
      }
    ],
    "riskAssessment": {
      "overall": "low",
      "categories": {
        "retention": "medium",
        "productivity": "low",
        "budget": "low"
      }
    },
    "generatedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

### POST /ai/export/performance
Export performance analytics data.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "format": "csv",
  "period": "month",
  "includeCharts": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "http://localhost:3000/api/files/download/performance_export_123.csv",
    "filename": "performance_analytics_2024_01.csv",
    "size": 15420,
    "expiresAt": "2024-01-16T00:00:00.000Z"
  },
  "message": "Export generated successfully"
}
```

### GET /ai/system-status
Get AI system status.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "services": {
      "gemini_ai": {
        "status": "online",
        "responseTime": 245,
        "lastCheck": "2024-01-15T12:00:00.000Z"
      },
      "analytics_engine": {
        "status": "online",
        "responseTime": 89,
        "lastCheck": "2024-01-15T12:00:00.000Z"
      }
    },
    "usage": {
      "requests_today": 1247,
      "quota_remaining": 8753,
      "quota_reset": "2024-01-16T00:00:00.000Z"
    }
  }
}
```

## Event Management Endpoints

### GET /events
Get company events.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `upcoming` (optional): Filter upcoming events (true/false)
- `month` (optional): Filter by month (YYYY-MM)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "event_id",
      "title": "Team Building Workshop",
      "description": "Annual team building activities",
      "startDate": "2024-02-15T09:00:00.000Z",
      "endDate": "2024-02-15T17:00:00.000Z",
      "location": "Conference Room A",
      "organizerId": "user_id",
      "organizer": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /events
Create new event (HR/Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Team Building Workshop",
  "description": "Annual team building activities",
  "startDate": "2024-02-15T09:00:00.000Z",
  "endDate": "2024-02-15T17:00:00.000Z",
  "location": "Conference Room A"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "event_id",
    "title": "Team Building Workshop",
    "description": "Annual team building activities",
    "startDate": "2024-02-15T09:00:00.000Z",
    "endDate": "2024-02-15T17:00:00.000Z",
    "location": "Conference Room A",
    "organizerId": "user_id",
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  "message": "Event created successfully"
}
```

## File Management Endpoints

### POST /files/upload
Upload files.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:** FormData with files

**Response:**
```json
{
  "success": true,
  "data": {
    "files": [
      {
        "filename": "document.pdf",
        "originalName": "important_document.pdf",
        "size": 1024000,
        "mimetype": "application/pdf",
        "url": "http://localhost:3000/uploads/documents/document.pdf"
      }
    ]
  },
  "message": "Files uploaded successfully"
}
```

### GET /files/download/:filename
Download file.

**Headers:** `Authorization: Bearer <token>`

**Response:** File download

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute
- **File upload endpoints**: 10 requests per minute
- **AI endpoints**: 20 requests per minute

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642694400
```

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response includes pagination metadata:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Webhooks

The system supports webhooks for real-time notifications:

### Webhook Events
- `user.created`
- `user.updated`
- `leave.requested`
- `leave.approved`
- `leave.rejected`
- `job.applied`
- `event.created`

### Webhook Payload
```json
{
  "event": "leave.approved",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "data": {
    "leaveId": "leave_id",
    "userId": "user_id",
    "status": "approved"
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get user profile
const profile = await api.get('/users/profile');

// Create leave request
const leave = await api.post('/leaves', {
  type: 'vacation',
  startDate: '2024-02-01',
  endDate: '2024-02-05',
  reason: 'Family vacation'
});
```

### cURL Examples
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get profile
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create leave request
curl -X POST http://localhost:3000/api/leaves \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"vacation","startDate":"2024-02-01","endDate":"2024-02-05","reason":"Family vacation"}'
```