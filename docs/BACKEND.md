# 🚀 Backend Documentation - FWC HRMS

## Overview

The FWC HRMS backend is built with Node.js and Express.js, providing a robust REST API with JWT authentication, role-based access control, and comprehensive data management. The system uses Prisma ORM with PostgreSQL for data persistence and includes advanced features like AI analytics and file management.

## Technology Stack

- **Node.js 20.x** - Runtime environment
- **Express.js 4.21.2** - Web framework
- **Prisma 6.1.0** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email services
- **Winston** - Logging
- **Joi** - Input validation

## Project Structure

```
HRMS_Backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── src/
│   ├── controllers/       # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── leaveController.js
│   │   ├── jobController.js
│   │   └── aiController.js
│   ├── middleware/        # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── jobRoutes.js
│   │   └── aiRoutes.js
│   ├── services/         # Business logic
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── leaveService.js
│   │   ├── jobService.js
│   │   ├── aiService.js
│   │   └── emailService.js
│   ├── utils/            # Utility functions
│   │   ├── logger.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── config/           # Configuration
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── email.js
│   └── app.js            # Express app setup
├── uploads/              # File uploads
├── logs/                 # Application logs
├── package.json          # Dependencies
└── server.js             # Server entry point
```

## Database Schema

### Core Models

#### User Model
```prisma
model User {
  id                Int      @id @default(autoincrement())
  email             String   @unique
  password          String
  firstName         String?
  lastName          String?
  phoneNumber       String?
  address           String?
  dateOfBirth       DateTime?
  hireDate          DateTime?
  salary            Float?
  department        String?
  position          String?
  avatar            String?
  roleId            Int      @default(4)
  twoFactorEnabled  Boolean  @default(false)
  isActive          Boolean  @default(true)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  // Relations
  role              Role     @relation(fields: [roleId], references: [id])
  leaveRequests     LeaveRequest[]
  jobApplications   JobApplication[]
  events            Event[]
  
  @@map("users")
}
```

#### Leave Request Model
```prisma
model LeaveRequest {
  id          Int      @id @default(autoincrement())
  userId      Int
  startDate   DateTime
  endDate     DateTime
  reason      String
  status      String   @default("pending")
  managerComment String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User     @relation(fields: [userId], references: [id])
  
  @@map("leave_requests")
}
```

#### Job Application Model
```prisma
model JobApplication {
  id          Int      @id @default(autoincrement())
  userId      Int
  jobTitle    String
  department  String
  experience  String
  skills      String
  resume      String?
  coverLetter String?
  status      String   @default("pending")
  appliedAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User     @relation(fields: [userId], references: [id])
  
  @@map("job_applications")
}
```

## API Architecture

### Controller Layer

Controllers handle HTTP requests and responses, delegating business logic to services.

```javascript
// src/controllers/authController.js
const authService = require('../services/authService');
const { validationResult } = require('express-validator');

class AuthController {
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const userData = req.body;
      const result = await authService.register(userData);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const profile = await authService.getProfile(userId);

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
```

### Service Layer

Services contain business logic and interact with the database through Prisma.

```javascript
// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const config = require('../config/jwt');

const prisma = new PrismaClient();

class AuthService {
  async login(email, password) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        roleId: user.roleId 
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword
    };
  }

  async register(userData) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      },
      include: { role: true }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        role: true,
        leaveRequests: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userId, updateData) {
    // If password is being updated, hash it
    if (updateData.password) {
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: { role: true }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new AuthService();
```

### Middleware

#### Authentication Middleware

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const config = require('../config/jwt');

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.roleId)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
};
```

#### Validation Middleware

```javascript
// src/middleware/validation.js
const { body, param, query } = require('express-validator');

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least 8 characters with uppercase, lowercase, number and special character'),
  body('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required')
];

const validateLeaveRequest = [
  body('startDate')
    .isISO8601()
    .toDate()
    .withMessage('Valid start date is required'),
  body('endDate')
    .isISO8601()
    .toDate()
    .withMessage('Valid end date is required')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('reason')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Reason must be between 10 and 500 characters')
];

const validateJobApplication = [
  body('jobTitle')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Job title is required'),
  body('department')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Department is required'),
  body('experience')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Experience description must be at least 10 characters'),
  body('skills')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Skills description must be at least 10 characters')
];

module.exports = {
  validateLogin,
  validateRegistration,
  validateLeaveRequest,
  validateJobApplication
};
```

#### Error Handler Middleware

```javascript
// src/middleware/errorHandler.js
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(err);

  // Prisma errors
  if (err.code === 'P2002') {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  if (err.code === 'P2025') {
    const message = 'Record not found';
    error = { message, statusCode: 404 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

#### Rate Limiting Middleware

```javascript
// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload rate limiting
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 uploads per hour
  message: {
    success: false,
    message: 'Too many file uploads, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  authLimiter,
  uploadLimiter
};
```

## Route Configuration

### Main Routes Setup

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const jobRoutes = require('./routes/jobRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api', apiLimiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
```

### Auth Routes

```javascript
// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { validateLogin, validateRegistration } = require('../middleware/validation');
const { authLimiter } = require('../middleware/rateLimiter');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes with rate limiting
router.post('/login', authLimiter, validateLogin, authController.login);
router.post('/register', authLimiter, validateRegistration, authController.register);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.post('/change-password', authenticateToken, authController.changePassword);
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
```

## Database Operations

### Prisma Client Setup

```javascript
// src/config/database.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

// Connection event handlers
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Duration: ' + e.duration + 'ms');
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
```

### Advanced Queries

```javascript
// Complex query examples
class UserService {
  // Get users with pagination and filtering
  async getUsers(page = 1, limit = 10, filters = {}) {
    const skip = (page - 1) * limit;
    
    const where = {};
    if (filters.department) where.department = filters.department;
    if (filters.roleId) where.roleId = parseInt(filters.roleId);
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          role: true,
          _count: {
            select: {
              leaveRequests: true,
              jobApplications: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    return {
      users: users.map(({ password, ...user }) => user),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get user analytics
  async getUserAnalytics(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        leaveRequests: {
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), 0, 1) // This year
            }
          }
        },
        jobApplications: true
      }
    });

    const leaveStats = {
      totalRequests: user.leaveRequests.length,
      approvedRequests: user.leaveRequests.filter(req => req.status === 'approved').length,
      pendingRequests: user.leaveRequests.filter(req => req.status === 'pending').length,
      rejectedRequests: user.leaveRequests.filter(req => req.status === 'rejected').length
    };

    return {
      user: { ...user, password: undefined },
      leaveStats,
      applicationCount: user.jobApplications.length
    };
  }
}
```

## File Upload Handling

### Multer Configuration

```javascript
// src/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'general';
    
    if (file.fieldname === 'avatar') folder = 'avatars';
    if (file.fieldname === 'resume') folder = 'resumes';
    if (file.fieldname === 'document') folder = 'documents';
    
    const folderPath = path.join(uploadDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    avatar: ['image/jpeg', 'image/png', 'image/gif'],
    resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    document: ['application/pdf', 'image/jpeg', 'image/png']
  };

  const fieldAllowedTypes = allowedTypes[file.fieldname] || allowedTypes.document;
  
  if (fieldAllowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${fieldAllowedTypes.join(', ')}`), false);
  }
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  }
});

module.exports = upload;
```

## Email Service

```javascript
// src/services/emailService.js
const nodemailer = require('nodemailer');
const config = require('../config/email');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
      }
    });
  }

  async sendWelcomeEmail(user) {
    const mailOptions = {
      from: config.FROM_EMAIL,
      to: user.email,
      subject: 'Welcome to FWC HRMS',
      html: `
        <h1>Welcome ${user.firstName}!</h1>
        <p>Your account has been created successfully.</p>
        <p>You can now log in to the HRMS system using your email and password.</p>
        <a href="${config.FRONTEND_URL}/login">Login to HRMS</a>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendLeaveStatusUpdate(user, leaveRequest) {
    const mailOptions = {
      from: config.FROM_EMAIL,
      to: user.email,
      subject: `Leave Request ${leaveRequest.status}`,
      html: `
        <h1>Leave Request Update</h1>
        <p>Dear ${user.firstName},</p>
        <p>Your leave request from ${leaveRequest.startDate} to ${leaveRequest.endDate} has been <strong>${leaveRequest.status}</strong>.</p>
        ${leaveRequest.managerComment ? `<p>Manager Comment: ${leaveRequest.managerComment}</p>` : ''}
        <a href="${config.FRONTEND_URL}/employee/leaves">View Leave Requests</a>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: config.FROM_EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset for your HRMS account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();
```

## Logging System

```javascript
// src/utils/logger.js
const winston = require('winston');
const path = require('path');

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');
require('fs').mkdirSync(logDir, { recursive: true });

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'hrms-backend' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log')
    })
  ]
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
```

## AI Service Integration

```javascript
// src/services/aiService.js
class AIService {
  // Performance prediction algorithm
  async predictPerformance(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        leaveRequests: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Last year
            }
          }
        }
      }
    });

    // Simple performance scoring algorithm
    const leaveScore = this.calculateLeaveScore(user.leaveRequests);
    const tenureScore = this.calculateTenureScore(user.hireDate);
    const departmentScore = this.getDepartmentScore(user.department);

    const overallScore = (leaveScore * 0.3 + tenureScore * 0.4 + departmentScore * 0.3);
    
    return {
      userId,
      performanceScore: Math.round(overallScore * 100) / 100,
      prediction: this.getPerformancePrediction(overallScore),
      factors: {
        leaveUsage: leaveScore,
        tenure: tenureScore,
        department: departmentScore
      },
      recommendations: this.generateRecommendations(overallScore, user)
    };
  }

  calculateLeaveScore(leaveRequests) {
    const totalDays = leaveRequests.reduce((sum, req) => {
      const days = Math.ceil((new Date(req.endDate) - new Date(req.startDate)) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);

    // Score based on leave usage (less leave = higher score)
    if (totalDays <= 10) return 1.0;
    if (totalDays <= 20) return 0.8;
    if (totalDays <= 30) return 0.6;
    return 0.4;
  }

  calculateTenureScore(hireDate) {
    if (!hireDate) return 0.5;
    
    const years = (Date.now() - new Date(hireDate)) / (1000 * 60 * 60 * 24 * 365);
    
    if (years >= 5) return 1.0;
    if (years >= 3) return 0.9;
    if (years >= 1) return 0.7;
    return 0.5;
  }

  getDepartmentScore(department) {
    const departmentScores = {
      'Engineering': 0.9,
      'Sales': 0.8,
      'Marketing': 0.8,
      'HR': 0.7,
      'Finance': 0.8,
      'Operations': 0.7
    };
    
    return departmentScores[department] || 0.6;
  }

  getPerformancePrediction(score) {
    if (score >= 0.8) return 'Excellent';
    if (score >= 0.7) return 'Good';
    if (score >= 0.6) return 'Average';
    if (score >= 0.5) return 'Below Average';
    return 'Poor';
  }

  generateRecommendations(score, user) {
    const recommendations = [];
    
    if (score < 0.6) {
      recommendations.push('Consider additional training programs');
      recommendations.push('Schedule regular one-on-one meetings');
    }
    
    if (score >= 0.8) {
      recommendations.push('Consider for promotion opportunities');
      recommendations.push('Assign mentorship responsibilities');
    }
    
    return recommendations;
  }

  // Export analytics data
  async exportPerformanceData(format = 'json') {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        leaveRequests: true
      }
    });

    const performanceData = await Promise.all(
      users.map(async (user) => {
        const prediction = await this.predictPerformance(user.id);
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          department: user.department,
          role: user.role.name,
          performanceScore: prediction.performanceScore,
          prediction: prediction.prediction
        };
      })
    );

    if (format === 'csv') {
      return this.convertToCSV(performanceData);
    }
    
    return performanceData;
  }

  convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  }
}

module.exports = new AIService();
```

## Security Best Practices

### Input Sanitization

```javascript
// src/utils/sanitizer.js
const validator = require('validator');

class Sanitizer {
  static sanitizeString(str) {
    if (typeof str !== 'string') return str;
    return validator.escape(str.trim());
  }

  static sanitizeEmail(email) {
    if (typeof email !== 'string') return email;
    return validator.normalizeEmail(email.trim().toLowerCase());
  }

  static sanitizeObject(obj, allowedFields) {
    const sanitized = {};
    
    allowedFields.forEach(field => {
      if (obj.hasOwnProperty(field)) {
        if (typeof obj[field] === 'string') {
          sanitized[field] = this.sanitizeString(obj[field]);
        } else {
          sanitized[field] = obj[field];
        }
      }
    });
    
    return sanitized;
  }
}

module.exports = Sanitizer;
```

### Password Security

```javascript
// src/utils/passwordUtils.js
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class PasswordUtils {
  static async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  static generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  static validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!hasNumbers) {
      errors.push('Password must contain at least one number');
    }
    
    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = PasswordUtils;
```

## Environment Configuration

```javascript
// src/config/index.js
require('dotenv').config();

module.exports = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  FROM_EMAIL: process.env.FROM_EMAIL,
  
  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // File Upload
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '5MB',
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100
};
```

## Testing

### Unit Tests

```javascript
// tests/services/authService.test.js
const authService = require('../../src/services/authService');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

describe('AuthService', () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
  });

  describe('login', () => {
    test('should login user with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: '$2b$12$hashedpassword',
        isActive: true,
        role: { id: 1, name: 'Admin' }
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      
      const result = await authService.login('test@example.com', 'password');
      
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.password).toBeUndefined();
    });

    test('should throw error for invalid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      
      await expect(
        authService.login('invalid@example.com', 'password')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```

### Integration Tests

```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('Auth Endpoints', () => {
  describe('POST /api/auth/login', () => {
    test('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
    });

    test('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: '123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
```

## Deployment

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/hrms
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - db
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=hrms
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## Performance Optimization

### Database Optimization

```javascript
// Implement connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=20&pool_timeout=20'
    }
  }
});

// Use database indexes
// In schema.prisma:
// @@index([email])
// @@index([roleId])
// @@index([createdAt])
```

### Caching Strategy

```javascript
// src/utils/cache.js
const NodeCache = require('node-cache');

class CacheService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 600 }); // 10 minutes default
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl = 600) {
    return this.cache.set(key, value, ttl);
  }

  del(key) {
    return this.cache.del(key);
  }

  flush() {
    return this.cache.flushAll();
  }
}

module.exports = new CacheService();
```

This comprehensive backend documentation covers all aspects of the FWC HRMS backend implementation, from architecture and security to deployment and optimization.