import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@/services/http.js';
import router from '../router';
import Cookies from 'js-cookie';

export const useAuth = defineStore('auth', () => {

    const token = ref(Cookies.get('token'));
    const userString = Cookies.get('user');
    const user = ref(userString ? JSON.parse(userString) : null);
    const isAuth = ref(false);

    function setToken(tokenValue) {
        Cookies.set('token', tokenValue);
        token.value = tokenValue;
    }

    function setUser(userValue) {
        Cookies.set('user', JSON.stringify(userValue));
        user.value = userValue;
    }

    function setIsAuth(auth) {
        isAuth.value = auth;
    }

    const isAuthenticated = computed(() => {
        return token.value && user.value;
    })

    const fullName = computed(() => {
        if (user.value) {
            return user.value.firstName + ' ' + user.value.lastName;
        }
        return '';
    })

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value;
            const { data } = await http.get("/auth/verify", {
                headers: {
                    Authorization: tokenAuth,
                },
            });
            return data;
        } catch (error) {
            clear();
            router.push('/login');
        }
    }

    function clear() {
        Cookies.remove('token');
        Cookies.remove('user');
        isAuth.value = false;
        token.value = '';
        user.value = '';
    }

    return {
        token,
        user,
        setToken,
        setUser,
        checkToken,
        isAuthenticated,
        fullName,
        clear,
        setIsAuth,
        isAuth
    }

})
