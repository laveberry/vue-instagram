<template>
  <div style="width:500px; margin: 0 auto;">

<!-- 이미지등록시 3번 적용되는거랑 필터적용 잡기 -->
    <div v-if="step==1">
      <!-- 파일업로드 -->
      <p style="text-align:center;">
        <input type="file" id="file" class="inputfile" v-on:change="upload">
        <label for="file" class="input-plus">write</label>
      </p>
      <!-- prop 전달 -->
      <!-- <Post v-bind:postData="postData"/> -->
      <Post v-for="(post, i) in postData" :key="i" v-bind:postData="post"/>
    </div>

    <div v-if="step==2">
      <Editor :imgSrc="newImgSrc" v-bind:filters="filters">
        <!-- slot : props 정의 안하고 parent에서 child로 데이터 간단히 표현되도록함
                    child의 slot컴포넌트 안에서 표현될 예정 -->
        <h1>{{editorTitle}}</h1>
      </Editor>
    </div>

    <!-- ajax 통신연결 -->
    <button v-on:click="getMore">더보기</button>

  </div>
</template>

<script>
// import data from './assets/data.js';
import Post from './components/Post.vue';
import Editor from './components/Editor.vue';
import EventBus from './assets/EventBus.js';
// import axios from 'axios';
import request from "request"; //백단연결

export default {
  data(){
    return {
      // postData : data,
      postData : this.$store.getters.POSTDATA,
      step : 1,
      newImgSrc : '',
      // newTitle : '',
      // newAuthor : '',
      // newCaption : '',
      // 필터 적용을 위한 데이터 생성
      filters:["normal", 'toaster', '_1977', 'aden', 'brannan', 'brooklyn', 'clarendon', 'moon', "perpetua",'xpro2', 'willow', "xpro2", "stinson", "slumber"],
      selectFilter : '',
      // editorTitle : '글쓰기 화면', //store로 이동
    }
  },
  components : {
    Post, Editor
  },
  methods:{
    // + 눌렀을때 함수
    upload(e){
      let file = e.target.files;
      let reader = new FileReader();

      reader.readAsDataURL(file[0]);
      reader.onload = e => {
        // console.log(e.target.result); //로컬 이미지경로
        this.newImgSrc = e.target.result;
      }
      this.step = 2;//업로드 후 뜨도록
    },

    // getFilter(e){
    //   console.log(e.target.className);
    //   this.selectFilter = e.target.className;
    // }

    getMore(){
      //get방식 ajax 통신
      //unshift는 상단에 리스트를 추가, push는 하단에 리스트를 추가
      // axios.get('moreData.json').then( moreData => {
      //   this.postData.push(moreData.data[0]);
      // }).catch( err => {
      //   console.log(err);
      // });
      this.$store.dispatch('GET_POSTDATA');
    }
  },
  //EventBus로 받아온 데이터 작업, vue 라이프 사이클
  mounted(){
    // 백단 연결요청 test
    request('http://localhost:8080/api/hello', function(error, response, body){
      window.console.log('error', error);
      window.console.log('statuseCode:', response && response.statusCode);
      window.console.log('body', body);
    });
    // EventBus.$on('데이터를 전송하는 이름', (전송된 데이터) => { });
    EventBus.$on('select-filter', (filter) =>  {
      this.selectFilter = filter;
    });

    //업데이트
    // EventBus.$on('new-data', (newData) => {
    //   //unshift : 배열 맨앞에 데이터 추가해주기
    //   console.log('newData', newData);
    //   // data.unshift(newData);
    //   this.postData.unshift(newData);
    //   this.step = 1;
    // });
    EventBus.$on('new-data', (uploadData)=>{
      this.$store.commit('SET_POSTDATA', uploadData);
      //   this.postData.unshift(uploadData);
      this.step = 1;
    })
  },
  //store에 저장된 데이터 쉽게 꺼내기
  computed : {
    editorTitle(){
      return this.$store.state.editorTitle;
    }
  }
}
</script>

<style>
img, textarea {width: 100%;}
.inputfile{width: 0px; height: 0px; overflow: hidden;} /**파일선택 지우기 */

.input-plus{cursor: pointer; font-size: 1.5em; font-weight: bold; color: mediumblue; border: 1px solid black; padding: 5px;}
.input-plus:hover{color: aqua;}

.filter-wrap{padding: 0; margin-bottom: 10px; width: 400%;}
.filter{width: 100px; height: 65px; margin: 0; display: inline-block; cursor: pointer;}
.overflow{overflow-x: scroll;}
</style>