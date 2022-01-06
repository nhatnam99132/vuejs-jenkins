import AuthServices from '../../api/modules/auth'
import axios from "axios";
const state = {
    token: localStorage.getItem('token') || '',
    status: '',
    isLogin: false,
    isRegister: true,
    user: {}
    //number: 0
}
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
}
const mutations = {
    DO_SOMETHING() {
        console.log('function from mutation...');
    },
    auth_request(state){
        state.status = 'loading';
      },
      auth_success(state, response){
        state.status = 'success';
        state.token = response.access_token;
        state.user = response.idUser;
        //console.log(response);
      },
      auth_error(state){
        state.status = 'error';
      },
      logout(state){
        state.status = '';
        state.token = '';
      },
      register(state) {
        state.isRegister = true;
        //console.log('Login from store: ' + state.token);
    },
    profile(state, response) {
        //console.log(response);
        state.user = response;
        //console.log('Login from store: ' + state.token);
    }
}
const actions = {
    async login({commit},crenditials) {
            await AuthServices.login(crenditials)
            .then(response => {
                //console.log(response.data);
                //localStorage.setItem('token', response.data.access_token);
                const token = response.data.access_token;
                //const user = response.data.idUser;
                //console.log(response.data.idUser);
                localStorage.setItem('token', 'Bearer '+token);
                const bearerToken ='Bearer '+response.data.access_token;
                axios.defaults.headers.common['Authorization'] = bearerToken;
                commit('auth_success', response.data);
            //     console.log(crenditials.username + ' ' + crenditials+ ''+ response.data.access_token.password);
            //    console.log(state.token);
            })
            .catch(error => {
                commit('auth_error')
                localStorage.removeItem('token')
                console.log(error);
                state.token = null
            });
            //commit('DO_SOMETHING');
    },
    async logout({commit}) {
        await AuthServices.logout()
        .then(async (response) => {
            console.log(response.data);
            await localStorage.removeItem('token');
            await delete axios.defaults.headers.common['Authorization'];
            commit('logout');
        })
        .catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            commit('logout');
        });
    },
    async register({commit},crenditials) {
        await AuthServices.register(crenditials)
        .then(response => {
            //console.log(response.data.access_token);
            //localStorage.setItem('token', response.data.access_token);
            commit('register');
            console.log(response.data.message);
            //console.log(crenditials.username + ' ' + crenditials.password);
           // console.log(state.token);
        })
        .catch(error => {
            console.log(error);
            state.isRegister = false;
        });
        //commit('DO_SOMETHING');
},
async userProfile({commit}) {
    await AuthServices.userProfile()
    .then(async (response) => {
        //console.log(response.data);
        commit('profile', response.data);
    })
    .catch(error => {
        console.log(error);
        // localStorage.removeItem('token');
        // delete axios.defaults.headers.common['Authorization'];
        // commit('logout');
    });
},
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}