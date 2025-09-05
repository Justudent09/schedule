import { useState, useEffect } from 'react'
import { UserData } from '../types'

export const useAuth = () => {
  const [userData, setUserData] = useState<UserData>({
    userRole: null,
    userYear: null,
    userDirection: null
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = () => {
      if (!window.Telegram?.WebApp) {
        setIsLoading(false)
        return
      }

      const keys = ['userRole', 'userYear', 'userDirection']
      let checkedKeys = 0
      const newUserData: UserData = {
        userRole: null,
        userYear: null,
        userDirection: null
      }

      keys.forEach((key) => {
        window.Telegram!.WebApp.CloudStorage.getItem(key, (error, value) => {
          checkedKeys++
          if (!error && value) {
            if (key === 'userRole') {
              newUserData.userRole = value as 'student' | 'teacher'
            } else if (key === 'userYear') {
              newUserData.userYear = value
            } else if (key === 'userDirection') {
              newUserData.userDirection = value
            }
          }

          if (checkedKeys === keys.length) {
            setUserData(newUserData)
            setIsLoading(false)
          }
        })
      })
    }

    checkAuthStatus()
  }, [])

  const saveUserData = (key: keyof UserData, value: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!window.Telegram?.WebApp) {
        resolve(false)
        return
      }

      window.Telegram.WebApp.CloudStorage.setItem(key, value, (error) => {
        if (error) {
          window.Telegram?.WebApp.showAlert('Ошибка сохранения: ' + error)
          resolve(false)
        } else {
          setUserData(prev => ({ ...prev, [key]: value }))
          resolve(true)
        }
      })
    })
  }

  const clearUserData = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!window.Telegram?.WebApp) {
        resolve(false)
        return
      }

      const keys = ['userRole', 'userYear', 'userDirection']
      let completedKeys = 0

      keys.forEach((key) => {
        window.Telegram!.WebApp.CloudStorage.setItem(key, '', () => {
          completedKeys++
          if (completedKeys === keys.length) {
            setUserData({
              userRole: null,
              userYear: null,
              userDirection: null
            })
            resolve(true)
          }
        })
      })
    })
  }

  return {
    ...userData,
    isLoading,
    saveUserData,
    clearUserData
  }
}