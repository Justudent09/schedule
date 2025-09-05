import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { useAuth } from './hooks/useAuth'
import { initializeTelegram } from './utils/telegram'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load components for better performance
const Banner = lazy(() => import('./components/Banner'))
const Auth = lazy(() => import('./components/Auth'))
const StudentYear = lazy(() => import('./components/StudentYear'))
const StudentDirection = lazy(() => import('./components/StudentDirection'))
const Schedule = lazy(() => import('./components/Schedule'))
const Settings = lazy(() => import('./components/Settings'))
const Teacher = lazy(() => import('./components/Teacher'))

function App() {
  const { userRole, userYear, userDirection, isLoading } = useAuth()

  useEffect(() => {
    initializeTelegram()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  // If user is not authenticated, show banner
  if (!userRole) {
    return (
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Banner />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Suspense>
      </Router>
    )
  }

  // If user is student but missing year or direction
  if (userRole === 'student' && (!userYear || !userDirection)) {
    return (
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<StudentYear />} />
            <Route path="/direction" element={<StudentDirection />} />
          </Routes>
        </Suspense>
      </Router>
    )
  }

  // If user is teacher or fully authenticated student
  return (
    <Router>
      <Suspense fallback={<div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '4vw',
        color: 'var(--text-color)'
      }}>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/teacher" element={<Teacher />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App