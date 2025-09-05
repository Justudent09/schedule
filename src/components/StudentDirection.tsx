import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTelegramBackButton } from '../utils/telegram'
import './StudentDirection.css'

const StudentDirection = () => {
  const navigate = useNavigate()
  const { saveUserData, userYear } = useAuth()
  const [selectedDirection, setSelectedDirection] = useState('pmi')

  useTelegramBackButton(() => navigate('/'))

  useEffect(() => {
    // Disable certain directions for 2023 year students
    if (userYear === '2023') {
      // This logic is handled in the render method
    }
  }, [userYear])

  const handleDirectionSelect = (direction: string) => {
    setSelectedDirection(direction)
  }

  const handleContinue = async () => {
    const success = await saveUserData('userDirection', selectedDirection)
    if (success) {
      navigate('/schedule')
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

  const directions = [
    { id: 'pmi', name: 'ПМИ' },
    { id: 'mng', name: 'Менеджмент' },
    { id: 'jur', name: 'Юриспруденция' },
    { id: 'phr', name: 'Фармация' },
    { id: 'bio', name: 'Биотехнология' }
  ]

  const isDisabled = (directionId: string) => {
    return userYear === '2023' && (directionId === 'phr' || directionId === 'bio')
  }

  return (
    <main className="student-direction">
      <div className="container">
        <div className="question" style={{ marginBottom: '-4vw' }}>Укажите Ваше</div>
        <div className="question">направление</div>

        {directions.map((direction) => (
          <div 
            key={direction.id}
            className={`option ${selectedDirection === direction.id ? 'selected' : ''} ${isDisabled(direction.id) ? 'disabled' : ''}`}
            onClick={() => !isDisabled(direction.id) && handleDirectionSelect(direction.id)}
          >
            <div className="icon">
              {selectedDirection === direction.id ? <ActiveIcon /> : <InactiveIcon />}
            </div>
            <span>{direction.name}</span>
          </div>
        ))}
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

export default StudentDirection