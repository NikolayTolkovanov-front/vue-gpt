import axios from 'axios'
import { AxiosError } from 'axios'
import type { User } from '@/interfaces/services/auth.interface'

class AuthService {
  #baseURL
  constructor() {
    this.#baseURL = new URL('https://angpt.ru:8000/')
  }

  #validateError(error: AxiosError) {
    if (error.response) {
      console.error('Error response:', error.response.data)
      throw new Error(
        error.response.data.message || error.response.statusText || error.response.data.detail
      )
    } else if (error.request) {
      console.error('Error request:', error.request)
      throw new Error('Network error: No response received')
    } else {
      console.error('Error message:', error.message)
      throw new Error(error.message)
    }
  }

  async register(user: User) {
    try {
      const newUrl = new URL('auth/register', this.#baseURL)
      const response = await axios.post(newUrl, {
        email: user.email,
        password: user.password
      })

      if (!response.data || response.data.status !== 'OK') {
        throw new Error('Не удалось зарегистрироваться, попробуйте позже')
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async login(user: User) {
    try {
      const newUrl = new URL('auth/authorize', this.#baseURL)
      const response = await axios.post(newUrl, {
        email: user.email,
        password: user.password
      })

      if (!response.data || !response.data.token) {
        throw new Error('Не удалось авторизоваться, попробуйте позже')
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async logout() {
    try {
      const newUrl = new URL('auth/logout', this.#baseURL)
      const response = await axios.get(newUrl)

      if (!response.data) {
        throw new Error('Не удалось выйти, попробуйте позже')
      }

      // if (!response.data.id) {
      //   return []
      // }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async getGals() {
    try {
      const newUrl = new URL('admink/get_gals', this.#baseURL)
      const response = await axios.get(newUrl)

      if (!response.data) {
        throw new Error('Попробуйте позже')
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }
}

export default new AuthService()
