<template>
	<div class="bg-base-300 rounded-lg shadow-md p-6 w-72 mx-auto mt-20">
		<h2 class="text-center text-2xl font-bold mb-6">Login</h2>
		<label class="block mb-2" for="usuario">Email:</label>
		<input v-model="email" class="input input-bordered px-3 py-2 mb-4 w-full" type="text" id="usuario" name="usuario">
		<label class="block mb-2" for="senha">Senha:</label>
		<input v-model="senha" class="input input-bordered px-3 py-2 mb-4 w-full" :type="mostrarSenha ? 'text' : 'password'"
			id="senha" name="senha">
		<input v-model="mostrarSenha" class="mb-4" type="checkbox"> Mostrar senha<br>
		<button @click="postLogin" class="btn btn-primary">Entrar</button>
		<div class="mt-4 text-sm">
			Novo usuário? Clique <span @click="router.push('cadastro')" class="underline cursor-pointer">aqui</span> para se
			registrar.
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth.js';
import { ref } from 'vue'
import http from '../services/http.js';

const emit = defineEmits(['showToast'])
const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)
const router = useRouter()
const auth = useAuth()

const validarFormulario = () => {
	if (!email.value || !senha.value) {
		emit('showToast', {
			type: 'info', message: 'Por favor, preencha todos os campos'
		})
		return false
	}
	return true
}

async function postLogin() {
	if (!validarFormulario()) return;
	let response;
	try {
		response = await http.post('/auth/login',
			JSON.stringify({
				email: email.value,
				senha: senha.value
			})
		);
	} catch (error) {
		if (error.response.status === 401) {
			emit('showToast', {
				type: 'error', message: 'Senha incorreta ou email não encontrado'
			})
			return;
		}
		emit('showToast', {
			type: 'error', message: 'Erro ao realizar login'
		})
		return;
	}
	const data = response.data;
	if (data.token) {
		auth.setToken(data.token);
		auth.setUser(data.user);
		auth.setIsAuth(true);
		router.push('/');
	}
};


</script>

<style>
.body-height {
	height: auto !important;
}
</style>