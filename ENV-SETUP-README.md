# 🚀 TechMart E-commerce Platform - Environment Setup Guide

## 🎯 **Complete Environment Configuration for Frontend & Backend**

This guide will help you set up all environment variables needed for your **TechMart** e-commerce platform to run perfectly in both frontend and backend modes.

## ✨ **What's Included**

### 🌐 **Server Configuration**
- **Port & Host**: Server settings for development/production
- **Base URLs**: API and frontend endpoints
- **Environment**: Development, staging, production modes

### 🗄️ **Database Configuration**
- **MongoDB**: Connection strings for local and production
- **Database Names**: Separate databases for different environments
- **Authentication**: Database user credentials

### 🔐 **Security & Authentication**
- **JWT Secrets**: Secure token generation and validation
- **Password Hashing**: Bcrypt configuration
- **Session Management**: Secure session handling
- **Cookie Security**: Encrypted cookie storage

### 📧 **Email & Communication**
- **SMTP Settings**: Gmail, Outlook, or custom SMTP
- **Email Templates**: Support and notification emails
- **Marketing**: Email marketing configuration

### 💳 **Payment Integration**
- **Stripe**: Credit card processing
- **PayPal**: Alternative payment method
- **Razorpay**: Indian payment gateway
- **Webhook Security**: Secure payment notifications

### 🚚 **Shipping & Delivery**
- **Shipping APIs**: Integration with delivery partners
- **Cost Configuration**: Shipping rates and thresholds
- **Partner Integration**: Delhivery, BlueDart, ShipRocket

### 📱 **Frontend Configuration**
- **React App Settings**: API URLs and app configuration
- **Analytics**: Google Analytics and Facebook Pixel
- **App Information**: Version, name, environment

### 🔍 **Search & Analytics**
- **Elasticsearch**: Advanced product search
- **Algolia**: Alternative search solution
- **Analytics**: User behavior tracking

### 📊 **Monitoring & Performance**
- **Logging**: Application logs and error tracking
- **Performance**: New Relic, Datadog integration
- **Error Tracking**: Sentry integration

### 🗂️ **File Storage**
- **AWS S3**: Cloud storage for images and files
- **Cloudinary**: Alternative image hosting
- **CDN**: CloudFront for fast content delivery

### 🔔 **Notifications**
- **Firebase**: Push notifications for mobile
- **OneSignal**: Cross-platform notifications
- **Email/SMS**: Marketing communications

### 🌍 **Internationalization**
- **Languages**: English, Hindi, Tamil, Telugu, Kannada, Malayalam
- **Currency**: Indian Rupees (INR)
- **Timezone**: Asia/Kolkata
- **Date Formats**: Indian standard formats

## 🚀 **Quick Setup Instructions**

### **Method 1: Using Setup Scripts (Recommended)**

#### **Windows Batch File:**
```bash
# Double-click or run:
setup-env.bat
```

#### **PowerShell Script:**
```powershell
# Run in PowerShell:
.\setup-env.ps1
```

### **Method 2: Manual Setup**

1. **Copy the configuration:**
   ```bash
   copy config.env .env
   ```

2. **Edit the .env file:**
   ```bash
   notepad .env
   # or use any text editor
   ```

3. **Fill in your actual values**

## 🔧 **Required Variables to Update**

### **🚨 CRITICAL - Must Update:**

```bash
# Database Connection
MONGODB_URI=mongodb://localhost:27017/techmart_db

# Security (Generate strong random strings)
JWT_SECRET=your_super_strong_random_secret_here
JWT_REFRESH_SECRET=another_strong_random_secret_here

# Email Password
SMTP_PASS=your_gmail_app_password

# Payment Gateway Keys
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key
```

### **📧 Email Configuration:**

```bash
# Gmail Setup
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password  # Generate in Gmail settings
```

### **💳 Payment Setup:**

