# JECRC University IT Support Portal

A comprehensive IT support ticket management system built for JECRC University's IT department. This modern web application provides a streamlined interface for students, staff, and administrators to manage IT support requests efficiently.

## 🎯 Project Overview

The JECRC IT Support Portal is designed to modernize and digitize the university's IT support process. It provides role-based access for different user types and includes features like ticket management, real-time notifications, file uploads, and comprehensive reporting.

### ✨ Key Features

- **Role-Based Access Control**: Student, Resolver, and Admin roles with specific permissions
- **Ticket Management**: Create, track, and resolve IT support tickets
- **Real-Time Notifications**: Instant updates on ticket status changes
- **File Upload System**: Attach screenshots, documents, and logs to tickets
- **Advanced Search & Filtering**: Find tickets quickly with powerful search capabilities
- **Activity Logging**: Comprehensive audit trail for all system activities
- **FAQ & Chat Support**: AI-powered chatbot for instant help
- **Interactive Tutorial**: Step-by-step system guidance
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Mode**: User preference-based theming

## 🏗️ Technical Architecture

### Frontend Stack
```
React 18          - Modern JavaScript library for building user interfaces
TypeScript        - Type-safe JavaScript for better development experience
Vite             - Fast build tool and development server
Tailwind CSS     - Utility-first CSS framework for styling
Shadcn/ui        - High-quality React components built on Radix UI
React Router     - Client-side routing for single-page applications
React Query      - Data fetching and caching library
React Hook Form  - Performant forms with easy validation
Lucide React     - Beautiful & consistent icon set
```

### Backend Integration (Ready for Implementation)
```
Supabase         - Backend-as-a-Service platform
PostgreSQL       - Relational database for data storage
Row Level Security - Database-level authorization
Real-time API    - WebSocket connections for live updates
Storage API      - File upload and management
Edge Functions   - Serverless functions for custom logic
```

### Development Tools
```
ESLint           - Code linting and quality checks
Prettier         - Code formatting
Git              - Version control
GitHub Actions   - CI/CD pipeline (configurable)
Docker           - Containerization for deployment
```

## 📋 User Roles & Permissions

### 👨‍🎓 Student Role
- ✅ Create new support tickets
- ✅ View and track own tickets
- ✅ Add comments to own tickets
- ✅ Upload attachments
- ✅ Update profile information
- ✅ Access FAQ and chat support
- ❌ Cannot view other users' tickets
- ❌ Cannot access admin functions

### 🔧 Resolver Role (IT Staff)
- ✅ View all open tickets
- ✅ Update ticket status
- ✅ Add resolution comments
- ✅ Assign tickets to themselves
- ✅ Access user information for support
- ✅ View system metrics
- ❌ Cannot access admin-only functions

### 👨‍💼 Admin Role
- ✅ Full system access
- ✅ User management (create, edit, delete users)
- ✅ System configuration
- ✅ View all tickets and users
- ✅ Access system logs and analytics
- ✅ Generate reports
- ✅ Manage system settings

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git for version control

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd jecrc-it-support-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create environment file
   cp .env.example .env.local
   
   # Add your configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:8080`

### Demo Accounts
For testing purposes, use these demo accounts:

**Student Account:**
- Email: `student@jecrcu.edu.in`
- Password: `password123`

**Resolver Account:**
- Email: `resolver@jecrcu.edu.in`
- Password: `password123`

