import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const userInfo = ref(null)
  const count = ref(0)
  function setUserInfo(newInfo) {
    userInfo.value = newInfo
  }
  // const doubleCount = computed(() => count.value * 2)
  function resertCount() {
    count.value = 0
  }
  function increment() {
    count.value++
  }
  return { count, increment, userInfo, setUserInfo, resertCount }
})
