import axios from 'axios'

class AuthService {
  #baseURL
  constructor() {
    this.#baseURL = new URL('https://angpt.ru:8000/')
  }

  #validateError(error) {
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

  async register(user) {
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

  async login(user) {
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

  async addChat(name, text, date) {
    try {
      const response = await axios.post(this.#baseURL, {
        name,
        text,
        date
      })

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Chat not saved, no data')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async removeChat(chatId) {
    try {
      const newURL = new URL(`chats/${chatId}`, this.#baseURL)
      const response = await axios.delete(newURL)

      if (!response.data || typeof response.data !== 'string') {
        throw new Error('Chat not removed, no data')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }
}

export default new AuthService()