**Admin Account:**
- Email: `admin@jecrcu.edu.in`
- Password: `password123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Header.tsx      # Main navigation header
│   ├── AppSidebar.tsx  # Sidebar navigation
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── CreateTicket.tsx # Ticket creation form
│   ├── AdminPortal.tsx # Admin management panel
│   ├── FAQChat.tsx     # FAQ and chat support
│   ├── Tutorial.tsx    # Interactive tutorial
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useTickets.ts   # Ticket management logic
│   ├── useUsers.ts     # User management logic
│   └── ...
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication state
├── types/              # TypeScript type definitions
│   └── index.ts        # Core type definitions
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
└── ...
```

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: JECRC brand colors (Red #DC2626, Gold #F59E0B)
- **Typography**: Poppins and Lato font families
- **Component Library**: Shadcn/ui with custom variants
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

### Key Design Tokens
```css
/* Primary Colors */
--jecrc-red: #DC2626
--jecrc-gold: #F59E0B

/* Semantic Colors */
--primary: HSL values for main brand
--secondary: HSL values for secondary elements
--accent: HSL values for highlights
--muted: HSL values for subtle elements

/* Status Colors */
--success: Green for success states
--warning: Orange for warning states
--error: Red for error states
--info: Blue for informational states
```

## 🔧 Configuration Guide

### Environment Variables
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Application Settings
VITE_APP_NAME=JECRC IT Support Portal
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_CHAT=true
VITE_ENABLE_NOTIFICATIONS=true
```

### Build Configuration
```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Session management
- Password strength requirements

### Data Protection
- Input validation and sanitization
- XSS protection
- CSRF protection
- File upload security scanning
- SQL injection prevention

### Privacy & Compliance
- GDPR compliance features
- Data encryption at rest and in transit
- Audit logging
- User consent management

## 📊 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: Automatic image compression and resizing
- **Caching**: Intelligent data caching with React Query
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Lighthouse Score**: 95+ performance rating

## 🧪 Testing Strategy

### Test Types
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API and database integration testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load and stress testing
- **Security Tests**: Vulnerability and penetration testing

### Testing Tools
```bash
# Unit Testing
Jest + React Testing Library

# E2E Testing
Playwright or Cypress

# Performance Testing
Lighthouse CI

# Security Testing
npm audit + OWASP ZAP
```

## 🚢 Deployment Guide

### Docker Deployment
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Cloud Deployment Options
1. **Vercel** (Recommended for frontend)
2. **Netlify** (Alternative frontend hosting)
3. **AWS S3 + CloudFront** (Enterprise solution)
4. **Digital Ocean App Platform**
5. **Google Cloud Platform**

### CI/CD Pipeline
```yaml
# GitHub Actions example
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
      - name: Deploy to production
        run: npm run deploy
```

## 📈 Monitoring & Analytics

### Application Monitoring
- Error tracking with Sentry
- Performance monitoring
- User behavior analytics
- Uptime monitoring
- Log aggregation

### Metrics Dashboard
- User engagement metrics
- Ticket resolution times
- System performance indicators
- Error rates and types
- Feature usage statistics

## 🔄 Database Schema

### Core Tables
```sql
-- Users table
users (
  id, email, name, role, department, 
  created_at, updated_at, last_login
)

-- Tickets table
tickets (
  id, title, description, category, priority, 
  status, created_by, assigned_to, created_at, 
  updated_at, resolved_at
)

-- Comments table
ticket_comments (
  id, ticket_id, user_id, content, 
  created_at, is_internal
)

-- Attachments table
ticket_attachments (
  id, ticket_id, filename, file_path, 
  file_size, mime_type, uploaded_at
)

-- Activity logs table
activity_logs (
  id, user_id, action, entity_type, 
  entity_id, metadata, created_at
)
```

## 🛠️ Customization Guide

### Adding New Features
1. Create component in appropriate directory
2. Add route configuration
3. Update navigation menus
4. Add necessary permissions
5. Update documentation

### Theming Customization
1. Modify `tailwind.config.ts` for colors
2. Update `index.css` for global styles
3. Customize component variants
4. Test in light/dark modes

### Role Management
1. Define new role in types
2. Update AuthContext
3. Add route protections
4. Update UI conditionals

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify environment variables

**Authentication Issues:**
- Verify Supabase configuration
- Check CORS settings
- Validate JWT tokens

**Performance Issues:**
- Enable React DevTools Profiler
- Check bundle size analysis
- Optimize images and assets

**Database Connectivity:**
- Verify network connectivity
- Check Supabase dashboard
- Review RLS policies

## 📚 Learning Resources

### Official Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### Video Tutorials
- React fundamentals
- TypeScript for React
- Tailwind CSS masterclass
- Supabase integration guide

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

### Code Standards
- Follow ESLint rules
- Use TypeScript strictly
- Write descriptive commit messages
- Add tests for new features
- Update documentation

## 📞 Support & Contact

### For JECRC IT Department
- **Technical Lead**: [Contact Information]
- **System Administrator**: [Contact Information]
- **Development Team**: [Contact Information]

### External Support
- **Framework Issues**: React GitHub Issues
- **UI Components**: Shadcn/ui Documentation
- **Backend Issues**: Supabase Support
- **Deployment**: Platform-specific support

## 📄 License

This project is developed specifically for JECRC University. All rights reserved.

### Usage Rights
- ✅ Internal use within JECRC University
- ✅ Modification for institutional needs
- ✅ Educational and training purposes
- ❌ Commercial redistribution
- ❌ External licensing without permission

---

## 🎓 For Reverse Engineering Teams

This codebase is structured for easy understanding and modification. Key areas to focus on:

1. **Authentication Flow**: `src/contexts/AuthContext.tsx`
2. **Routing Logic**: `src/App.tsx`
3. **API Integration**: `src/hooks/` directory
4. **UI Components**: `src/components/` directory
5. **Type Definitions**: `src/types/index.ts`
6. **Styling System**: `tailwind.config.ts` and `src/index.css`

The project follows modern React patterns and best practices, making it easy to extend and maintain. All components are well-documented with TypeScript for better code understanding.

**Happy Coding! 🚀**