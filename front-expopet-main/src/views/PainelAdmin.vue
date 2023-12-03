<template>
    <div class="flex flex-col justify-between px-16">
        <div class="pt-4">
            <div class="text-2xl flex justify-center mt-4 mb-6 text-white">Painel do Administrador</div>
        </div>
        <div class="flex justify-between">
            <span class="text-white text-xl mb-4">Patrocinadores</span>
            <div @click="router.push('cadastro-patrocinador')" class="btn btn-ghost normal-case text-lg font-medium text-white">Cadastrar Patrocinador</div>
        </div>
        <table class="table text-white bg-slate-700 mb-6">
            <thead class="text-white">
                <tr>
                    <th>Nome</th>
                    <th>Imagem</th>
                    <th>Data de cadastro</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="banner in banners" :key="banner.id">
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ banner.nome }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <img class="w-32" :src="banner.imagem" />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ formatCreatedAtDate(banner.createdAt) }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-icon name="md-delete" class="text-red-500 my-auto cursor-pointer"
                            @click="deleteBanner(banner.id)"></v-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <span class="text-white text-xl mb-4 mt-4">Usuários</span>
        <table class="table text-white bg-slate-700">
            <thead class="text-white">
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Data de cadastro</th>
                    <th>Admin</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ usuario.nome }}</div>
                                <div class="text-sm opacity-50">{{ usuario.pais }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ usuario.email }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ usuario.telefone }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ formatCreatedAtDate(usuario.createdAt) }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ usuario.admin ? 'Sim' : 'Não' }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-icon v-if="!usuario.admin" name="md-delete" class="text-red-500 my-auto cursor-pointer"
                            @click="deleteUser(usuario.id)"></v-icon>
                    </td>
                </tr>
            </tbody>
        </table>
        <span class="text-white text-xl mb-4 mt-10">Animais</span>
        <div class="collapse collapse-arrow bg-base-300 mb-4">
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
                            <option v-for="bairro in bairroOptions" :key="bairro.value" :value="bairro.value">{{
                                bairro.label }}
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
        <table class="table text-white bg-slate-700">
            <thead class="text-white">
                <tr>
                    <th>Nome</th>
                    <th>Data de cadastro</th>
                    <th>Bairro</th>
                    <th>Porte</th>
                    <th>Cor</th>
                    <th>Cor dos olhos</th>
                    <th>Sexo</th>
                    <th>Usuário</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="animal in animais" :key="animal.id">
                    <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                    <img :src="animal.imagem"/>
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{{ animal.nome }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{{ formatCreatedAtDate(animal.createdAt) }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="font-bold">{{ animal.bairro }}</div>
                    </td>
                    <td>
                        <div class="font-bold">{{ animal.porte }}</div>
                    </td>
                    <td>
                        <div class="font-bold">{{ animal.cor }}</div>
                    </td>
                    <td>
                        <div class="font-bold">{{ animal.cordosolhos }}</div>
                    </td>
                    <td>
                        <div class="font-bold">{{ animal.sexo }}</div>
                    </td>
                    <td>
                        <div class="font-bold">{{ animal.user.nome }}</div>
                    </td>
                    <td>
                        <v-icon name="md-delete" class="text-red-500 my-auto cursor-pointer"
                            @click="deleteAnimal(animal.id)"></v-icon>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import http from '@/services/http.js';
import { useAuth } from '@/stores/auth';
const auth = useAuth()
const router = useRouter()

const animais = ref([])
const usuarios = ref([])
const banners = ref([])

const deleteAnimal = async (id) => {
    const response = await http.delete(`/animals/${id}`);
    if (response.status === 204) {
        await getAnimais();
    }
};

const deleteBanner = async (id) => {
    const response = await http.delete(`/banners/${id}`);
    if (response.status === 204) {
        await getBanners();
    }
};

const deleteUser = async (id) => {
    const response = await http.delete(`/users/${id}`);
    if (response.status === 204) {
        await getUsuarios();
    }
};

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

const filtros = ref({
    cor: '',
    porte: '',
    corDosOlhos: '',
    bairro: '',
    sexo: '',
    situacao: ''
})

const getUsuarios = async () => {
    const response = await http.get('/users');
    usuarios.value = await response.data;
};

const getBanners = async () => {
    const response = await http.get('/banners');
    banners.value = await response.data;
};

function formatCreatedAtDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
    return formattedDate;
}

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
    if (!auth.user.admin) {
        router.push('/')
    }
    await getAnimais();
    await getUsuarios();
    await getBanners();
})

</script>