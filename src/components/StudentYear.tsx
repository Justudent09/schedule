import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTelegramBackButton } from '../utils/telegram'
import './StudentYear.css'

const StudentYear = () => {
  const navigate = useNavigate()
  const { saveUserData } = useAuth()
  const [selectedYear, setSelectedYear] = useState(1)

  useTelegramBackButton(() => navigate('/auth'))

  const handleYearSelect = (year: number) => {
    if (year <= 3) {
      setSelectedYear(year)
    }
  }

  const handleContinue = async () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const calculatedYear = currentMonth <= 6 ? currentYear - selectedYear : currentYear - selectedYear + 1

    const success = await saveUserData('userYear', calculatedYear.toString())
    if (success) {
      navigate('/direction')
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

  const years = [1, 2, 3, 4, 5, 6]

  return (
    <main className="student-year">
      <div className="container">
        <div className="question" style={{ marginBottom: '-4vw' }}>Укажите Ваш</div>
        <div className="question">курс</div>

        {years.map((year) => (
          <div 
            key={year}
            className={`option ${selectedYear === year ? 'selected' : ''} ${year > 3 ? 'disabled' : ''}`}
            onClick={() => handleYearSelect(year)}
          >
            <div className="icon">
              {selectedYear === year ? <ActiveIcon /> : <InactiveIcon />}
            </div>
            <span>{year}-й курс</span>
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

export default StudentYear