# TechMart E-commerce Website Setup Guide

## 🚀 Quick Start

### Option 1: One-Click Start (Windows)
1. Double-click `start.bat` to automatically:
   - Install dependencies
   - Seed the database
   - Start the server
   - Open the website

### Option 2: Manual Setup

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud)

## 🛠️ Installation

1. **Clone/Download the project**
   ```bash
   cd /path/to/your/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file with:
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/techmart
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start MongoDB**
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 🌐 Access the Website

- **Frontend**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **Admin Panel**: Login with admin@techmart.com / admin123

## 📁 Project Structure

```
techmart-ecommerce/
├── index.html          # Main frontend page
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Backend server
├── seed.js             # Database seeding
├── package.json        # Dependencies
├── .env               # Environment variables
├── uploads/           # Image uploads
└── assets/            # Static assets
```

## 🔧 Features

### Frontend
- ✅ Modern responsive design
- ✅ Hero slider with animations
- ✅ Product catalog with filters
- ✅ Shopping cart functionality
- ✅ User authentication (login/register)
- ✅ Wishlist management
- ✅ Real-time search
- ✅ Mobile-friendly navigation
- ✅ Brand showcase section
- ✅ Newsletter subscription
- ✅ Deal cards with countdown timers

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ User management
- ✅ Product CRUD operations
- ✅ Order management
- ✅ File upload support
- ✅ Admin panel
- ✅ Search and filtering
- ✅ Pagination support

## 👥 Sample Users

### Admin Account
- **Email**: admin@techmart.com
- **Password**: admin123
- **Role**: Admin (full access)

### Regular Users
- **Email**: john@example.com
- **Password**: password123
- **Email**: jane@example.com
- **Password**: password123

## 📱 Sample Products

The database includes 8 premium electronics products:
- Samsung Galaxy S24 Ultra
- Apple iPhone 15 Pro Max
- MacBook Pro 16-inch M3 Max
- Dell XPS 15 9530
- Sony WH-1000XM5 Headphones
- Samsung 65-inch QLED 4K TV
- Canon EOS R6 Mark II
- Apple iPad Pro 12.9-inch

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get by category
- `GET /api/products/search/:query` - Search products
- `GET /api/products/featured` - Get featured products

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Admin (Protected)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design
- **Responsive**: Works on all devices
- **Animations**: Smooth transitions and effects
- **Gradients**: Beautiful color schemes
- **Typography**: Inter font family
- **Icons**: Font Awesome icons
- **Images**: High-quality Unsplash images

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- File upload restrictions
- Environment variable protection

## 🚀 Performance Optimizations

- Image optimization with Unsplash
- Lazy loading for products
- Debounced search
- Efficient database queries
- Static file serving
- CDN for external resources

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

### Database Seeding
```bash
npm run seed
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

## 📞 Support

If you encounter any issues:

1. Check MongoDB is running
2. Verify all dependencies are installed
3. Check the console for error messages
4. Ensure port 3000 is available
5. Verify the `.env` file exists

## 🎯 Next Steps

To enhance the website further:

1. **Payment Integration**: Add Stripe/PayPal
2. **Email Notifications**: Send order confirmations
3. **Inventory Management**: Track stock levels
4. **Analytics**: Add Google Analytics
5. **SEO Optimization**: Meta tags and sitemap
6. **PWA Features**: Offline support
7. **Multi-language**: Internationalization
8. **Advanced Search**: Elasticsearch integration

---

**TechMart E-commerce** - A professional full-stack e-commerce solution for electronics! 🚀 