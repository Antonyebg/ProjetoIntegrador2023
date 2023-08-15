<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import http from '@/services/http.js';

const animais = ref([]);

onMounted(async () => {
  const response = await http.get('/animals');
  animais.value = await response.data;
});

</script>

<template>
  <div class="flex flex-col justify-between">
    <div>
      <h1 class="text-2xl flex justify-center mb-8">Animais para adoção</h1>
      <div class="flex justify-center">
        <div class="grid grid-cols-5 gap-12">
          <div v-for="animal in animais" class="card card-compact w-60 bg-base-300 text-sm shadow-xl">
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
              <div class="card-actions mt-4">
                <a :href="'https://wa.me/' + animal.user.telefone" target="_blank" class="btn btn-primary btn-sm">Adotar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join flex justify-center my-6">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 1</button>
      <button class="join-item btn">»</button>
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
  /* Adjust the height as needed */
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>