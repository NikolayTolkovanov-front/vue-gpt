import { defineStore } from 'pinia'
import AuthService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    error: null
  }),
  actions: {
    async register(user) {
      return await AuthService.register(user).then(
        (res) => {
          console.log('res', res)
          this.error = null
          // this.isRegister = true
          return Promise.resolve()
        },
        (error) => {
          this.token = ''
          this.error = error.message
          // this.isRegister = false
          return Promise.reject(error.message)
        }
      )
    },
    async login(user) {
      return await AuthService.login(user).then(
        (res) => {
          localStorage.setItem('token', res.token)
          this.error = null

          return Promise.resolve()
        },
        (error) => {
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
          }
          this.error = error.message

          return Promise.reject()
        }
      )
    },
    async logout() {
      localStorage.removeItem('token')
    }
  },
  getters: {
    errorMessage() {
      return this.error
    },
    getToken() {
      return localStorage.getItem('token') || ''
    }
  }
})
