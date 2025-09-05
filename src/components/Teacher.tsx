import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web'
import { useTelegramBackButton } from '../utils/telegram'
import './Teacher.css'

const Teacher = () => {
  const navigate = useNavigate()
  const animationRef = useRef<HTMLDivElement>(null)

  useTelegramBackButton(() => navigate('/auth'))

  useEffect(() => {
    if (animationRef.current) {
      const animation = lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/DuckEmojiDeadend.json'
      })

      return () => animation.destroy()
    }
  }, [])

  return (
    <main className="teacher">
      <div className="animation-container" ref={animationRef}></div>
      <div className="question">На данный момент</div>
      <div className="question">расписание</div>
      <div className="question">для преподавателей</div>
      <div className="question">недоступно‼️</div>
    </main>
  )
}

export default Teacher