import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const userName = ref({})
  const count = ref(0)
  function setUserName(newInfo) {
    userName.value = newInfo
  }
  // const doubleCount = computed(() => count.value * 2)
  function resertCount() {
    count.value = 0
  }
  function increment() {
    count.value++
  }
  return { count, increment, userName, setUserName, resertCount }
})
