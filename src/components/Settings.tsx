import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web'
import { useAuth } from '../hooks/useAuth'
import { useTelegramBackButton } from '../utils/telegram'
import './Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const { userRole, userYear, userDirection, clearUserData } = useAuth()
  const animationRef = useRef<HTMLDivElement>(null)
  const [displayData, setDisplayData] = useState({
    role: '',
    year: '',
    direction: ''
  })

  useTelegramBackButton(() => navigate('/'))

  useEffect(() => {
    if (animationRef.current) {
      const animation = lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/DuckEmojiProfile.json'
      })

      return () => animation.destroy()
    }
  }, [])

  useEffect(() => {
    if (userRole && userYear && userDirection) {
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1

      const course = currentMonth <= 6 ? currentYear - parseInt(userYear) : currentYear - parseInt(userYear) + 1

      const roleText = userRole === 'student' ? 'Студент' : 'Препод'
      
      const yearText = (() => {
        switch (course) {
          case 1:
          case 4:
          case 5:
            return course + '-ый'
          case 2:
          case 6:
            return course + '-ой'
          case 3:
            return course + '-ий'
          default:
            return course + '-й'
        }
      })()

      const directionText = (() => {
        switch (userDirection) {
          case 'pmi':
            return 'ПМИ'
          case 'mng':
            return 'Мен.'
          case 'jur':
            return 'Юр.'
          case 'phr':
            return 'Фарм.'
          case 'bio':
            return 'Био.'
          default:
            return userDirection
        }
      })()

      setDisplayData({
        role: roleText,
        year: yearText,
        direction: directionText
      })
    }
  }, [userRole, userYear, userDirection])

  const handleLogout = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showConfirm("Вы точно хотите выйти?", (confirmed) => {
        if (confirmed) {
          clearUserData().then(() => {
            navigate('/')
          })
        }
      })
    }
  }

  return (
    <main className="settings">
      <div className="animation-container" ref={animationRef}></div>
      
      <div className="block profile-header">
        Профиль
      </div>
      
      <div className="block">
        <i className="fa-regular fa-user"></i> Статус 
        <div className="info">{displayData.role}</div>
      </div>
      
      <div className="line"></div>
      
      <div className="block">
        <i className="fa-regular fa-calendar"></i> Курс 
        <div className="info">{displayData.year}</div>
      </div>
      
      <div className="line"></div>
      
      <div className="block">
        <i className="fa-regular fa-clone"></i> Направление 
        <div className="info">{displayData.direction}</div>
      </div>
      
      <button className="button" onClick={handleLogout}>
        Выйти
      </button>
      
      <div className="block info-text">
        Нажмите "Выйти" и зарегистрируйтесь заново, чтобы поменять ваш статус, направление или курс
      </div>
    </main>
  )
}

export default Settings