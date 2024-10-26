import { defineStore } from 'pinia'
import ChatsService from '@/services/chats.service'
import { useAuthStore } from './auth.js'
import { isToday, isYesterday, subDays, subMonths, format } from 'date-fns'

export const useChatsStore = defineStore('chats', {
  state: () => ({
    chats: [],
    currentChatId: '',
    dateCategories: [
      { id: 1, value: 'Сегодня' },
      { id: 2, value: 'Вчера' },
      { id: 3, value: 'Предыдущие 7 дней' },
      { id: 4, value: 'Предыдущие 30 дней' },
      { id: 5, value: 'MMMM' },
      { id: 6, value: 'yyyy' }
    ],
    models: [],
    currentModel: '',
    promptLimit: 0,
    error: ''
  }),
  actions: {
    async getChats() {
      const authStore = useAuthStore()

      return await ChatsService.getChats(authStore.token).then(
        (chats) => {
          // this.chats = chats
          for (let i = 0; i < chats.length; i++) {
            chats[i].editable = false
            chats[i].inputChangeValue = ''
          }
          this.chats = chats
          console.group('getChats')
          console.log('this.chats', this.chats)
          console.groupEnd()
          this.error = ''
          return Promise.resolve()
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    async getChat(chatId: number) {
      const formattedChatId = Number(chatId)

      return await ChatsService.getChat(chatId).then(
        (res) => {
          console.group('getChat')
          console.log('res', res)

          const indexChat = this.chats.findIndex((chat) => chat.id === formattedChatId)

          if (indexChat === -1) {
            throw new Error('Такого чата нет')
          }

          this.chats[indexChat]['questions'] = res.questions
          this.chats[indexChat]['answers'] = res.answers

          console.groupEnd()
          this.error = ''
          return this.chats[indexChat]
        },
        (error) => {
          this.error = error.message
          return error
        }
      )
    },
    async addChat(prompt: string) {
      const authStore = useAuthStore()

      return await ChatsService.addChat(authStore.token, prompt, this.currentModel).then(
        (res) => {
          const newChat = {
            id: res.chat['chat_id'],
            name: prompt.split(' ')[0],
            created_at: format(new Date(), 'yyyy-MM-dd')
          }

          this.chats.push(newChat)

          this.error = ''
          return Promise.resolve(res.chat['chat_id'])
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    // TODO
    async addChatWithFile(prompt: string, file: File) {
      const authStore = useAuthStore()

      return await ChatsService.addChatWithFile(
        authStore.token,
        prompt,
        this.currentModel,
        file
      ).then(
        (res) => {
          console.group('addChatWithFile')
          console.log('res', res)

          // const newChat = {
          //   id: res.chat['chat_id'],
          //   name: prompt.split(' ')[0],
          //   created_at: format(new Date(), 'yyyy-MM-dd')
          // }

          // this.chats.push(newChat)
          console.groupEnd()
          this.error = ''
          return Promise.resolve(res.chat['chat_id'])
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    async deleteChat(chatId: number) {
      return await ChatsService.deleteChat(chatId).then(() => {
        const indexOfChat = this.chats.findIndex((chat) => chat.id === chatId)
        this.chats.splice(indexOfChat, 1)
      })
    },
    async renameChat(chatId: number) {
      console.group('renameChat')
      const indexOfChat = this.chats.findIndex((chat) => chat.id === chatId)
      const inputValue = this.chats[indexOfChat].inputChangeValue
      console.log('this.chats[indexOfChat]', this.chats[indexOfChat])
      console.log('indexOfChat', indexOfChat)
      console.log('inputValue', inputValue)

      if (!inputValue.length) {
        this.toggleChangeChatName(chatId)
        return
      }

      return ChatsService.renameChat(inputValue, chatId).then((res) => {
        console.log('res', res)
        this.chats[indexOfChat].name = inputValue
        this.toggleChangeChatName(chatId)
      })
    },
    async toggleChangeChatName(chatId: number) {
      console.group('toggleChangeChatName')
      console.groupEnd()
      const indexOfChat = this.chats.findIndex((chat) => chat.id === chatId)
      this.chats[indexOfChat].editable = !this.chats[indexOfChat].editable
    },
    changeInputChat(value: string, chatId: number) {
      const indexOfChat = this.chats.findIndex((chat) => chat.id === chatId)
      this.chats[indexOfChat].inputChangeValue = value
    },
    async sendPrompt(prompt: string, chatId: number) {
      const authStore = useAuthStore()
      console.log('prompt', prompt)
      console.log('chatId', chatId)

      return await ChatsService.sendPrompt(
        prompt,
        this.currentModel,
        authStore.token,
        chatId
      ).then(
        (res) => {
          console.group('sendPrompt')
          console.log('res', res)
          const indexOfChat = this.chats.findIndex((chat) => chat.id === Number(chatId))
          console.log('chatId', chatId)
          console.log('indexOfChat', indexOfChat)
          console.log('chats', this.chats)

          const newQuestion = {
            chat_id: Number(chatId),
            id: res.id,
            message: prompt,
            type: 'question'
          }

          const newAnswer = {
            chat_id: Number(chatId),
            id: res.id,
            message: res.response,
            type: 'answer'
          }
          this.chats[indexOfChat].answers.push(newAnswer)
          this.chats[indexOfChat].questions.push(newQuestion)

          console.groupEnd()
          this.error = ''
          return Promise.resolve({ newAnswer, newQuestion })
        }
        // (error) => {
        //   this.error = error.message
        //   return Promise.reject(error.message)
        // }
      )
    },
    async sendPromptWithFile(prompt: string, file: File, chatId: number) {
      const authStore = useAuthStore()

      return await ChatsService.sendPromptWithFile(
        prompt,
        this.currentModel,
        authStore.token,
        chatId,
        file
      ).then(
        (res) => {
          console.group('sendPrompt')
          console.log('res', res)
          const indexOfChat = this.chats.findIndex((chat) => chat.id === Number(chatId))

          const newQuestion = {
            chat_id: Number(chatId),
            id: res.id.id,
            message: prompt,
            type: 'question'
          }

          const newAnswer = {
            chat_id: Number(chatId),
            id: res.id.id,
            message: res.response,
            type: 'answer'
          }
          this.chats[indexOfChat].answers.push(newAnswer)
          this.chats[indexOfChat].questions.push(newQuestion)

          console.groupEnd()
          this.error = ''
          return Promise.resolve({ newAnswer, newQuestion })
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    async regenerateQuestion(questionMessage: string, chatId: number) {
      const authStore = useAuthStore()
      console.group('regenerateQuestion')
      return await ChatsService.regenerateQuestion(
        questionMessage,
        this.currentModel,
        authStore.token,
        chatId
      ).then((res) => console.log('res', res))
    },
    addPropertiesInChats() {
      this.chats = this.chats.map((chat) => {
        chat.editable = false
      })
    },
    async getModels() {
      const authStore = useAuthStore()

      return await ChatsService.getModels(authStore.token).then(
        (models) => {
          this.models = models
          console.group('getModels')
          console.log('this.models', this.models)
          console.groupEnd()
          this.error = ''
          return Promise.resolve()
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    changeModel(modelId: number) {
      console.group('changeModel')
      const indexOfModel = this.models.findIndex((model) => model.id === modelId)
      this.currentModel = this.models[indexOfModel].title
      console.log('currentModel', this.currentModel)
      console.groupEnd()
    },
    async getPromptsLimit() {
      const authStore = useAuthStore()

      return await ChatsService.getPromptsLimit(authStore.token).then(
        (res) => {
          console.group('getPromptsLimit')
          console.log('res', res)
          this.promptLimit = res.limit

          console.groupEnd()
          this.error = ''
          return Promise.resolve()
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    async minusPromptLimit() {
      const authStore = useAuthStore()

      if (this.promptLimit === 0) {
        return
      }

      return await ChatsService.minusPromptLimit(authStore.token).then(
        (res) => {
          console.group('minusPromptLimit')
          console.log('res', res)
          this.promptLimit -= res.limit

          console.groupEnd()
          this.error = ''
          return Promise.resolve()
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    }
  },
  getters: {
    sortedChatsByPeriods(state) {
      let result = []

      const formattedChatsByDate = state.chats.sort(
        (first, second) => new Date(first['created_at']) - new Date(second['created_at'])
      )

      formattedChatsByDate.forEach((chat) => {
        const createdAt = new Date(chat['created_at'])

        if (isToday(createdAt)) {
          if (!result.find((category) => category.dateStr === state.dateCategories[0].value)) {
            result = [
              ...result,
              {
                id: state.dateCategories[0].id,
                dateStr: state.dateCategories[0].value,
                chats: [chat]
              }
            ]
          } else {
            const indexOfTodayCategroy = result.findIndex(
              (category) => category.dateStr === state.dateCategories[0].value
            )
            result[indexOfTodayCategroy].chats.push(chat)
          }
        } else if (isYesterday(createdAt)) {
          if (!result.find((category) => category.dateStr === state.dateCategories[1].value)) {
            result = [
              ...result,
              {
                id: state.dateCategories[1].id,
                dateStr: state.dateCategories[1].value,
                chats: [chat]
              }
            ]
          } else {
            const indexOfYesterdayCategroy = result.findIndex(
              (category) => category['dateStr'] === state.dateCategories[1].value
            )

            result[indexOfYesterdayCategroy].chats.push(chat)
          }
        } else if (createdAt >= subDays(new Date(), 7)) {
          if (!result.find((category) => category.dateStr === state.dateCategories[2].value)) {
            result = [
              ...result,
              {
                id: state.dateCategories[2].id,
                dateStr: state.dateCategories[2].value,
                chats: [chat]
              }
            ]
          } else {
            const indexOfYesterdayCategroy = result.findIndex(
              (category) => category['dateStr'] === state.dateCategories[2].value
            )

            result[indexOfYesterdayCategroy].chats.push(chat)
          }
        } else if (createdAt >= subDays(new Date(), 30)) {
          if (!result.find((category) => category.dateStr === state.dateCategories[3].value)) {
            result = [
              ...result,
              {
                id: state.dateCategories[3].id,
                dateStr: state.dateCategories[3].value,
                chats: [chat]
              }
            ]
          } else {
            const indexOfYesterdayCategroy = result.findIndex(
              (category) => category['dateStr'] === state.dateCategories[3].value
            )

            result[indexOfYesterdayCategroy].chats.push(chat)
          }
        } else if (createdAt >= subMonths(new Date(), 1)) {
          if (
            !result.find(
              (category) =>
                category.dateStr === `${format(createdAt, state.dateCategories[4].value)}`
            )
          ) {
            result = [
              ...result,
              {
                id: state.dateCategories[4].id,
                dateStr: `${format(createdAt, state.dateCategories[4].value)}`,
                chats: [chat]
              }
            ]
          } else {
            const indexOfYesterdayCategroy = result.findIndex(
              (category) =>
                category['dateStr'] === `${format(createdAt, state.dateCategories[4].value)}`
            )

            result[indexOfYesterdayCategroy].chats.push(chat)
          }
        } else {
          if (
            !result.find(
              (category) =>
                category.dateStr === `${format(createdAt, state.dateCategories[5].value)}`
            )
          ) {
            result = [
              ...result,
              {
                id: state.dateCategories[5].id,
                dateStr: `${format(createdAt, state.dateCategories[5].value)}`,
                chats: [chat]
              }
            ]
          } else {
            const indexOfYesterdayCategroy = result.findIndex(
              (category) =>
                category['dateStr'] === `${format(createdAt, state.dateCategories[5].value)}`
            )

            result[indexOfYesterdayCategroy].chats.push(chat)
          }
        }
      })

      return result.sort((first, second) => first.id - second.id)
    },
    getImgPathByModel(state) {
      return (modelName) => {
        const modelIndex = state.models.findIndex((model) => model.title === modelName)
        return state.models[modelIndex]?.photo_url
      }
    }
  }
})
