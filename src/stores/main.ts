import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    asideHidden: false
  }),
  actions: {
    toggleAside() {
      this.asideHidden = !this.asideHidden
    }
  },
  getters: {}
})
