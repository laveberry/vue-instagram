import Vue from 'vue';
import Vuex from 'vuex'
import AuthService from '../services/auth.service';

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status : { loggedln : true }, user }
    : { status : { loggedln : false }, user : null };



const state = { initialState }

const mutations = {
    loginSuccess(state, user){
        state.initialState.status.loggedln = true;
        state.initialState.status.user = user;
    },
    loginFailure(state){
        state.initialState.status.loggedln = false;
        state.initialState.user = null;
    },
    logout(state){
        state.initialState.status.loggedln = false;
        state.initialState.user = null;
    },
    registerSuccess(state){
        state.initialState.status.loggedln = false;
    },
    registerFailure(state){
        state.initialState.status.loggedln = false;
    }
}

const actions = {
    login( { commit }, user){
        return AuthService.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
    },
    logout( {commit} ){
        AuthService.logout();
        commit('logout');
    },
    register({commit}, user){
        return AuthService.register(user).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    }
}

const store = new Vuex.Store({
    strict : true,
    mutations,
    state,
    actions,
})

export default store;