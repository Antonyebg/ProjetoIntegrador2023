<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, defineAsyncComponent } from 'vue'
import { useToastStore } from './stores/toast'
import { useAuth } from './stores/auth';
const router = useRouter()
const Toast = defineAsyncComponent(() => import('./components/Toast.vue'))
const toast_store = useToastStore()
const auth = useAuth()

let theme = 'dark';

const toggleTheme = () => {
  theme = theme === 'dark' ? 'light' : 'dark'
  const doc = document.querySelector('[data-theme]')
  doc.setAttribute('data-theme', theme)
}

const logout = () => {
  auth.clear()
  router.push('/login')
}

</script>

<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <div @click="router.push('/')" class="ml-4 btn btn-ghost">
          <v-icon name="md-pets" class="mt-1"></v-icon>
          <a class="normal-case text-xl">ExpoPet</a>
        </div>
        <div @click="router.push('cadastro-animal')" class="btn btn-ghost normal-case">Cadastrar Animal</div>
      </div>
      <div class="flex-none text-sm mr-4">
        <label class="swap swap-rotate mr-4">
          <input @click="toggleTheme" type="checkbox" />
          <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <span v-if="auth.user" class="mr-3">Logado como: {{ auth.user.nome }}</span>
        <a @click="logout" class="btn btn-ghost normal-case">Sair</a>
      </div>
  </div>
  <RouterView @showToast="toast_store.toggleShow" />
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0 -translate-y-4"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <Toast v-if="toast_store.showToast" @close="toast_store.showToast = false" message="Eita como funciona" />
  </Transition>
</div>
</template>
