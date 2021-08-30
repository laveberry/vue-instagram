import Vue from "vue";
import Vuex from 'vuex';
import data from '../data.js';
import axios from 'axios';


Vue.use(Vuex);

export let store = new Vuex.Store({
    state : { //데이터 저장공간, 직접 가져다 쓰면 안됨 getters를 통할것
        postData : data,
        editorTitle : '글쓰기 화면'
    },
    getters : { //저장한 데이터 가져오기
        //state의 이름 그대로 사용하되, 대문자
        POSTDATA(state){
            return state.postData
        }
    },
    mutations : { //데이터 업데이트, state 값을 변경할 수 있는 유일한 방법.
        /**
         SET_NAME(state, 전송받은 데이터){
             state.name = 전송받은 데이터
         }
         */
        SET_POSTDATA(state, updateData){
            //vue의 update부분 받아오기
            state.postData.unshift(updateData);
        },
        SET_MOREPOSTDATA(state, updateData){
            state.postData.push(updateData);
        }
    },
    actions : { //mutations 실행(ajax요청, mutations동작), 비동기 처리 로직 선언
        /**
         this.$store.commit('SET_NAME', 전송할 데이터);
         this.$store.dispatch('SET_NAME', 전송받은 데이터); vue에서 사용
         */
        GET_POSTDATA(context){
            axios.get('moreData.json').then( moreData => {
                // this.postData.push(moreData.data[0]);
                context.commit('SET_MOREPOSTDATA', moreData.data[0])
            }).catch( err => {
                console.log(err);
            });
        }
    }
    //main.js에 추가
})