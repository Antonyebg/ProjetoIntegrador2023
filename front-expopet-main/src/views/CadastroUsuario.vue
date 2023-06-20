<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/services/http.js';

const router = useRouter()

const emit = defineEmits(['showToast'])
const nome = ref('')
const email = ref('')
const telefone = ref('')
const senha = ref('')
const confirmarSenha = ref('')

function validarFormulario() {
  if (senha.value !== confirmarSenha.value) {
    emit('showToast', {
      type: 'info', message: 'As senhas não coincidem'
    })
    return false
  }
  if (!nome.value || !email.value || !telefone.value || !senha.value || !confirmarSenha.value) {
    emit('showToast', {
      type: 'info', message: 'Por favor, preencha todos os campos'
    })
    return false
  }
  return true
}

const postCadastro = async () => {
  if (!validarFormulario()) return
  const response = await http.post('http://localhost:3000/users',
  JSON.stringify({
      nome: nome.value,
      email: email.value,
      telefone: telefone.value,
      senha: senha.value
    })
  )
  if (response.status === 201) {
    emit('showToast', {
      type: 'success', message: 'Cadastro realizado com sucesso!'
    })
    router.push('/login')
  } else {
    emit('showToast', {
      type: 'error', message: 'Erro ao cadastrar usuário'
    })
  }
}

</script>

<template>
  <h1 class="text-center text-2xl font-bold mb-6">Cadastro de Usuário</h1>
  <form class="bg-base-300 rounded-lg shadow-md max-w-md mx-auto p-6">
    <label class="block font-bold mb-2" for="nome">Nome:</label>
    <input v-model="nome" class="input input-bordered px-3 py-2 mb-4 w-full" type="text" id="nome" name="nome" required>

    <label class="block font-bold mb-2" for="email">E-mail:</label>
    <input v-model="email" class="input input-bordered px-3 py-2 mb-4 w-full" type="email" id="email" name="email" required>

    <label class="block font-bold mb-2" for="telefone">Telefone:</label>
    <input v-model="telefone" class="input input-bordered px-3 py-2 mb-4 w-full" type="tel" id="telefone" name="telefone" required>

    <label class="block font-bold mb-2" for="senha">Senha:</label>
    <input v-model="senha" class="input input-bordered px-3 py-2 mb-4 w-full" type="password" id="senha" name="senha" required>

    <label class="block font-bold mb-2" for="confirmar-senha">Confirmar Senha:</label>
    <input v-model="confirmarSenha" class="input input-bordered px-3 py-2 mb-4 w-full" type="password" id="confirmar-senha" name="confirmar-senha" required>

    <div @click="postCadastro" class="btn btn-primary mt-2">Cadastrar</div>
    <div class="flex items-center mt-8">
      <div @click="router.push('/login')" class="cursor-pointer">
        <v-icon name="md-arrowback" class="mr-4"></v-icon>
        <span>Voltar para login</span>
      </div>
    </div>
  </form>
</template>