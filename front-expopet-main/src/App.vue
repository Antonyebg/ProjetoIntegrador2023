<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed, ref, defineAsyncComponent } from 'vue'
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
  <div class="wrapper">
    <div class="navbar bg-base-300">
      <div class="flex-1">
        <div @click="router.push('/')" class="text-accent ml-4 btn btn-ghost">
          <v-icon name="md-pets" scale="1.1" class="my-auto"></v-icon>
          <a class="normal-case text-xl">ExpoPet</a>
        </div>
        <div @click="router.push('cadastro-animal')" class="btn btn-ghost normal-case text-lg font-medium text-white">Cadastrar Animal</div>
      </div>
      <div class="text-sm mr-4">
        <span @click="router.push('admin')" v-if="auth.user?.admin" class="btn btn-ghost mr-3 invisible md:visible text-white cursor-pointer">Painel do administrador</span>
        <a @click="logout" class="btn btn-ghost normal-case text-red-200">Sair</a>
      </div>
    </div>
    <RouterView class="body-height" @showToast="toast_store.toggleShow" />
    <Transition enter-active-class="duration-300 ease-out" enter-from-class="transform opacity-0 -translate-y-4"
      enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <Toast v-if="toast_store.showToast" @close="toast_store.showToast = false" />
    </Transition>
  </div>
</template>

<style>
.wrapper {
  height: 100vh;
  min-height: 100vh;
}

.body-height {
  height: calc(100vh - 4rem);
}
</style>
