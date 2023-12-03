import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PaginaInicial.vue'),
      meta: {
        auth:true
      }
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroUsuario.vue')
    },
    {
      path: '/cadastro-animal',
      name: 'cadastro-animal',
      component: () => import('../views/CadastroAnimal.vue'),
      meta: {
        auth:true
      }
    },
    {
      path: '/cadastro-patrocinador',
      name: 'cadastro-patrocinador',
      component: () => import('../views/CadastroPatrocinador.vue'),
      meta: {
        auth:true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/PainelAdmin.vue'),
      meta: {
        auth:true
      }
    }
  ]
})

router.beforeEach(routes);

export default router
