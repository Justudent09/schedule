# 47Par - Telegram Schedule App

A modern React + Vite application for viewing university schedules in Telegram Web App.

## Features

- 🎯 **Unified Authorization System** - Single file managing all authentication flows
- 📱 **Telegram Web App Integration** - Native Telegram experience
- 🎨 **Modern UI/UX** - Optimized for mobile with smooth animations
- ⚡ **Performance Optimized** - Lazy loading, code splitting, and memoization
- 🎭 **Lottie Animations** - Beautiful animated illustrations
- 📊 **Schedule Management** - View schedules for students and teachers
- 🔧 **Settings & Profile** - Manage user preferences and data

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Lottie Web** for animations
- **CSS Modules** for styling
- **Telegram Web App API** for native integration

## Project Structure

```
src/
├── components/          # React components
│   ├── Banner.tsx      # Welcome screen
│   ├── Auth.tsx        # Role selection
│   ├── StudentYear.tsx # Course selection
│   ├── StudentDirection.tsx # Direction selection
│   ├── Schedule.tsx    # Main schedule view
│   ├── Settings.tsx    # User settings
│   ├── Teacher.tsx     # Teacher view
│   └── LoadingSpinner.tsx # Loading component
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication logic
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types
├── utils/              # Utility functions
│   └── telegram.ts     # Telegram Web App helpers
└── styles/             # Global styles
    └── index.css       # Main CSS file
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Optimizations

1. **Lazy Loading** - Components are loaded on demand
2. **Code Splitting** - Vendor libraries are separated into chunks
3. **Memoization** - Components are memoized to prevent unnecessary re-renders
4. **TypeScript** - Full type safety throughout the application
5. **Modern CSS** - Uses CSS custom properties for theming
6. **Performance** - Optimized bundle size and loading times

## Authorization Flow

The app uses a unified authorization system that handles:

1. **Role Selection** - Student or Teacher
2. **Student Registration** - Year and Direction selection
3. **Data Persistence** - Uses Telegram Cloud Storage
4. **Navigation** - Automatic routing based on user state

## Telegram Integration

- Full Telegram Web App API support
- Cloud Storage for data persistence
- Native UI components and theming
- Back button and settings integration
- Alert and confirmation dialogs

## Assets

Animation files should be placed in the `public/assets/` directory:
- `DuckEmojiWay.json`
- `DuckEmojiStudent.json`
- `DuckEmojiSkeleton.json`
- `DuckEmojiProfile.json`
- `DuckEmojiDeadend.json`
- `DuckEmojiPodcast.json`
- `DuckEmojiGaming.json`
- `DuckEmojiUpdate.json`

## License

This project is part of the 47Par university schedule system.