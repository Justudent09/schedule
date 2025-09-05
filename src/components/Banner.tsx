import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web'
import './Banner.css'

const Banner = () => {
  const navigate = useNavigate()
  const animationRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (animationRef.current) {
      const animation = lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/DuckEmojiStudent.json'
      })

      return () => animation.destroy()
    }
  }, [])

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const containerWidth = scrollContainer.offsetWidth
    const scrollLeft = scrollContainer.scrollLeft
    const index = Math.round(scrollLeft / containerWidth)
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const slides = [
    {
      title: "47Par",
      content: ["Самый простой способ просмотра", "расписания."]
    },
    {
      title: "Быстро и удобно",
      content: ["Смотрите расписание прямо", "в Telegram!"]
    },
    {
      title: "Универсально",
      content: ["Подойдёт как студентам,так и", "преподавателям. Присоединяйтесь!"]
    }
  ]

  return (
    <main className="banner">
      <div className="animation-container" ref={animationRef}></div>

      <div className="horizontal-scroll" ref={scrollRef}>
        <div className="scroll-container">
          {slides.map((slide, index) => (
            <div key={index} className="scroll-item">
              <div className="slide-title">{slide.title}</div>
              {slide.content.map((line, lineIndex) => (
                <div key={lineIndex}>{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`button ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>

      <button className="bannerButton" onClick={() => navigate('/auth')}>
        Начать
      </button>
    </main>
  )
}

export default memo(Banner)