```bash
# Stripe (Get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# PayPal (Get from PayPal Developer)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret

# Razorpay (Get from Razorpay Dashboard)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🌍 **Environment-Specific Configuration**

### **Development Environment:**
```bash
NODE_ENV=development
PORT=3000
DEBUG=true
LOG_LEVEL=debug
```

### **Production Environment:**
```bash
NODE_ENV=production
PORT=80
DEBUG=false
LOG_LEVEL=error
```

### **Staging Environment:**
```bash
NODE_ENV=staging
PORT=3000
DEBUG=true
LOG_LEVEL=info
```

## 📱 **Frontend Usage**

### **React Environment Variables:**
```javascript
// Access in React components
const apiUrl = process.env.REACT_APP_API_URL;
const appName = process.env.REACT_APP_APP_NAME;
const version = process.env.REACT_APP_VERSION;
```

### **Available Frontend Variables:**
- `REACT_APP_API_URL` - Backend API endpoint
- `REACT_APP_APP_NAME` - Application name (TechMart)
- `REACT_APP_VERSION` - App version
- `REACT_APP_ENVIRONMENT` - Current environment
- `REACT_APP_GOOGLE_ANALYTICS_ID` - Google Analytics tracking
- `REACT_APP_FACEBOOK_PIXEL_ID` - Facebook Pixel tracking

## 🔧 **Backend Usage**

### **Node.js Environment Variables:**
```javascript
// Access in server.js
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
```

### **Available Backend Variables:**
- `PORT` - Server port
- `MONGODB_URI` - Database connection string
- `JWT_SECRET` - JWT signing secret
- `SMTP_HOST` - Email server host
- `STRIPE_SECRET_KEY` - Stripe API secret

## 🛡️ **Security Best Practices**

### **1. Never Commit .env Files:**
```bash
# Add to .gitignore
.env
.env.local
.env.production
.env.staging
```

### **2. Use Strong Secrets:**
```bash
# Generate strong JWT secrets
JWT_SECRET=techmart_$(openssl rand -base64 64)
JWT_REFRESH_SECRET=techmart_refresh_$(openssl rand -base64 64)
```

### **3. Rotate Keys Regularly:**
- JWT secrets: Every 6 months
- API keys: Every 3 months
- Database passwords: Every 6 months

### **4. Environment Separation:**
- Use different values for each environment
- Never use production secrets in development
- Use environment-specific databases

## 🔍 **Testing Your Configuration**

### **1. Check Environment Variables:**
```bash
# In PowerShell
Get-Content .env | Select-String "="

# In Command Prompt
type .env | findstr "="
```

### **2. Test Database Connection:**
```bash
# Start your server
npm start

# Check MongoDB connection in logs
```

### **3. Test API Endpoints:**
```bash
# Test health endpoint
curl http://localhost:3000/api/health
```

## 🐛 **Troubleshooting**

### **Common Issues:**

#### **1. Environment Variables Not Loading:**
```bash
# Check if .env file exists
dir .env

# Verify file format (no spaces around =)
NODE_ENV=development  # ✅ Correct
NODE_ENV = development  # ❌ Wrong
```

#### **2. Database Connection Failed:**
```bash
# Check MongoDB is running
netstat -ano | findstr :27017

# Verify connection string format
MONGODB_URI=mongodb://localhost:27017/techmart_db
```

#### **3. JWT Errors:**
```bash
# Ensure JWT_SECRET is set
echo %JWT_SECRET%

# Generate new secret if needed
JWT_SECRET=techmart_new_secret_$(date +%s)
```

## 📊 **Environment Variable Categories**

### **🔴 Critical (Must Set):**
- Database connection
- JWT secrets
- Email credentials
- Payment keys

### **🟡 Important (Should Set):**
- API URLs
- App configuration
- Security settings
- Monitoring keys

### **🟢 Optional (Nice to Have):**
- Analytics IDs
- Social login keys
- Advanced features
- Performance tuning

## 🚀 **Next Steps After Setup**

1. **Start the Backend Server:**
   ```bash
   npm start
   ```

2. **Test All Endpoints:**
   ```bash
   curl http://localhost:3000/api/health
   ```

3. **Open Frontend:**
   ```bash
   http://localhost:3000
   ```

4. **Run Button Tests:**
   ```bash
   file:///C:/Users/Akhila%20Vadithe/OneDrive/Desktop/Ecommerce/test-buttons.html
   ```

## 📞 **Need Help?**

### **Check These Files:**
- `config.env` - Template with all variables
- `setup-env.bat` - Windows setup script
- `setup-env.ps1` - PowerShell setup script
- `ENV-SETUP-README.md` - This file

### **Common Commands:**
```bash
# Check if .env exists
dir .env

# View .env contents
type .env

# Copy config to .env
copy config.env .env

# Edit .env file
notepad .env
```

---

## 🎯 **Final Status**

**✅ Environment Configuration Complete!**

- **Frontend**: All React environment variables configured
- **Backend**: All Node.js environment variables configured
- **Database**: MongoDB connection ready
- **Security**: JWT and authentication configured
- **Payment**: Payment gateway integration ready
- **Email**: SMTP configuration complete
- **Monitoring**: Logging and analytics ready

**🚀 Your TechMart e-commerce platform is now fully configured and ready to run!**

---

**Note**: This configuration ensures your TechMart platform works perfectly in both frontend and backend environments with enterprise-grade security and performance.

