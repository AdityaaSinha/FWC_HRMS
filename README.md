# 🏢 FWC HRMS - Human Resource Management System

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-purple.svg)](https://prisma.io/)
[![Vite](https://img.shields.io/badge/Vite-7.1.11-yellow.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

A comprehensive, modern Human Resource Management System built with React, Node.js, and Prisma. Features AI-powered analytics, role-based access control, and a beautiful, responsive user interface.

## 🌟 Features

### 👥 User Management
- **Multi-role Support**: Admin, HR, Manager, Employee roles with granular permissions
- **Secure Authentication**: JWT-based authentication with 2FA support
- **Profile Management**: Avatar uploads, personal information, department assignments
- **Audit Logging**: Comprehensive activity tracking and security monitoring

### 🤖 AI-Powered Analytics
- **Performance Insights**: AI-driven employee performance analysis
- **Predictive Analytics**: Turnover prediction, budget forecasting, risk assessment
- **Sentiment Analysis**: Employee feedback and satisfaction monitoring
- **Smart Recommendations**: Data-driven HR decision support

### 📊 Core HR Functions
- **Employee Management**: Complete employee lifecycle management
- **Leave Management**: Request, approval, and tracking system
- **Job Posting & Recruitment**: End-to-end hiring workflow
- **Interview Scheduling**: Automated interview coordination
- **Document Management**: Secure file storage and sharing
- **Event Management**: Company events and employee engagement

### 📈 Advanced Features
- **Dynamic Dashboards**: Real-time KPI monitoring and reporting
- **Export Capabilities**: Multi-format data export (JSON, CSV, PDF, Excel)
- **Auto-refresh**: Real-time data updates with configurable intervals
- **Dark Mode**: Modern UI with theme switching
- **Responsive Design**: Mobile-first, cross-device compatibility

## 🏗️ Architecture

```
FWC_HRMS/
├── HRMS_Frontend/          # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route-based page components
│   │   ├── services/      # API service layer
│   │   ├── contexts/      # React context providers
│   │   └── utils/         # Helper functions
├── HRMS_Backend/          # Node.js + Express Backend
│   ├── routes/           # API route definitions
│   ├── controllers/      # Business logic controllers
│   ├── middlewares/      # Authentication & validation
│   ├── prisma/          # Database schema & migrations
│   └── utils/           # Backend utilities
└── docs/                # Documentation files
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- SQLite (included with Prisma)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/FWC_HRMS.git
   cd FWC_HRMS
   ```

2. **Setup Backend**
   ```bash
   cd HRMS_Backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your configuration
   
   # Setup database
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   
   # Start backend server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../HRMS_Frontend
   npm install
   
   # Start frontend development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Default Login Credentials
```
User(Role) : Login ID / Password

Admin: a@a.com / 12
HR: h@h.com / 12
Manager: m@m.com / 12
Employee: e@e.com / 12
```

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library with hooks
- **Vite 7.1.11** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Papa Parse** - CSV parsing

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **Prisma 6.18.0** - Modern database toolkit
- **SQLite** - Lightweight database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Google Generative AI** - AI integration

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **PostCSS** - CSS processing

## 📚 Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Frontend Guide](docs/FRONTEND.md) - Component architecture and routing
- [Backend Guide](docs/BACKEND.md) - Server architecture and database
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions
- [Architecture Diagrams](docs/ARCHITECTURE.md) - System design and data flow

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Two-Factor Authentication** - TOTP, SMS, and backup codes
- **Role-Based Access Control** - Granular permission system
- **Password Hashing** - bcrypt encryption
- **Audit Logging** - Complete activity tracking
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Comprehensive data validation

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Dark/Light Mode** - Theme switching capability
- **Responsive Layout** - Mobile-first design
- **Accessibility** - WCAG compliance
- **Loading States** - Smooth user experience
- **Error Handling** - Graceful error management
- **Real-time Updates** - Live data synchronization

## 🧪 Testing

```bash
# Run frontend tests
cd HRMS_Frontend
npm test

# Run backend tests
cd HRMS_Backend
npm test

# Run integration tests
npm run test:integration
```

## 📦 Build & Deployment

### Production Build
```bash
# Build frontend
cd HRMS_Frontend
npm run build

# Build backend (if applicable)
cd HRMS_Backend
npm run build
```

### Environment Variables
```env
# Backend (.env)
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret"
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000

# Frontend (.env)
VITE_API_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



