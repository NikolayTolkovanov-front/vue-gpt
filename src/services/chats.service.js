import axios from 'axios'

class ChatsService {
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

  async getChats(token) {
    try {
      const newUrl = new URL('gpt/chats_list', this.#baseURL)
      newUrl.searchParams.append('token', token)

      const response = await axios.get(newUrl)

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('No chats found')
      }

      if (!response.data.length) {
        return []
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async getChat(chatId) {
    const newUrl = new URL('/chat', this.#baseURL)

    try {
      const response = await axios.post(newUrl, { chat_id: Number(chatId) })

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Чат не получен, нет данных')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async addChat(token, prompt, model) {
    const newUrl = new URL('gpt/add_new_chat', this.#baseURL)

    try {
      const response = await axios.post(newUrl, {
        token,
        prompt,
        model
      })

      if (!response.data || typeof response.data !== 'object' || !response.data.response) {
        throw new Error('Чат не сохранен, нет данных')
      }
      console.log('response.data', response.data)
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async addChatWithFile(token, prompt, model, file) {
    const newUrl = new URL('gpt/add_new_chat', this.#baseURL)

    const form = new FormData()
    form.append('prompt', prompt)
    form.append('model', model)
    form.append('token', token)
    form.append('avatar', file)

    try {
      const response = await axios.post(newUrl, form)

      if (!response.data || typeof response.data !== 'object' || !response.data.response) {
        throw new Error('Чат не сохранен, нет данных')
      }
      console.log('response.data', response.data)
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async sendPrompt(prompt, model, token, chatId) {
    const newUrl = new URL('gpt/send_prompt', this.#baseURL)

    try {
      const response = await axios.post(newUrl, {
        token,
        prompt,
        model,
        chat_id: Number(chatId)
      })

      if (!response.data || typeof response.data !== 'object' || !response.data.response) {
        throw new Error('Чат не сохранен, нет данных')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async sendPromptWithFile(prompt, model, token, chatId, file) {
    const newUrl = new URL('gpt/prompt_with_file', this.#baseURL)

    const form = new FormData()
    form.append('prompt', prompt)
    form.append('model', model)
    form.append('token', token)
    form.append('chat_id', chatId)
    form.append('avatar', file)

    try {
      const response = await axios.post(newUrl, form)

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Чат не сохранен, нет данных')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async regenerateQuestion(questionMessage, model, token, chatId) {
    const newUrl = new URL('gpt/regenerate', this.#baseURL)

    try {
      const response = await axios.post(newUrl, {
        prompt: questionMessage,
        model,
        token,
        chat_id: chatId
      })

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Regenerate не удался, нет данных')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async renameChat(prompt, chatId) {
    const newUrl = new URL('/gpt/chat_rename', this.#baseURL)

    try {
      const response = await axios.post(newUrl, {
        chat_id: Number(chatId),
        new_name: prompt
      })

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Чат не получен, нет данных')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async deleteChat(chatId) {
    try {
      const newURL = new URL(`gpt/delete_chat`, this.#baseURL)
      const response = await axios.post(newURL, {
        chat_id: Number(chatId)
      })

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Chat not removed, no data')
      }
      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async getModels(token) {
    try {
      const newUrl = new URL('gpt/get_user_gpts', this.#baseURL)

      const response = await axios.post(newUrl, {
        token
      })

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('No models found')
      }

      if (!response.data.length) {
        return []
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async getPromptsLimit(token) {
    try {
      const newUrl = new URL(`gpt/get_req_limit?token=${token}`, this.#baseURL)

      const response = await axios.get(newUrl)

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('No limit found')
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }

  async minusPromptLimit(token) {
    try {
      const newUrl = new URL(`gpt/minus_limit?token=${token}`, this.#baseURL)

      const response = await axios.get(newUrl)

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Выполнить запрос не удалось')
      }

      return response.data
    } catch (error) {
      return this.#validateError(error)
    }
  }
}

export default new ChatsService()
