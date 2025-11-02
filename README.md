# NutriMatch - Personalized Nutrition Guidance App

A web application that provides personalized nutrition guidance based on symptoms and health goals. Built with React, Firebase Authentication, and Edamam Nutrition API.

## Features

- Personalized Nutrition Guidance - Input symptoms or health goals to receive tailored food and recipe recommendations
- Firebase Authentication - User authentication with email/password and social login (Google & GitHub)
- Live API Integration - Real-time nutrition data from Edamam Recipe API
- Health Dashboard - Track your progress with a dashboard
- Contact Form - Easy way to get in touch
- Mobile Responsive - Works on all devices

## Tech Stack

- Frontend: React 18
- Routing: React Router v6
- Styling: Tailwind CSS
- Authentication: Firebase Auth
- API: Edamam Recipe Search API
- Icons: Lucide React
- Build Tool: Create React App

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- A Firebase account
- Internet connection

## Getting Started

### 1. Clone or Navigate to the Project

```bash
cd /home/wise/NUTRIMATCH
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google provider
   - Enable GitHub provider (optional)
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon
   - Copy the configuration object

5. Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. API Configuration

The app uses the Edamam Recipe Search API with demo credentials included. For production use:

1. Sign up at [Edamam](https://developer.edamam.com/)
2. Get your APP_ID and APP_KEY
3. Update the credentials in `src/components/Dashboard.js`:

```javascript
const APP_ID = 'YOUR_APP_ID';
const APP_KEY = 'YOUR_APP_KEY';
```

### 5. Start the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Application Routes

- `/` - Home page
- `/login` - User login page
- `/signup` - User registration page
- `/dashboard` - Dashboard for personalized recommendations
- `/contact` - Contact form page

## Key Components

1. Navbar - Navigation with authentication menu
2. Home - Landing page
3. Login - Authentication page
4. Signup - User registration
5. Dashboard - Main application interface
6. Contact - Contact form
7. ProtectedRoute - Route guard for authenticated pages

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🧪 Testing

```bash
npm test
```

## 🌐 Deployment

The app can be deployed to various platforms:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository
- **Firebase Hosting**: Use Firebase CLI
- **GitHub Pages**: Configure in repository settings

## 📝 Project Structure

```
nutrimatch/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── Contact.js
│   │   └── ProtectedRoute.js
│   ├── App.js
│   ├── firebase.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Support

For issues or questions, create an issue in the repository.

## Resources

- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Edamam API Documentation](https://developer.edamam.com/edamam-docs-recipe-api)
````