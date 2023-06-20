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
  <div>
    <h1 class="text-2xl flex justify-center mb-8">Animais para adoção</h1>
    <div class="flex justify-center">
      <div class="grid grid-cols-5 gap-12">
        <div v-for="animal in animais" class="card card-compact w-60 bg-base-300 text-sm shadow-xl">
          <figure class="">
            <img src="https://guiaanimal.net/uploads/content/image/48533/Design_sem_nome_-_2021-08-20T184136.453.png"
              alt="Shoes" />
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
              <button class="btn btn-primary btn-sm">Adotar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join flex justify-center my-6">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 01</button>
      <button class="join-item btn">»</button>
    </div>
  </div>
</template>
