import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 state : 데이터 저장공간
 getters : 저장한 데이터 가져오기
 mutations : 데이터 업데이트
 actions : mutations 실행(ajax요청, mutations동작)
 */
export let store = new Vuex.Store({
    state : {},
    getters : {},
    mutations : {},
    actions : {}
    //main.js에 추가
})