<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import http from '@/services/http.js';

const router = useRouter()
const nome = ref('')
const corDosOlhos = ref('')
const cor = ref('')
const porte = ref('')
const sexo = ref('')
const bairro = ref('')
const emit = defineEmits(['showToast'])

const bairroOptions = [
	{ label: 'Selecione', value: '' },
	{ label: 'Jardim Europa/América', value: 'Jardim Europa/América' },
	{ label: 'Jardim Independência', value: 'Jardim Independência' },
	{ label: 'Jardim Concórdia', value: 'Jardim Concórdia' },
	{ label: 'Jardim Porto Alegre', value: 'Jardim Porto Alegre' },
	{ label: 'Jardim Gisela', value: 'Jardim Gisela' },
	{ label: 'Vila Industrial', value: 'Vila Industrial' },
	{ label: 'Tocantins', value: 'Tocantins' },
	{ label: 'Jardim Coopagro', value: 'Jardim Coopagro' },
	{ label: 'Jardim Santa Maria', value: 'Jardim Santa Maria' },
	{ label: 'Vila Becker', value: 'Vila Becker' },
	{ label: 'Jardim La Salle', value: 'Jardim La Salle' },
	{ label: 'Jardim Pancera', value: 'Jardim Pancera' },
	{ label: 'Cerâmica Prata', value: 'Cerâmica Prata' },
	{ label: 'Jardim Parizotto', value: 'Jardim Parizotto' },
	{ label: 'Jardim Bressan', value: 'Jardim Bressan' },
	{ label: 'Sadia', value: 'Sadia' },
	{ label: 'São Francisco', value: 'São Francisco' },
	{ label: 'Vila Panorama', value: 'Vila Panorama' },
	{ label: 'Vila Pioneiro', value: 'Vila Pioneiro' },
	{ label: 'Pinheirinho', value: 'Pinheirinho' },
	{ label: 'Vila Operária', value: 'Vila Operária' },
	{ label: 'Centro', value: 'Centro' }
]

const validarFormulario = () => {
	if (!nome.value || !corDosOlhos.value || !cor.value || !porte.value || !sexo.value || !bairro.value) {
		emit('showToast', {
			type: 'info', message: 'Por favor, preencha todos os campos'
		})
		return false
	}
	return true
}

const postAnimal = async () => {
	if (!validarFormulario()) return
	const response = await http.post('http://localhost:3000/animals',
		JSON.stringify({
			nome: nome.value,
			cordosolhos: corDosOlhos.value,
			cor: cor.value,
			porte: porte.value,
			sexo: sexo.value,
			bairro: bairro.value
		})
	)
	if (response.status === 200) {
		emit('showToast', {
			type: 'success', message: 'Cadastro realizado com sucesso!'
		})
		router.push('/')
	} else {
		showToast.value = true
	}
}

</script>
<template>
	<h1 class="text-2xl flex justify-center mb-8">Cadastro de Animal</h1>
	<form class="bg-base-300 rounded-lg shadow-md max-w-md mx-auto p-6">
		<label class="label">
			<span class="label-text">Nome</span>
		</label>
		<input v-model="nome" type="textl" placeholder="Nome" class="input input-bordered w-full" />
		<label class="label">
			<span class="label-text">Cor dos olhos</span>
		</label>
		<select v-model="corDosOlhos" class="select select-bordered w-full" id="olhos" name="olhos" required>
			<option class="text-bold" value="">Selecione</option>
			<option value="castanho">Castanho</option>
			<option value="azul">Azul</option>
			<option value="verde">Verde</option>
			<option value="naoidentificado">Não identificado</option>
		</select>
		<label class="label">
			<span class="label-text">Cor predominante</span>
		</label>
		<select v-model="cor" class="select select-bordered w-full" id="pelo" name="pelo" required>
			<option value="">Selecione</option>
			<option value="marrom">Marrom</option>
			<option value="branco">Branco</option>
			<option value="preto">Preto</option>
			<option value="dourado">Dourado</option>
			<option value="preto">Preto</option>
		</select>
		<label class="label">
			<span class="label-text">Porte</span>
		</label>
		<select v-model="porte" class="select select-bordered w-full" id="porte" name="porte" required>
			<option value="">Selecione</option>
			<option value="pequeno">Pequeno</option>
			<option value="medio">Médio</option>
			<option value="grande">Grande</option>
		</select>
		<label class="label">
			<span class="label-text">Sexo</span>
		</label>
		<select v-model="sexo" class="select select-bordered w-full" id="sexo" name="sexo" required>
			<option value="">Selecione</option>
			<option value="macho">Macho</option>
			<option value="femea">Fêmea</option>
		</select>
		<label class="label">
			<span class="label-text">Bairro</span>
		</label>
		<select v-model="bairro" class="select select-bordered w-full" id="bairro" name="bairro" required>
			<option v-for="option in bairroOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
		</select>
		<label class="label">
			<span class="label-text">Imagem do animal</span>
		</label>
		<input type="file" class="file-input file-input-sm w-full max-w-xs mb-4" />
		<div @click="postAnimal" class="btn btn-primary">Cadastrar</div>
		<div @click="router.push('/')" class="flex items-center mt-8 cursor-pointer">
			<v-icon name="md-arrowback" class="mr-4"></v-icon>
			<div>Voltar para tela inicial</div>
		</div>
	</form>
</template>