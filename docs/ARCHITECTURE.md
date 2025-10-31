# 🏗️ FWC HRMS Architecture Documentation

## System Overview

The FWC HRMS follows a modern three-tier architecture with clear separation of concerns:

```mermaid
graph TB
    subgraph "Client Layer"
        UI[React Frontend]
        PWA[Progressive Web App]
    end
    
    subgraph "Application Layer"
        API[Express.js API Server]
        AUTH[Authentication Service]
        AI[AI Analytics Engine]
        FILE[File Upload Service]
    end
    
    subgraph "Data Layer"
        DB[(SQLite Database)]
        STORAGE[File Storage]
        CACHE[In-Memory Cache]
    end
    
    UI --> API
    PWA --> API
    API --> AUTH
    API --> AI
    API --> FILE
    API --> DB
    FILE --> STORAGE
    AUTH --> DB
    AI --> DB
```

## High-Level Architecture

### Frontend Architecture (React + Vite)

```
HRMS_Frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Generic components (Button, Modal, etc.)
│   │   ├── forms/        # Form-specific components
│   │   └── charts/       # Data visualization components
│   ├── pages/            # Route-based page components
│   │   ├── admin/        # Admin-specific pages
│   │   ├── hr/           # HR-specific pages
│   │   ├── manager/      # Manager-specific pages
│   │   └── employee/     # Employee-specific pages
│   ├── services/         # API service layer
│   │   ├── api.js        # Base API configuration
│   │   ├── authService.js # Authentication services
│   │   └── aiService.js  # AI analytics services
│   ├── contexts/         # React context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   └── styles/           # Global styles and themes
```

### Backend Architecture (Node.js + Express)

```
HRMS_Backend/
├── routes/               # API route definitions
│   ├── authRoutes.js    # Authentication endpoints
│   ├── userRoutes.js    # User management endpoints
│   ├── leaveRoutes.js   # Leave management endpoints
│   ├── jobRoutes.js     # Job posting endpoints
│   └── aiRoutes.js      # AI analytics endpoints
├── controllers/          # Business logic controllers
├── middlewares/         # Custom middleware
│   ├── auth.js          # JWT authentication
│   ├── validation.js    # Input validation
│   └── errorHandler.js  # Error handling
├── prisma/              # Database schema & migrations
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── utils/               # Backend utilities
└── uploads/             # File upload storage
```

## Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ LeaveRequest : creates
    User ||--o{ JobApplication : submits
    User ||--o{ Event : organizes
    User }o--|| Role : has
    
    User {
        string id PK
        string email UK
        string password
        string firstName
        string lastName
        string phone
        string address
        string avatar
        int roleId FK
        boolean twoFactorEnabled
        datetime createdAt
        datetime updatedAt
    }
    
    Role {
        int id PK
        string name UK
        string description
        json permissions
    }
    
    LeaveRequest {
        string id PK
        string userId FK
        string type
        date startDate
        date endDate
        string reason
        string status
        string managerComments
        datetime createdAt
        datetime updatedAt
    }
    
    JobPosting {
        string id PK
        string title
        string description
        string department
        string location
        string salaryRange
        string requirements
        string status
        datetime deadline
        datetime createdAt
        datetime updatedAt
    }
    
    JobApplication {
        string id PK
        string jobId FK
        string userId FK
        string resume
        string coverLetter
        string status
        datetime appliedAt
        datetime updatedAt
    }
    
    Event {
        string id PK
        string title
        string description
        datetime startDate
        datetime endDate
        string location
        string organizerId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Interview {
        string id PK
        string applicationId FK
        datetime scheduledAt
        string interviewerIds
        string status
        string feedback
        datetime createdAt
        datetime updatedAt
    }
```

## API Architecture

### RESTful API Design

```mermaid
graph LR
    subgraph "Authentication Layer"
        JWT[JWT Middleware]
        RBAC[Role-Based Access Control]
    end
    
    subgraph "API Routes"
        AUTH_R[/api/auth/*]
        USER_R[/api/users/*]
        LEAVE_R[/api/leaves/*]
        JOB_R[/api/jobs/*]
        AI_R[/api/ai/*]
        FILE_R[/api/files/*]
    end
    
    subgraph "Controllers"
        AUTH_C[AuthController]
        USER_C[UserController]
        LEAVE_C[LeaveController]
        JOB_C[JobController]
        AI_C[AIController]
        FILE_C[FileController]
    end
    
    subgraph "Services"
        DB_S[Database Service]
        AI_S[AI Service]
        EMAIL_S[Email Service]
        FILE_S[File Service]
    end
    
    JWT --> AUTH_R
    JWT --> USER_R
    JWT --> LEAVE_R
    JWT --> JOB_R
    JWT --> AI_R
    JWT --> FILE_R
    
    RBAC --> AUTH_R
    RBAC --> USER_R
    RBAC --> LEAVE_R
    RBAC --> JOB_R
    RBAC --> AI_R
    RBAC --> FILE_R
    
    AUTH_R --> AUTH_C
    USER_R --> USER_C
    LEAVE_R --> LEAVE_C
    JOB_R --> JOB_C
    AI_R --> AI_C
    FILE_R --> FILE_C
    
    AUTH_C --> DB_S
    USER_C --> DB_S
    LEAVE_C --> DB_S
    JOB_C --> DB_S
    AI_C --> AI_S
    FILE_C --> FILE_S
    
    AI_C --> DB_S
    AUTH_C --> EMAIL_S
```

## Data Flow Architecture

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant DB
    
    Client->>API: POST /api/auth/login
    API->>Auth: Validate credentials
    Auth->>DB: Query user
    DB-->>Auth: User data
    Auth->>Auth: Verify password
    Auth->>Auth: Generate JWT
    Auth-->>API: JWT token
    API-->>Client: Authentication response
    
    Note over Client: Store JWT in localStorage
    
    Client->>API: GET /api/users/profile (with JWT)
    API->>Auth: Verify JWT
    Auth-->>API: User payload
    API->>DB: Query user profile
    DB-->>API: Profile data
    API-->>Client: Profile response
```

### Leave Request Flow

```mermaid
sequenceDiagram
    participant Employee
    participant API
    participant DB
    participant Manager
    participant Email
    
    Employee->>API: POST /api/leaves/request
    API->>DB: Create leave request
    DB-->>API: Request created
    API->>Email: Notify manager
    API-->>Employee: Request submitted
    
    Manager->>API: GET /api/leaves/pending
    API->>DB: Query pending requests
    DB-->>API: Pending requests
    API-->>Manager: Requests list
    
    Manager->>API: PUT /api/leaves/:id/approve
    API->>DB: Update request status
    DB-->>API: Request updated
    API->>Email: Notify employee
    API-->>Manager: Approval confirmed
```

### AI Analytics Flow

```mermaid
sequenceDiagram
    participant Dashboard
    participant API
    participant AI_Service
    participant DB
    participant Gemini_AI
    
    Dashboard->>API: GET /api/ai/performance-insights
    API->>DB: Query employee data
    DB-->>API: Raw performance data
    API->>AI_Service: Process data
    AI_Service->>Gemini_AI: Generate insights
    Gemini_AI-->>AI_Service: AI analysis
    AI_Service->>DB: Cache results
    AI_Service-->>API: Processed insights
    API-->>Dashboard: Analytics response
```

## Security Architecture

### Authentication & Authorization

```mermaid
graph TB
    subgraph "Security Layers"
        CORS[CORS Protection]
        HELMET[Helmet Security Headers]
        RATE[Rate Limiting]
        VALID[Input Validation]
    end
    
    subgraph "Authentication"
        JWT_AUTH[JWT Authentication]
        TWO_FA[Two-Factor Authentication]
        REFRESH[Refresh Tokens]
    end
    
    subgraph "Authorization"
        RBAC_SYS[Role-Based Access Control]
        PERM[Permission System]
        AUDIT[Audit Logging]
    end
    
    CORS --> JWT_AUTH
    HELMET --> JWT_AUTH
    RATE --> JWT_AUTH
    VALID --> JWT_AUTH
    
    JWT_AUTH --> RBAC_SYS
    TWO_FA --> RBAC_SYS
    REFRESH --> RBAC_SYS
    
    RBAC_SYS --> PERM
    PERM --> AUDIT
```

## Deployment Architecture

### Production Environment

```mermaid
graph TB
    subgraph "Load Balancer"
        LB[Nginx Load Balancer]
    end
    
    subgraph "Application Servers"
        APP1[Node.js Instance 1]
        APP2[Node.js Instance 2]
        APP3[Node.js Instance 3]
    end
    
    subgraph "Static Assets"
        CDN[CDN/Static Files]
        REACT[React Build]
    end
    
    subgraph "Database Layer"
        PRIMARY[(Primary Database)]
        REPLICA[(Read Replica)]
        BACKUP[(Backup Storage)]
    end
    
    subgraph "Monitoring"
        LOGS[Log Aggregation]
        METRICS[Metrics Collection]
        ALERTS[Alert System]
    end
    
    LB --> APP1
    LB --> APP2
    LB --> APP3
    LB --> CDN
    
    APP1 --> PRIMARY
    APP2 --> PRIMARY
    APP3 --> PRIMARY
    
    APP1 --> REPLICA
    APP2 --> REPLICA
    APP3 --> REPLICA
    
    PRIMARY --> BACKUP
    
    APP1 --> LOGS
    APP2 --> LOGS
    APP3 --> LOGS
    
    LOGS --> METRICS
    METRICS --> ALERTS
```

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Memoization**: React.memo and useMemo for expensive operations
- **Virtual Scrolling**: For large data lists
- **Image Optimization**: WebP format and responsive images

### Backend Optimization
- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: Redis for session and query caching
- **Connection Pooling**: Efficient database connections
- **Compression**: Gzip compression for API responses
- **Rate Limiting**: Prevent API abuse

### Scalability Features
- **Horizontal Scaling**: Multiple application instances
- **Database Sharding**: For large datasets
- **Microservices Ready**: Modular architecture
- **API Versioning**: Backward compatibility
- **Event-Driven Architecture**: Async processing capabilities

## Technology Stack Integration

```mermaid
graph TB
    subgraph "Frontend Stack"
        REACT[React 19.1.1]
        VITE[Vite 7.1.11]
        TAILWIND[Tailwind CSS]
        ROUTER[React Router]
    end
    
    subgraph "Backend Stack"
        NODE[Node.js]
        EXPRESS[Express 5.1.0]
        PRISMA[Prisma 6.18.0]
        SQLITE[SQLite]
    end
    
    subgraph "AI Integration"
        GEMINI[Google Gemini AI]
        ANALYTICS[Custom Analytics]
    end
    
    subgraph "Development Tools"
        ESLINT[ESLint]
        PRETTIER[Prettier]
        NODEMON[Nodemon]
    end
    
    REACT --> EXPRESS
    VITE --> EXPRESS
    EXPRESS --> PRISMA
    PRISMA --> SQLITE
    EXPRESS --> GEMINI
    GEMINI --> ANALYTICS
```

This architecture ensures:
- **Scalability**: Horizontal and vertical scaling capabilities
- **Maintainability**: Clear separation of concerns
- **Security**: Multiple layers of protection
- **Performance**: Optimized for speed and efficiency
- **Flexibility**: Easy to extend and modify