import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const showToast = ref(false)
  const type = ref('success')
  const message = ref('')

  const toggleShow = (toast) => {
    type.value = toast.type
    message.value = toast.message
    showToast.value = !showToast.value
  }

  return { showToast, type, message, toggleShow }
})
