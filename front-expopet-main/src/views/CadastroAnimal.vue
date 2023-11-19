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
const image = ref(null)
const temDono = ref(false)
const emit = defineEmits(['showToast'])
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 10MB in bytes

const handleFileChange = (event) => {
	const selectedFile = event.target.files[0];

	if (selectedFile) {
		if (selectedFile.size > MAX_FILE_SIZE) {
			emit('showToast', {
				type: 'error',
				message: 'O arquivo é muito grande. (max 5MB).',
			});

			event.target.value = null;
			image.value = null;
		} else {
			image.value = selectedFile;
		}
	}
};


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
	if (
		!nome.value ||
		!corDosOlhos.value ||
		!cor.value ||
		!porte.value ||
		!sexo.value ||
		!bairro.value ||
		!image.value ||
		(temDono.value === undefined && temDono.value === null)
	) {
		emit('showToast', {
			type: 'info',
			message: 'Por favor, preencha todos os campos',
		});
		return false;
	}
	return true;
};


const postAnimal = async () => {
	if (!validarFormulario()) return;

	const formData = new FormData();
	formData.append('nome', nome.value);
	formData.append('cordosolhos', corDosOlhos.value);
	formData.append('cor', cor.value);
	formData.append('porte', porte.value);
	formData.append('sexo', sexo.value);
	formData.append('bairro', bairro.value);
	formData.append('imagem', image.value, image.value.name);
	formData.append('tem_dono', temDono.value); // Add this line

	try {
		const response = await http.post(
			'http://localhost:3000/animals',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		if (response.status === 200) {
			emit('showToast', {
				type: 'success',
				message: 'Cadastro realizado com sucesso!',
			});
			router.push('/');
		} else {
			showToast.value = true;
		}
	} catch (error) {
		showToast.value = true;
	}
};


</script>
<template>
	<h1 class="text-2xl flex justify-center mb-8">Cadastro de Animal</h1>
	<form enctype="multipart/form-data" class="bg-base-300 rounded-lg shadow-md max-w-md mx-auto p-6">
		<label class="label">
			<span class="label-text">Nome</span>
		</label>
		<input maxlength="50" v-model="nome" type="textl" placeholder="Nome" class="input input-bordered w-full" />
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
		<input type="file" name="imagem" class="file-input file-input-sm w-full max-w-xs mb-4" @change="handleFileChange" />
		<label class="flex my-6">
			<span class="label-text mr-6">Animal aparenta ter dono?</span>
			<input type="checkbox" v-model="temDono" class="checkbox" />
		</label>
		<div @click="postAnimal" class="btn btn-primary">Cadastrar</div>
		<div @click="router.push('/')" class="flex items-center mt-8 cursor-pointer">
			<v-icon name="md-arrowback" class="mr-4"></v-icon>
			<div>Voltar para tela inicial</div>
		</div>
	</form>
</template>