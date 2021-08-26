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
      <Editor :imgSrc="newImgSrc" v-bind:filters="filters"></Editor>
    </div>

  </div>
</template>

<script>
import data from './assets/data.js';
import Post from './components/Post.vue';
import Editor from './components/Editor.vue';
import EventBus from './assets/EventBus.js';

export default {
  data(){
    return {
      postData : data,
      step : 1,
      newImgSrc : '',
      // newTitle : '',
      // newAuthor : '',
      // newCaption : '',
      // 필터 적용을 위한 데이터 생성
      filters:["normal", 'toaster', '_1977', 'aden', 'brannan', 'brooklyn', 'clarendon', 'moon', "perpetua",'xpro2', 'willow', "xpro2", "stinson", "slumber"],
      selectFilter : ''
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
  },
  //EventBus로 받아온 데이터 작업, vue 라이프 사이클
  mounted(){
    // EventBus.$on('데이터를 전송하는 이름', (전송된 데이터) => { });
    EventBus.$on('select-filter', (filter) =>  {
      this.selectFilter = filter;
    });

    EventBus.$on('new-data', (newData) => {
      //unshift : 배열 맨앞에 데이터 추가해주기
      console.log('newData', newData);
      data.unshift(newData);
      this.step = 1;
    });
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