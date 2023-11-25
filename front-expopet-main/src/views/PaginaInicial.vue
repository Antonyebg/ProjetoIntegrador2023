<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import http from '@/services/http.js';
import { useAuth } from '@/stores/auth';
const auth = useAuth()
const animaisPerPage = 10;
const currentPage = ref(1);
const animais = ref([]);

const filtrosVazios = computed(() => {
  return !filtros.value.cor && !filtros.value.porte && !filtros.value.corDosOlhos && !filtros.value.bairro && !filtros.value.sexo && !filtros.value.situacao
})

const textoAcao = (animal) => {
  if (animal.para_adocao) {
    return 'Adotar'
  }
  return 'Entrar em contato'
}

const filtros = ref({
  cor: '',
  porte: '',
  corDosOlhos: '',
  bairro: '',
  sexo: '',
  situacao: ''
})

const limparFiltros = () => {
  filtros.value.cor = ''
  filtros.value.porte = ''
  filtros.value.corDosOlhos = ''
  filtros.value.bairro = ''
  filtros.value.sexo = ''
  filtros.value.situacao = ''
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
    if (filtros.situacao) {
      if (filtros.situacao === 'temDono') {
        queryString += `temDono=true&`;
      } else if (filtros.situacao === 'animalPerdido') {
        queryString += `animalPerdido=true&`;
      } else if (filtros.situacao === 'paraAdocao') {
        queryString += `paraAdocao=true&`;
      }
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
    <div class="pt-4">
      <div class="mb-6 px-4 md:px-40">
        <div class="collapse collapse-arrow bg-base-300">
          <input type="checkbox" />
          <div class="collapse-title text-lg text-white">
            <div class="flex gap-2">
              <div>Filtros</div>
              <div class="my-auto">
                <v-icon class="my-auto" name="md-search"></v-icon>
              </div>
            </div>
          </div>
          <div class="collapse-content">
            <div class="flex flex-col md:flex-row gap-6 justify-center text-white">
              <div>
                Cor:
                <select v-model="filtros.cor" class="mt-1 form-select w-full select select-bordered ml-1">
                  <option value="">Todos</option>
                  <option value="marrom">Marrom</option>
                  <option value="branco">Branco</option>
                  <option value="dourado">Dourado</option>
                  <option value="preto">Preto</option>
                </select>
              </div>
              <div>
                Porte:
                <select v-model="filtros.porte" class="mt-1 form-select w-full select select-bordered ml-1">
                  <option value="">Todos</option>
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              <div>
                Cor dos olhos:
                <select v-model="filtros.corDosOlhos" class="mt-1 form-select w-full select select-bordered ml-1">
                  <option class="text-bold" value="">Todos</option>
                  <option value="castanho">Castanho</option>
                  <option value="azul">Azul</option>
                  <option value="verde">Verde</option>
                  <option value="naoidentificado">Não identificado</option>
                </select>
              </div>
              <div>
                Bairro:
                <select v-model="filtros.bairro" class="mt-1 form-select w-full select select-bordered ml-1">
                  <option v-for="bairro in bairroOptions" :key="bairro.value" :value="bairro.value">{{ bairro.label }}
                  </option>
                </select>
              </div>
              <div>
                Sexo:
                <select v-model="filtros.sexo" class="mt-1 form-select w-full select select-bordered ml-1">
                  <option value="">Todos</option>
                  <option value="macho">Macho</option>
                  <option value="femea">Fêmea</option>
                </select>
              </div>
              <div>
                Situação:
                <select v-model="filtros.situacao" class="mt-1 form-select w-full select select-bordered ml-1">
                  <option value="">Todos</option>
                  <option value="temDono">Animal aparenta ter dono</option>
                  <option value="animalPerdido">Animal perdido</option>
                  <option value="paraAdocao">Animal para adoção</option>
                </select>
              </div>
            </div>
            <div @click="limparFiltros" class="text-md flex justify-center mt-4 cursor-pointer text-red-300">
              <span v-show="!filtrosVazios">Limpar Filtros</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-2xl flex justify-center mt-4 mb-6 text-white">Quadro de animais</div>
      <div class="flex justify-center">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-12 px-4 md:px-0">
          <div v-for="animal in displayedAnimais" :key="animal.id"
            class="card card-compact md:w-72 bg-base-300 shadow-xl border">
            <figure class="image-container">
              <img :src="animal.imagem" alt="Shoes" class="object-cover" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title"><span class="text-white">{{ animal.nome }}</span></h2>
              <ul class="text-left">
                <li>Cor predominante: <span class="text-white">{{ animal.cor }}</span></li>
                <li>Porte: <span class="text-white">{{ animal.porte }}</span></li>
                <li>Cor dos olhos: <span class="text-white">{{ animal.cordosolhos }}</span></li>
                <li>Bairro onde foi encontrado: <span class="text-white">{{ animal.bairro }}</span></li>
                <li>Sexo: <span class="text-white">{{ animal.sexo }}</span></li>
                <div v-if="animal.tem_dono" class="flex text-lg my-2 text-yellow-300">
                  <div class="mr-1">Animal aparenta ter dono</div>
                  <div class="my-auto">
                    <v-icon scale="1.2" name="md-person"></v-icon>
                  </div>
                </div>
                <div v-if="animal.animal_perdido" class="flex text-lg align-middle my-2 text-red-300">
                  <div class="mr-1">Animal perdido, ajuda a encontrá-lo</div>
                  <div class="my-auto">
                    <v-icon scale="1.2" name="md-warning"></v-icon>
                  </div>
                </div>
                <div v-if="animal.para_adocao" class="flex text-lg my-2 text-green-300">
                  <div class="mr-1">Animal disponível para adoção</div>
                  <div class="my-auto">
                    <v-icon scale="1.2" name="md-favorite"></v-icon>
                  </div>
                </div>
              </ul>
              <div class="card-actions w-full items-center mt-4 h-full justify-end flex flex-col">
                <div class="w-full flex">
                  <div class="w-full">
                    <a :href="'https://wa.me/' + animal.user.telefone" target="_blank"
                      class="btn w-full btn-primary btn-sm">{{ textoAcao(animal) }}</a>
                  </div>
                  <div  v-if="auth.user.admin" class=" ml-2 my-auto">
                    <v-icon name="md-delete" class="text-red-500 my-auto cursor-pointer"
                      @click="deleteAnimal(animal.id)"></v-icon>
                  </div>
                </div>
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