import { defineStore } from 'pinia'
import AuthService from '@/services/auth.service'
import authService from '@/services/auth.service'

import type { User, RegisterUser } from '@/interfaces/services/auth'
import type { Gal } from '@/interfaces/stores/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    error: null,
    gals: [] as Array<Gal>
  }),
  actions: {
    async register(user: RegisterUser) {
      return await AuthService.register(user).then(
        () => {
          this.error = ''
          return Promise.resolve()
        },
        (error) => {
          this.error = error.message
          return Promise.reject(error.message)
        }
      )
    },
    async login(user: User) {
      return await AuthService.login(user).then(
        (res) => {
          localStorage.setItem('token', res.token)
          this.token = res.token
          this.error = ''

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
      this.token = ''
    },
    async getGals() {
      return await authService.getGals(this.token).then(
        (gals) => {
          this.gals = gals
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
    formattedTitle() {
      return (title: string, keyword: string, link: string) => {
        const arrayTitle = title.split(' ')
        const indexOfKeyword = arrayTitle.findIndex((word) => word === keyword)
        arrayTitle[indexOfKeyword] =
          `<a class="gal-link" href="${link}" target="__blank">` + keyword + '</a>'
        return arrayTitle.join(' ')
      }
    }
  }
})
