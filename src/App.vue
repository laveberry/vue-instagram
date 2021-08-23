<template>
  <div style="width:500px; margin: 0 auto;">

    <div v-if="step==1">
      <!-- prop 전달 -->
      <!-- <Post v-bind:postData="postData"/> -->
      <Post v-for="(post, i) in postData" :key="i" v-bind:postData="post"/>
      <!-- 파일업로드 -->
      <p>
        <input type="file" id="file" class="inputfile" v-on:change="upload">
        <label for="file" class="input-plus">+</label>
      </p>
    </div>

    <div v-if="step==2">
      <input type="text" v-model="newTitle" placeholder="제목">
      <p><img :src="newImgSrc" alt=""></p>
      <input type="text" v-model="newAuthor" placeholder="글쓴이">
      <textarea placeholder="일상을 입력해주세요" v-model="newCaption"></textarea>
      <button @click="update()">저장</button>
    </div>

  </div>
</template>

<script>
import data from './assets/data.js';
import Post from './components/Post.vue'

export default {
  data(){
    return {
      postData : data,
      step : 1,
      newImgSrc : '',
      newTitle : '',
      newAuthor : '',
      newCaption : '',
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
        caption : this.newCaption
      }
      //unshift : 배열 맨앞에 데이터 추가해주기
      data.unshift(newData);
      this.step = 1;
    }
  }
}
</script>

<style>
img, textarea {width: 100%;}
.inputfile{width: 0px; height: 0px; overflow: hidden;} /**파일선택 지우기 */
</style>