import { useEffect } from 'react'

export const initializeTelegram = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.lockOrientation()
    window.Telegram.WebApp.SettingsButton.hide()
  }
}

export const useTelegramBackButton = (onBack: () => void, show: boolean = true) => {
  useEffect(() => {
    if (!window.Telegram?.WebApp) return

    if (show) {
      window.Telegram.WebApp.BackButton.show()
      window.Telegram.WebApp.BackButton.onClick(onBack)
    } else {
      window.Telegram.WebApp.BackButton.hide()
    }

    return () => {
      window.Telegram?.WebApp?.BackButton.hide()
    }
  }, [onBack, show])
}