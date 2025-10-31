# 🚀 Deployment & Setup Guide - FWC HRMS

## Overview

This guide covers the complete deployment process for the FWC HRMS system, from local development setup to production deployment. The system consists of a React frontend, Node.js backend, and PostgreSQL database.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Production Deployment](#production-deployment)
6. [Docker Deployment](#docker-deployment)
7. [Cloud Deployment](#cloud-deployment)
8. [CI/CD Pipeline](#cicd-pipeline)
9. [Monitoring & Logging](#monitoring--logging)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **PostgreSQL**: 15.x or higher
- **Git**: Latest version
- **Docker**: 24.x or higher (for containerized deployment)

### Development Tools

- **Code Editor**: VS Code (recommended)
- **Database Client**: pgAdmin, DBeaver, or similar
- **API Testing**: Postman or Insomnia
- **Terminal**: PowerShell, Git Bash, or WSL2

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/FWC_HRMS.git
cd FWC_HRMS
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd HRMS_Backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables (see Environment Configuration section)
# Configure your database connection and other settings

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd HRMS_Frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
# Set VITE_API_URL=http://localhost:3000/api

# Start development server
npm run dev
```

### 4. Verify Installation

1. **Backend**: Visit `http://localhost:3000/api/health`
2. **Frontend**: Visit `http://localhost:5173`
3. **Database**: Check connection using your database client

## Environment Configuration

### Backend Environment Variables

Create `.env` file in `HRMS_Backend/`:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/hrms_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Email Configuration (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="noreply@yourcompany.com"

# Frontend URL
FRONTEND_URL="http://localhost:5173"

# File Upload Configuration
MAX_FILE_SIZE="5MB"
UPLOAD_PATH="./uploads"

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL="info"

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET="your-session-secret"

# AI Service Configuration (if applicable)
AI_API_KEY="your-ai-api-key"
AI_API_URL="https://api.openai.com/v1"
```

### Frontend Environment Variables

Create `.env` file in `HRMS_Frontend/`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Application Configuration
VITE_APP_NAME="FWC HRMS"
VITE_APP_VERSION="1.0.0"
VITE_APP_DESCRIPTION="Human Resource Management System"

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# External Services
VITE_GOOGLE_ANALYTICS_ID=""
VITE_SENTRY_DSN=""

# Development
VITE_DEBUG_MODE=true
```

### Production Environment Variables

For production, update the following:

```env
# Backend (.env.production)
NODE_ENV=production
DATABASE_URL="postgresql://prod_user:secure_password@prod-db-host:5432/hrms_prod"
JWT_SECRET="very-secure-production-jwt-secret-256-bits"
FRONTEND_URL="https://hrms.yourcompany.com"
SMTP_HOST="your-production-smtp-host"
LOG_LEVEL="warn"

# Frontend (.env.production)
VITE_API_URL=https://api.hrms.yourcompany.com/api
VITE_DEBUG_MODE=false
```

## Database Setup

### 1. PostgreSQL Installation

#### Windows
```bash
# Download and install from https://www.postgresql.org/download/windows/
# Or use Chocolatey
choco install postgresql
```

#### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Database Creation

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE hrms_db;

-- Create user
CREATE USER hrms_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE hrms_db TO hrms_user;

-- Exit
\q
```

### 3. Prisma Setup

```bash
# Navigate to backend directory
cd HRMS_Backend

# Initialize Prisma (if not already done)
npx prisma init

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# View database in Prisma Studio (optional)
npx prisma studio
```

### 4. Database Seeding

Create seed file `HRMS_Backend/prisma/seed.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Admin',
      description: 'System Administrator'
    }
  });

  const hrRole = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'HR',
      description: 'Human Resources'
    }
  });

  const managerRole = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Manager',
      description: 'Department Manager'
    }
  });

  const employeeRole = await prisma.role.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'Employee',
      description: 'Regular Employee'
    }
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fwc-hrms.com' },
    update: {},
    create: {
      email: 'admin@fwc-hrms.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      roleId: 1,
      department: 'IT',
      position: 'System Admin',
      isActive: true
    }
  });

  console.log('Database seeded successfully');
  console.log('Admin user created:', adminUser.email);
  console.log('Default password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run the seed:

```bash
npx prisma db seed
```

## Production Deployment

### 1. Server Preparation

#### System Updates
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx
```

#### Node.js Installation
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### PostgreSQL Installation
```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create production database and user
sudo -u postgres psql
CREATE DATABASE hrms_prod;
CREATE USER hrms_prod_user WITH PASSWORD 'very_secure_password';
GRANT ALL PRIVILEGES ON DATABASE hrms_prod TO hrms_prod_user;
\q
```

### 2. Application Deployment

#### Backend Deployment
```bash
# Create application directory
sudo mkdir -p /var/www/hrms-backend
sudo chown $USER:$USER /var/www/hrms-backend

# Clone and setup
cd /var/www/hrms-backend
git clone https://github.com/your-org/FWC_HRMS.git .
cd HRMS_Backend

# Install dependencies
npm ci --only=production

# Setup environment
cp .env.example .env
# Edit .env with production values

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build application (if applicable)
npm run build
```

#### Frontend Deployment
```bash
# Create frontend directory
sudo mkdir -p /var/www/hrms-frontend
sudo chown $USER:$USER /var/www/hrms-frontend

# Setup frontend
cd /var/www/hrms-frontend
cp -r /var/www/hrms-backend/HRMS_Frontend/* .

# Install dependencies and build
npm ci
npm run build

# Copy build files to nginx directory
sudo cp -r dist/* /var/www/html/hrms/
```

### 3. Process Management with PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Create PM2 ecosystem file
cat > /var/www/hrms-backend/HRMS_Backend/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'hrms-backend',
    script: './server.js',
    cwd: '/var/www/hrms-backend/HRMS_Backend',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/hrms-backend-error.log',
    out_file: '/var/log/pm2/hrms-backend-out.log',
    log_file: '/var/log/pm2/hrms-backend.log',
    time: true
  }]
};
EOF

# Start application
cd /var/www/hrms-backend/HRMS_Backend
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
# Follow the instructions provided by the command
```

### 4. Nginx Configuration

```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/hrms << EOF
server {
    listen 80;
    server_name hrms.yourcompany.com;

    # Frontend
    location / {
        root /var/www/html/hrms;
        index index.html;
        try_files \$uri \$uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # File uploads
    location /uploads {
        alias /var/www/hrms-backend/HRMS_Backend/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/hrms /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 5. SSL Certificate Setup

```bash
# Install SSL certificate using Let's Encrypt
sudo certbot --nginx -d hrms.yourcompany.com

# Verify auto-renewal
sudo certbot renew --dry-run
```

## Docker Deployment

### 1. Backend Dockerfile

Create `HRMS_Backend/Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Generate Prisma client
RUN npx prisma generate

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --chown=nodejs:nodejs . .

# Create uploads directory
RUN mkdir -p uploads && chown nodejs:nodejs uploads

USER nodejs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
```

### 2. Frontend Dockerfile

Create `HRMS_Frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3. Docker Compose Configuration

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Database
  postgres:
    image: postgres:15-alpine
    container_name: hrms-postgres
    environment:
      POSTGRES_DB: hrms_prod
      POSTGRES_USER: hrms_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./HRMS_Backend/prisma/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - hrms-network
    restart: unless-stopped

  # Backend
  backend:
    build:
      context: ./HRMS_Backend
      dockerfile: Dockerfile
    container_name: hrms-backend
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://hrms_user:${DB_PASSWORD}@postgres:5432/hrms_prod
      JWT_SECRET: ${JWT_SECRET}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
      FRONTEND_URL: ${FRONTEND_URL}
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    networks:
      - hrms-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Frontend
  frontend:
    build:
      context: ./HRMS_Frontend
      dockerfile: Dockerfile
    container_name: hrms-frontend
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    networks:
      - hrms-network
    restart: unless-stopped

  # Redis (for caching and sessions)
  redis:
    image: redis:7-alpine
    container_name: hrms-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - hrms-network
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  hrms-network:
    driver: bridge
```

### 4. Docker Environment File

Create `.env` for Docker Compose:

```env
# Database
DB_PASSWORD=very_secure_database_password

# JWT
JWT_SECRET=very-secure-jwt-secret-for-production

# Email
SMTP_HOST=smtp.yourprovider.com
SMTP_USER=your-email@company.com
SMTP_PASS=your-email-password

# URLs
FRONTEND_URL=https://hrms.yourcompany.com
```

### 5. Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx prisma db seed

# Scale backend service
docker-compose up -d --scale backend=3
```

## Cloud Deployment

### AWS Deployment

#### 1. EC2 Setup

```bash
# Launch EC2 instance (Ubuntu 22.04 LTS)
# Configure security groups:
# - HTTP (80)
# - HTTPS (443)
# - SSH (22)
# - Custom TCP (3000) for backend

# Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Follow production deployment steps above
```

#### 2. RDS Database Setup

```bash
# Create RDS PostgreSQL instance
# Update DATABASE_URL in environment variables
DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/hrms_prod"
```

#### 3. S3 File Storage

```javascript
// Update backend to use S3 for file uploads
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// File upload to S3
const uploadToS3 = (file, key) => {
  return s3.upload({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  }).promise();
};
```

### Google Cloud Platform

#### 1. Cloud Run Deployment

```yaml
# cloudbuild.yaml
steps:
  # Build backend
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/hrms-backend', './HRMS_Backend']
  
  # Build frontend
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/hrms-frontend', './HRMS_Frontend']
  
  # Push images
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/hrms-backend']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/hrms-frontend']

images:
  - 'gcr.io/$PROJECT_ID/hrms-backend'
  - 'gcr.io/$PROJECT_ID/hrms-frontend'
```

#### 2. Deploy to Cloud Run

```bash
# Deploy backend
gcloud run deploy hrms-backend \
  --image gcr.io/PROJECT_ID/hrms-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Deploy frontend
gcloud run deploy hrms-frontend \
  --image gcr.io/PROJECT_ID/hrms-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy HRMS

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
        cache-dependency-path: |
          HRMS_Backend/package-lock.json
          HRMS_Frontend/package-lock.json
    
    - name: Install backend dependencies
      run: |
        cd HRMS_Backend
        npm ci
    
    - name: Install frontend dependencies
      run: |
        cd HRMS_Frontend
        npm ci
    
    - name: Run backend tests
      run: |
        cd HRMS_Backend
        npm test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
    
    - name: Run frontend tests
      run: |
        cd HRMS_Frontend
        npm test
    
    - name: Build frontend
      run: |
        cd HRMS_Frontend
        npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/hrms-backend
          git pull origin main
          cd HRMS_Backend
          npm ci --only=production
          npx prisma migrate deploy
          pm2 restart hrms-backend
          
          cd /var/www/hrms-frontend
          npm ci
          npm run build
          sudo cp -r dist/* /var/www/html/hrms/
          sudo systemctl reload nginx
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - build
  - deploy

variables:
  POSTGRES_DB: test_db
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres

test:
  stage: test
  image: node:20
  services:
    - postgres:15
  before_script:
    - cd HRMS_Backend && npm ci
    - cd ../HRMS_Frontend && npm ci
  script:
    - cd HRMS_Backend && npm test
    - cd ../HRMS_Frontend && npm test
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHA ./HRMS_Backend
    - docker build -t $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA ./HRMS_Frontend
    - docker push $CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  script:
    - ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
        docker pull $CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHA &&
        docker pull $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA &&
        docker-compose down &&
        docker-compose up -d"
  only:
    - main
```

## Monitoring & Logging

### 1. Application Monitoring

#### Health Check Endpoints

```javascript
// HRMS_Backend/src/routes/healthRoutes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      checks: {
        database: 'OK',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
        }
      }
    };
    
    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      message: 'Service Unavailable',
      error: error.message
    });
  }
});

module.exports = router;
```

#### Prometheus Metrics

```javascript
// Install: npm install prom-client
const client = require('prom-client');

// Create metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware to collect metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
};

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});
```

### 2. Centralized Logging

#### Winston Configuration

```javascript
// HRMS_Backend/src/config/logger.js
const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { 
    service: 'hrms-backend',
    version: process.env.npm_package_version 
  },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log')
    })
  ]
});

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

### 3. Error Tracking

#### Sentry Integration

```javascript
// Install: npm install @sentry/node
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Error handler middleware
app.use(Sentry.Handlers.errorHandler());
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
psql -h localhost -U hrms_user -d hrms_db

# Reset password
sudo -u postgres psql
ALTER USER hrms_user PASSWORD 'new_password';
```

#### 2. Port Already in Use

```bash
# Find process using port
lsof -i :3000
netstat -tulpn | grep :3000

# Kill process
kill -9 <PID>
```

#### 3. Permission Issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER /var/www/hrms-backend
sudo chmod -R 755 /var/www/hrms-backend

# Fix upload directory
sudo mkdir -p /var/www/hrms-backend/uploads
sudo chown -R www-data:www-data /var/www/hrms-backend/uploads
```

#### 4. SSL Certificate Issues

```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Test SSL configuration
openssl s_client -connect hrms.yourcompany.com:443
```

### Performance Issues

#### 1. Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_leave_requests_user_id ON leave_requests(user_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

#### 2. Application Optimization

```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=20&pool_timeout=20'
    }
  }
});
```

### Backup and Recovery

#### Database Backup

```bash
# Create backup script
cat > /home/ubuntu/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="hrms_prod"
DB_USER="hrms_user"

mkdir -p $BACKUP_DIR

pg_dump -h localhost -U $DB_USER -d $DB_NAME > $BACKUP_DIR/hrms_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "hrms_backup_*.sql" -mtime +7 -delete
EOF

chmod +x /home/ubuntu/backup-db.sh

# Add to crontab for daily backups
echo "0 2 * * * /home/ubuntu/backup-db.sh" | crontab -
```

#### Application Backup

```bash
# Backup application files
tar -czf hrms_app_backup_$(date +%Y%m%d).tar.gz \
  /var/www/hrms-backend \
  /var/www/hrms-frontend \
  /etc/nginx/sites-available/hrms
```

This comprehensive deployment guide covers all aspects of setting up and maintaining the FWC HRMS system in various environments.