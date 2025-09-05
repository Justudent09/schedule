export interface UserData {
  userRole: 'student' | 'teacher' | null
  userYear: string | null
  userDirection: string | null
}

export interface TelegramWebApp {
  expand: () => void
  lockOrientation: () => void
  SettingsButton: {
    hide: () => void
    show: () => void
    onClick: (callback: () => void) => void
  }
  BackButton: {
    hide: () => void
    show: () => void
    onClick: (callback: () => void) => void
  }
  CloudStorage: {
    setItem: (key: string, value: string, callback: (error: string | null, success: boolean) => void) => void
    getItem: (key: string, callback: (error: string | null, value: string) => void) => void
    removeItem: (key: string, callback: (error: string | null, success: boolean) => void) => void
  }
  showAlert: (message: string) => void
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}