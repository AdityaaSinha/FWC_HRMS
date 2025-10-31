# AI Features in HRMS System

## Overview
This HRMS (Human Resource Management System) integrates advanced AI capabilities powered by Google's Gemini AI models to enhance HR operations, provide intelligent insights, and automate various HR processes.

## Table of Contents
1. [AI Job Description Generator](#ai-job-description-generator)
2. [AI Resume Screener](#ai-resume-screener)
3. [AI Performance Insights](#ai-performance-insights)
4. [AI Predictive Analytics](#ai-predictive-analytics)
5. [AI Sentiment Analysis](#ai-sentiment-analysis)
6. [AI System Monitoring](#ai-system-monitoring)
7. [Technical Architecture](#technical-architecture)
8. [Database Models](#database-models)
9. [API Endpoints](#api-endpoints)
10. [Frontend Components](#frontend-components)

---

## AI Job Description Generator

### Location
- **Backend**: `/HRMS_Backend/routes/aiRoutes.js` (Line 15-50)
- **Frontend Widget**: `/HRMS_Frontend/src/widgets/AIGeneratorWidget.jsx`
- **Pages**: 
  - `/HRMS_Frontend/src/pages/hr/AITools/AIJobDescriptionPage.jsx`
  - `/HRMS_Frontend/src/pages/hr/HRDashboardHome.jsx` (Dashboard widget)

### Usage
1. Navigate to HR Dashboard or AI Tools section
2. Enter job title (e.g., "React Developer")
3. Specify department (e.g., "Engineering")
4. Add relevant keywords (e.g., "React, TypeScript, SQL")
5. Click "Generate" to create AI-powered job description

### Working Principle
- Uses **Gemini-2.0-flash** model for fast generation
- Constructs detailed prompt with job requirements
- Generates comprehensive job descriptions including responsibilities, requirements, and qualifications
- Cleans and formats output for professional presentation

### Technical Details
- **AI Model**: Google Gemini-2.0-flash
- **Input**: Job title, department, keywords array
- **Output**: Formatted job description text
- **Error Handling**: Validates inputs, handles API failures
- **Response Time**: ~2-5 seconds

---

## AI Resume Screener

### Location
- **Backend**: `/HRMS_Backend/routes/aiRoutes.js` (Line 52-120)
- **Frontend Widget**: `/HRMS_Frontend/src/widgets/AIResumeScreenerWidget.jsx`
- **Pages**: 
  - `/HRMS_Frontend/src/pages/hr/AITools/AIResumeScreeningPage.jsx`
  - `/HRMS_Frontend/src/pages/hr/HRDashboardHome.jsx` (Dashboard widget)

### Usage
1. Select existing job posting or paste job description manually
2. Upload resume PDF file (drag & drop or click to upload)
3. Click "Screen Resume" to analyze compatibility
4. Review match score, key strengths, and potential gaps

### Working Principle
- Extracts text from PDF using `pdf-parse` library
- Uses **Gemini-2.5-pro** model for detailed analysis
- Compares resume content against job requirements
- Provides structured scoring and feedback

### Technical Details
- **AI Model**: Google Gemini-2.5-pro
- **Input**: PDF file + job description text
- **Output**: JSON with matchScore, summary, keyStrengths, potentialGaps
- **File Handling**: Multer middleware for PDF uploads
- **Validation**: PDF-only file type restriction

---

## AI Performance Insights

### Location
- **Backend**: `/HRMS_Backend/routes/aiRoutes.js` (Line 122-200)
- **Frontend Service**: `/HRMS_Frontend/src/services/aiService.js`
- **Pages**: `/HRMS_Frontend/src/pages/manager/ManagerPerformanceAnalytics.jsx`
- **Database**: `PerformanceInsight` model in Prisma schema

### Usage
1. Navigate to Manager Performance Analytics
2. System automatically fetches AI insights for employees
3. View performance forecasts, recommendations, and risk factors
4. Export insights in various formats (JSON, CSV, TXT)

### Working Principle
- Retrieves employee data from database
- Constructs comprehensive performance analysis prompt
- Uses **Gemini-2.5-pro** for detailed performance evaluation
- Caches results for 24 hours to optimize performance
- Stores insights in database for historical tracking

### Technical Details
- **AI Model**: Google Gemini-2.5-pro
- **Caching**: 24-hour cache to prevent redundant API calls
- **Database Storage**: `PerformanceInsight` table with detailed metrics
- **Metrics**: Performance score, productivity, collaboration, forecasts
- **Confidence Scoring**: AI provides confidence levels for predictions

---

## AI Predictive Analytics

### Location
- **Backend**: `/HRMS_Backend/routes/aiRoutes.js` (Line 202-270)
- **Frontend Service**: `/HRMS_Frontend/src/services/aiService.js`
- **Pages**: `/HRMS_Frontend/src/pages/manager/ManagerPredictiveAnalytics.jsx`

### Usage
1. Access Manager Predictive Analytics dashboard
2. Select department and timeframe for analysis
3. Choose specific metrics to analyze
4. Generate AI insights for workforce predictions
5. View turnover risk, performance trends, and budget forecasts

### Working Principle
- Generates mock team data based on department and timeframe
- Creates detailed predictive analysis prompt
- Uses **Gemini-2.5-pro** for comprehensive predictions
- Provides actionable insights and recommendations

### Technical Details
- **AI Model**: Google Gemini-2.5-pro
- **Input Parameters**: Department, timeframe, metrics array
- **Predictions**: Performance trends, turnover risk, budget forecasts
- **Mock Data**: Generates realistic team scenarios for analysis
- **Export Options**: JSON, CSV, plain text formats

---

## AI Sentiment Analysis

### Location
- **Backend**: `/HRMS_Backend/routes/aiRoutes.js` (Line 272-350)
- **Frontend Service**: `/HRMS_Frontend/src/services/aiService.js`
- **Database Models**: `EmployeeFeedback`, `SentimentAnalysis`, `SentimentTrend`

### Usage
1. Submit employee feedback through the system
2. AI automatically analyzes sentiment and emotional tone
3. View sentiment trends by department and timeframe
4. Monitor real-time sentiment changes
5. Export detailed sentiment analysis reports

### Working Principle
- Analyzes feedback text for emotional content
- Uses **Gemini-2.5-pro** for detailed sentiment evaluation
- Provides overall sentiment, emotional breakdown, and key themes
- Tracks trends over time for departments
- Generates actionable insights and recommendations

### Technical Details
- **AI Model**: Google Gemini-2.5-pro (analysis), Gemini-2.0-flash (monitoring)
- **Database Storage**: Separate tables for feedback and analysis
- **Trend Analysis**: 24-hour cached department trends
- **Real-time Monitoring**: Batch processing for quick sentiment checks
- **Metrics**: Sentiment score, emotional tone, urgency levels

---

## AI System Monitoring

### Location
- **Backend**: `/HRMS_Backend/routes/aiRoutes.js` (Line 500-550)
- **Frontend Service**: `/HRMS_Frontend/src/services/aiService.js`

### Usage
1. Access system status endpoints for AI health monitoring
2. Check AI service uptime and response times
3. Monitor analytics processing queue
4. View AI model accuracy and resource usage

### Working Principle
- Provides real-time status of AI services
- Monitors system health and performance metrics
- Tracks processing queues and success rates
- Reports on active AI models and their status

### Technical Details
- **Endpoints**: `/system-status`, `/analytics-status`
- **Metrics**: Uptime, response times, accuracy, resource usage
- **Queue Monitoring**: Processing status and success rates
- **Model Tracking**: Active AI models and their performance

---

## Technical Architecture

### AI Configuration
- **File**: `/HRMS_Backend/config/ai.js`
- **Provider**: Google Generative AI (Gemini)
- **API Key**: Environment variable `GEMINI_API_KEY`
- **Models Used**:
  - `gemini-2.0-flash-exp`: Fast generation (job descriptions, monitoring)
  - `gemini-2.5-pro`: Detailed analysis (resume screening, performance, sentiment)

### Environment Setup
```bash
# Required environment variable
GEMINI_API_KEY=your_gemini_api_key_here
```

### Dependencies
```json
{
  "@google/generative-ai": "^0.21.0",
  "pdf-parse": "^1.1.1",
  "multer": "^1.4.5-lts.1"
}
```

---

## Database Models

### PerformanceInsight
```prisma
model PerformanceInsight {
  id                    String   @id @default(cuid())
  employeeId           String
  performanceScore     Float?
  productivityRating   Float?
  qualityRating        Float?
  collaborationRating  Float?
  performanceForecast  String?
  riskFactors          String[]
  recommendations      String[]
  strengths            String[]
  improvementAreas     String[]
  analysisDate         DateTime @default(now())
  analysisType         String?
  confidence           Float?
  dataSource           String?
  nextQuarterForecast  String?
  careerProgression    String?
  employee             User     @relation(fields: [employeeId], references: [id])
}
```

### SentimentAnalysis
```prisma
model SentimentAnalysis {
  id                String   @id @default(cuid())
  employeeId        String
  feedbackId        String
  overallSentiment  String
  sentimentScore    Float
  emotionalTone     String[]
  keyThemes         String[]
  urgencyLevel      String?
  actionableInsights String[]
  analysisDate      DateTime @default(now())
  confidence        Float?
  employee          User     @relation(fields: [employeeId], references: [id])
  feedback          EmployeeFeedback @relation(fields: [feedbackId], references: [id])
}
```

### SentimentTrend
```prisma
model SentimentTrend {
  id                    String   @id @default(cuid())
  department           String
  timeframe            String
  overallTrend         String
  averageSentiment     Float
  sentimentDistribution Json
  riskFactors          String[]
  recommendations      String[]
  alertLevel           String?
  analysisDate         DateTime @default(now())
  dataPoints           Int?
}
```

---

## API Endpoints

### Job Description Generation
- **POST** `/api/ai/generate-jd`
- **Body**: `{ title, department, keywords[] }`
- **Response**: `{ jobDescription }`

### Resume Screening
- **POST** `/api/ai/screen-resume-pdf`
- **Body**: FormData with `resume` file and `jobDescription`
- **Response**: `{ matchScore, summary, keyStrengths[], potentialGaps[] }`

### Performance Insights
- **GET** `/api/ai/performance-insights/:employeeId`
- **Response**: `{ aiInsights, employeeData, generatedAt }`

### Predictive Analytics
- **POST** `/api/ai/predictive-analytics`
- **Body**: `{ department, timeframe, metrics[] }`
- **Response**: `{ predictions, insights, confidence }`

### Sentiment Analysis
- **POST** `/api/ai/sentiment-analysis`
- **Body**: `{ employeeId, feedbackText }`
- **Response**: `{ analysis, insights, confidence }`

### Sentiment Trends
- **GET** `/api/ai/sentiment-trends/:department?timeframe=`
- **Response**: `{ trends, analysis, recommendations }`

### Export Endpoints
- **POST** `/api/ai/sentiment-analysis/export`
- **POST** `/api/ai/performance-insights/export`
- **POST** `/api/ai/predictive-analytics/export`

### System Status
- **GET** `/api/ai/system-status`
- **GET** `/api/ai/analytics-status`

---

## Frontend Components

### AI Widgets
1. **AIGeneratorWidget.jsx**
   - Job description generation interface
   - Real-time input validation
   - Loading states with custom spinner
   - Error handling and user feedback

2. **AIResumeScreenerWidget.jsx**
   - File upload with drag & drop
   - Job selection from existing postings
   - Results display with color-coded scoring
   - Strengths and gaps visualization

3. **AILoadingSpinner.jsx**
   - Consistent loading indicator for AI operations
   - Customizable size and styling

### Service Layer
- **aiService.js**: Centralized API communication
- **Error Handling**: Comprehensive error management
- **File Downloads**: Automatic file generation and download
- **Authentication**: Token-based API authentication

### Integration Points
- **HR Dashboard**: Widget integration for quick access
- **Manager Analytics**: Deep integration with performance data
- **Routing**: Dedicated AI tools pages and manager dashboards

---

## Usage Examples

### Generating Job Description
```javascript
const jobData = {
  title: "Senior React Developer",
  department: "Engineering",
  keywords: ["React", "TypeScript", "Node.js", "AWS"]
};

const result = await aiService.generateJobDescription(jobData);
console.log(result.jobDescription);
```

### Screening Resume
```javascript
const formData = new FormData();
formData.append('resume', pdfFile);
formData.append('jobDescription', jobDescriptionText);

const result = await aiService.screenResume(formData);
console.log(`Match Score: ${result.matchScore}%`);
```

### Getting Performance Insights
```javascript
const insights = await aiService.getPerformanceInsights('employee123');
console.log(insights.aiInsights.recommendations);
```

---

## Performance Considerations

1. **Caching**: 24-hour cache for performance insights and sentiment trends
2. **Rate Limiting**: Built-in API rate limiting for Gemini calls
3. **Error Handling**: Graceful degradation when AI services are unavailable
4. **File Processing**: Efficient PDF parsing with memory management
5. **Database Optimization**: Indexed queries for performance data retrieval

---

## Security Features

1. **API Key Protection**: Environment variable storage
2. **File Validation**: PDF-only uploads with size limits
3. **Authentication**: Token-based API access
4. **Data Privacy**: Secure handling of employee performance data
5. **Input Sanitization**: Validation of all user inputs

---

## Future Enhancements

1. **Multi-language Support**: Extend AI capabilities to multiple languages
2. **Advanced Analytics**: More sophisticated predictive models
3. **Real-time Notifications**: AI-powered alerts and recommendations
4. **Integration APIs**: Connect with external HR tools and platforms
5. **Custom AI Models**: Fine-tuned models for specific HR use cases