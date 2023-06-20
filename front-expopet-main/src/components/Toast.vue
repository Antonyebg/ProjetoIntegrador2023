<template>
    <div @click="emit('close')" class="toast toast-center toast-top">
        <div :class="'alert ' + toast_store.type">
            <span>{{ toast_store.message }}</span>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useToastStore } from '../stores/toast';
const toast_store = useToastStore()
const emit = defineEmits(['close'])
onMounted(() => {
    setTimeout(() => {
        emit('close')
    }, 3000)
})
</script>

<style>
.success {
    background-color: #d4edda;
    color: #155724;
}
.error {
    background-color: #f8d7da;
    color: #721c24;
}
.info {
    background-color: #cce5ff;
    color: #004085;
}
</style>