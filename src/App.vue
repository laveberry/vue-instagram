<template>
  <div style="width:500px; margin: 0 auto;">


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
      <input type="text" v-model="newTitle" placeholder="제목">
      <p><img :src="newImgSrc" alt=""></p>
      <!-- 필터 추가 -->
      <!-- <div class="filter-wrap"><p class="filter"><img :src="newImgSrc" alt=""></p></div> -->
      <!-- <ul class="filter-wrap"><li class="filter"><img :src="newImgSrc" alt=""></li></ul> -->
      <div class="overflow">
        <!-- 클래스명과 필터명이 동일하면 적용됨 -->
        <ul class="filter-wrap">
          <li @click="getFilter" v-for="(fil, i) in filters" :key="i" class="filter">
            <!-- <figure :class="fil"> -->
              <img :class="fil" :src="newImgSrc" alt="">
            <!-- </figure> -->
            <!-- <img v-bind:class="fil" :src="newImgSrc" alt=""> -->
            <span>{{fil}}</span>
          </li>
        </ul>
      </div>
      
      

      <input type="text" v-model="newAuthor" placeholder="글쓴이">
      <textarea placeholder="일상을 입력해주세요" v-model="newCaption"></textarea>
      <button @click="update()">저장</button>
    </div>

  </div>
</template>

<script>
import data from './assets/data.js';
import Post from './components/Post.vue';

export default {
  data(){
    return {
      postData : data,
      step : 1,
      newImgSrc : '',
      newTitle : '',
      newAuthor : '',
      newCaption : '',
      // 필터 적용을 위한 데이터 생성
      // ★필터 왜 적용이 안될까★★★★★★★★★★★★★★★
      filters:["normal", 'Toaster', "1977", 'Aden', 'Brannan', 'Brooklyn', 'Clarendon', 'Moon', 'Willow', 'Stinson', 'Willow'],
      selectFilter : ''
    }
  },
  components : {
    Post
  },
  methods:{
    // + 눌렀을때 함수
    upload(e){
      let file = e.target.files;
      let reader = new FileReader();

      reader.readAsDataURL(file[0]);
      reader.onload = e => {
        console.log(e.target.result); //로컬 이미지경로
        this.newImgSrc = e.target.result;
      }
      this.step = 2;//업로드 후 뜨도록
    },
    //변수 저장을 위한 함수
    update(){
      var newData = {
        title : this.newTitle,
        author : this.newAuthor,
        img : this.newImgSrc,
        caption : this.newCaption,
        filter : this.selectFilter
      }
      //unshift : 배열 맨앞에 데이터 추가해주기
      data.unshift(newData);
      this.step = 1;
    },
    getFilter(e){
      console.log(e.target.className);
      this.selectFilter = e.target.className;
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