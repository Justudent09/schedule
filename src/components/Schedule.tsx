import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web'
import { useTelegramBackButton } from '../utils/telegram'
import './Schedule.css'

const Schedule = () => {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const moodAnimationRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  useTelegramBackButton(() => {}, false)

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.SettingsButton.show()
      window.Telegram.WebApp.SettingsButton.onClick(() => navigate('/settings'))
    }
  }, [navigate])

  useEffect(() => {
    if (moodAnimationRef.current) {
      const animation = lottie.loadAnimation({
        container: moodAnimationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/DuckEmojiSkeleton.json'
      })

      return () => animation.destroy()
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const containerWidth = scrollContainer.offsetWidth
      const scrollLeft = scrollContainer.scrollLeft
      const index = Math.round(scrollLeft / containerWidth)
      setCurrentSlide(index)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const newsData = [
    {
      title: "Зачётная неделя: лайфхаки от отличников.",
      color: 'color-mix(in srgb, var(--accent-text-color) 50%, var(--destructive-text-color) 50%)',
      animation: '/assets/DuckEmojiPodcast.json'
    },
    {
      title: "Киберспорт в вузе: CS2 соберёт лучших игроков.",
      color: 'var(--accent-text-color)',
      animation: '/assets/DuckEmojiGaming.json'
    },
    {
      title: "47Par: глобальное обновление вышло!",
      color: 'var(--destructive-text-color)',
      animation: '/assets/DuckEmojiUpdate.json'
    }
  ]

  const formatDate = (date: Date) => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

    const dayOfWeek = days[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = months[date.getMonth()]

    return `${dayOfWeek}, ${dayOfMonth} ${month}`
  }

  const toggleSchedule = (forceExpand?: boolean) => {
    if (forceExpand !== undefined) {
      setIsExpanded(forceExpand)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  const handleArrowClick = () => {
    toggleSchedule()
  }

  const handleNewsClick = (index: number) => {
    setFullscreenIndex(index)
  }

  const closeFullscreen = () => {
    setFullscreenIndex(null)
  }

  return (
    <main className="schedule-page">
      <div className={`horizontal-scroll ${isExpanded ? 'expanded' : ''}`} ref={scrollRef}>
        <div className="news">НОВОСТИ</div>
        <div className="pagination">
          {newsData.map((_, index) => (
            <div
              key={index}
              className={`button ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="scroll-container">
          {newsData.map((news, index) => (
            <div 
              key={index} 
              className="scroll-item"
              style={{ backgroundColor: news.color }}
              onClick={() => handleNewsClick(index)}
            >
              <div className="text">{news.title}</div>
              <div className="animation-container" id={`animation-container-${index + 1}`}></div>
            </div>
          ))}
        </div>
      </div>

      <div className={`schedule ${isExpanded ? 'expanded' : ''}`}>
        <div className="schedule-top">
          <div className="arrow-wrapper" ref={arrowRef} onClick={handleArrowClick}>
            <div className="arrow-rect arrow-part-1"></div>
            <div className="arrow-rect arrow-part-2"></div>
          </div>

          <div className="schedule-header">
            <div>
              <div className="schedule-text">Расписание</div>
              <div className="date">{formatDate(new Date())}</div>
            </div>
            <div className="animation-mood" ref={moodAnimationRef}></div>
          </div>
        </div>

        <div className="schedule-list" id="schedule-list">
          {/* Schedule items will be rendered here */}
          <div className="schedule-item">
            <div className="time">09:00</div>
            <div className="subject">Математический анализ</div>
            <div className="room">Ауд. 101</div>
          </div>
          <div className="schedule-item">
            <div className="time">10:30</div>
            <div className="subject">Программирование</div>
            <div className="room">Ауд. 205</div>
          </div>
        </div>
      </div>

      {fullscreenIndex !== null && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fade">
            <div className="fullscreen-content">
              <div className="fullscreen-animation" id="fullscreen-animation"></div>
              <div className="fullscreen-text" id="fullscreen-text">
                {/* Full news content will be rendered here */}
                <h2>{newsData[fullscreenIndex].title}</h2>
                <p>Подробная информация о новости...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Schedule