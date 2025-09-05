import { memo } from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = memo(() => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Загрузка...</div>
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner