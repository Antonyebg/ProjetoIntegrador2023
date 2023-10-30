<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import http from '@/services/http.js';
import { useAuth } from '@/stores/auth';
const auth = useAuth()
const animaisPerPage = 10;
const currentPage = ref(1);
const animais = ref([]);

const filtros = ref({
  cor: '',
  porte: '',
  corDosOlhos: '',
  bairro: '',
  sexo: ''
})

const limparFiltros = () => {
  filtros.value.cor = ''
  filtros.value.porte = ''
  filtros.value.corDosOlhos = ''
  filtros.value.bairro = ''
  filtros.value.sexo = ''
}

watch(filtros, async (filtros) => {
  await getAnimais(filtros)
}, { deep: true })

onMounted(async () => {
  await getAnimais();
});

const getAnimais = async (filtros) => {
  let queryString = '?';
  if (filtros) {
    if (filtros.cor) {
      queryString += `cor=${filtros.cor}&`;
    }
    if (filtros.porte) {
      queryString += `porte=${filtros.porte}&`;
    }
    if (filtros.corDosOlhos) {
      queryString += `corDosOlhos=${filtros.corDosOlhos}&`;
    }
    if (filtros.bairro) {
      queryString += `bairro=${filtros.bairro}&`;
    }
    if (filtros.sexo) {
      queryString += `sexo=${filtros.sexo}&`;
    }
  }
  const response = await http.get(`/animals${queryString}`);
  animais.value = await response.data;
};

const startIdx = computed(() => (currentPage.value - 1) * animaisPerPage);
const endIdx = computed(() => currentPage.value * animaisPerPage);

const displayedAnimais = computed(() => animais.value.slice(startIdx.value, endIdx.value));

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (endIdx.value < animais.value.length) {
    currentPage.value++;
  }
};

const deleteAnimal = async (id) => {
  const response = await http.delete(`/animals/${id}`);
  if (response.status === 204) {
    await getAnimais();
  }
};

const bairroOptions = [
  { label: 'Todos', value: '' },
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

</script>



<template>
  <div class="flex flex-col justify-between">
    <div>
      <h1 class="text-2xl flex justify-center mb-8 text-white">Animais para adoção</h1>
      <div class="flex justify-center mb-8">
        <!-- <h1 class="text-md flex justify-center text-yellow-300">Filtros</h1> -->
        <!-- <h1 @click="limparFiltros" class="text-md flex justify-center cursor-pointer text-white">Limpar Filtros</h1> -->
      </div>
      <div class="flex justify-center mb-10 text-white">
        <div class="ml-10">
          Cor:
          <select v-model="filtros.cor" class="form-select ml-1">
            <option value="">Todos</option>
            <option value="marrom">Marrom</option>
            <option value="branco">Branco</option>
            <option value="preto">Preto</option>
            <option value="dourado">Dourado</option>
            <option value="preto">Preto</option>
          </select>
        </div>
        <div class="ml-10">
          Porte:
          <select v-model="filtros.porte" class="form-select ml-1">
            <option value="">Todos</option>
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div class="ml-10">
          Cor dos olhos:
          <select v-model="filtros.corDosOlhos" class="form-select ml-1">
            <option class="text-bold" value="">Todos</option>
            <option value="castanho">Castanho</option>
            <option value="azul">Azul</option>
            <option value="verde">Verde</option>
            <option value="naoidentificado">Não identificado</option>
          </select>
        </div>
        <div class="ml-10">
          Bairro:
          <select v-model="filtros.bairro" class="form-select ml-1">
            <option value="">Todos</option>
            <option v-for="bairro in bairroOptions" :key="bairro.value" :value="bairro.value">{{ bairro.label }}</option>
          </select>

        </div>
        <div class="ml-10">
          Sexo:
          <select v-model="filtros.sexo" class="form-select ml-1">
            <option value="">Todos</option>
            <option value="macho">Macho</option>
            <option value="femea">Fêmea</option>
          </select>
        </div>
        <h1 @click="limparFiltros" class="text-md flex justify-center cursor-pointer ml-14 text-red-300">Limpar Filtros</h1>
      </div>
      <div class="flex justify-center">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div v-for="animal in displayedAnimais" :key="animal.id"
            class="card card-compact md:w-60 bg-base-300 text-sm shadow-xl">
            <figure class="image-container">
              <img :src="animal.imagem" alt="Shoes" class="object-cover" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">{{ animal.nome }}</h2>
              <ul class="text-left">
                <li>Cor predominante: {{ animal.cor }}</li>
                <li>Porte: {{ animal.porte }}</li>
                <li>Cor dos olhos: {{ animal.cordosolhos }}</li>
                <li>Bairro onde foi encontrado: {{ animal.bairro }}</li>
                <li>Sexo: {{ animal.sexo }}</li>
              </ul>
              <div class="card-actions items-center mt-4">
                <a :href="'https://wa.me/' + animal.user.telefone" target="_blank"
                  class="btn btn-primary btn-sm">Adotar</a>
                <v-icon v-if="auth.user.admin" name="md-delete" class="text-red-500 cursor-pointer"
                  @click="deleteAnimal(animal.id)"></v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join flex justify-center my-6">
      <button @click="goToPreviousPage" class="join-item btn" :disabled="currentPage === 1">«</button>
      <button class="join-item btn">Página {{ currentPage }}</button>
      <button @click="goToNextPage" class="join-item btn" :disabled="endIdx >= animais.length">»</button>
    </div>
  </div>
</template>
<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>