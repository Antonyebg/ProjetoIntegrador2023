<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import http from '@/services/http.js';
import { useAuth } from '@/stores/auth';
const auth = useAuth()
const animaisPerPage = 10;
const currentPage = ref(1);
const animais = ref([]);

onMounted(async () => {
  await getAnimais();
});

const getAnimais = async () => {
  const response = await http.get('/animals');
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
</script>

<template>
  <div class="flex flex-col justify-between">
    <div>
      <h1 class="text-2xl flex justify-center mb-8">Animais para adoção</h1>
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
                <v-icon v-if="auth.user.admin" name="md-delete" class="text-red-500 cursor-pointer"  @click="deleteAnimal(animal.id)"></v-icon>
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