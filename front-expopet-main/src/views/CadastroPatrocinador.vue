<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import http from '@/services/http.js';
import { useAuth } from '@/stores/auth';
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const auth = useAuth()

const router = useRouter()

if (!auth.user.admin) {
	router.push('/')
}

const nome = ref('')
const image = ref(null)
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

const validarFormulario = () => {
	if (
		!nome.value ||
		!image.value
	) {
		emit('showToast', {
			type: 'info',
			message: 'Por favor, preencha todos os campos',
		});
		return false;
	}
	return true;
};

const postPatrocinador = async () => {
	if (!validarFormulario()) return;

	const formData = new FormData();
	formData.append('nome', nome.value);
	formData.append('imagem', image.value, image.value.name);
	try {
		const response = await http.post(
			'http://localhost:3000/banners',
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
			router.push('/admin');
		} else {
			showToast.value = true;
		}
	} catch (error) {
		showToast.value = true;
	}
};


</script>
<template>
	<h1 class="text-2xl flex justify-center mb-4 mt-4 text-white">Cadastro de Patrocinador</h1>
	<form enctype="multipart/form-data" class="bg-base-300 rounded-lg shadow-md max-w-md mx-auto p-6">
		<label class="label">
			<span class="label-text">Nome</span>
		</label>
		<input maxlength="50" v-model="nome" type="textl" placeholder="Nome" class="input input-bordered w-full" />
		<label class="label mt-4">
			<span class="label-text">Imagem do banner</span>
		</label>
		<input type="file" name="imagem" class="file-input file-input-sm w-full max-w-xs" @change="handleFileChange" />
		
		<div @click="postPatrocinador" class="btn btn-primary mt-6">Cadastrar</div>
		<div @click="router.push('/')" class="flex items-center mt-8 cursor-pointer">
			<v-icon name="md-arrowback" class="mr-4"></v-icon>
			<div>Voltar para tela inicial</div>
		</div>
	</form>
</template>