import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http.js';

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  async function getUser() {
    const res = await http.get("https://localhost:3000/user");

    const user = await res.json();
    this.user = user;
  }
  async function signUp(email, password) {
    const res = await http.post("https://localhost:3000/register", 
      JSON.stringify({ email, password })
    );
    const user = await res.json()
    this.user = user;
  }
  async function signIn(email, password) {
    const res = await http.post("https://localhost:3000/users", 
      JSON.stringify({ email, password })
    );
    const user = await res.json();
    this.user = user;
  }
  return { count, doubleCount, increment }
})
