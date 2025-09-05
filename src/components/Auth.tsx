import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web'
import { useAuth } from '../hooks/useAuth'
import './Auth.css'

const Auth = () => {
  const navigate = useNavigate()
  const { saveUserData } = useAuth()
  const animationRef = useRef<HTMLDivElement>(null)
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student')

  useEffect(() => {
    if (animationRef.current) {
      const animation = lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/DuckEmojiWay.json'
      })

      return () => animation.destroy()
    }
  }, [])

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setSelectedRole(role)
  }

  const handleContinue = async () => {
    const success = await saveUserData('userRole', selectedRole)
    if (success) {
      if (selectedRole === 'student') {
        navigate('/')
      } else {
        navigate('/teacher')
      }
    }
  }

  const InactiveIcon = () => (
    <svg width="6vw" height="6vw" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3vw" cy="3vw" r="2.7vw" fill="none" stroke="var(--tg-theme-hint-color)" strokeWidth="0.6vw"/>
    </svg>
  )

  const ActiveIcon = () => (
    <svg width="6vw" height="6vw" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3vw" cy="3vw" r="2.7vw" fill="none" stroke="var(--tg-theme-accent-text-color)" strokeWidth="0.6vw"/>
      <circle cx="3vw" cy="3vw" r="1.5vw" fill="var(--tg-theme-accent-text-color)"/>
    </svg>
  )

  return (
    <main className="auth">
      <div className="container">
        <div className="animation-container" ref={animationRef}></div>

        <div className="question">Кто Вы?</div>

        <div 
          className={`option ${selectedRole === 'student' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('student')}
        >
          <div className="icon">
            {selectedRole === 'student' ? <ActiveIcon /> : <InactiveIcon />}
          </div>
          <span>Студент</span>
        </div>

        <div 
          className={`option ${selectedRole === 'teacher' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('teacher')}
        >
          <div className="icon">
            {selectedRole === 'teacher' ? <ActiveIcon /> : <InactiveIcon />}
          </div>
          <span>Преподаватель</span>
        </div>
      </div>

      <button className="button" onClick={handleContinue}>
        <svg className="feather feather-arrow-right" fill="none" height="100%" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="100%">
          <line x1="5" x2="19" y1="12" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </main>
  )
}

export default Auth