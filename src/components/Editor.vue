<template>
  <div>
    <input type="text" v-model="newTitle" placeholder="제목">
      <p><img :src="imgSrc" alt=""></p>

      <!-- 필터 추가 -->
      <!-- <div class="filter-wrap"><p class="filter"><img :src="newImgSrc" alt=""></p></div> -->
        <div class="overflow">
            <!-- 클래스명과 필터명이 동일하면 적용됨 -->
            <ul class="filter-wrap">
            <li @click="getFilter" v-for="(fil, i) in filters" :key="i" class="filter">
                <!-- <figure v-bind:class="fil"> <img  :src="newImgSrc" alt=""></figure> -->
                <!-- <img v-bind:class="fil" :src="newImgSrc" alt=""> -->
                <img v-bind:class="fil" :src="imgSrc" alt="">
                <span>{{fil}}</span>
            </li>
            </ul>
        </div>
        <input type="text" v-model="newAuthor" placeholder="글쓴이">
        <textarea placeholder="일상을 입력해주세요" v-model="newCaption"></textarea>
        <button @click="update()">저장</button>
  </div>
  
</template>

<script>
import EventBus from '../assets/EventBus.js';

export default {
    name : 'editor',
    props:{
        imgSrc : String,
        filters : Array
    },
    data() {
        return {
            newTitle : '',
            newAuthor : '',
            newCaption : '',
            selectFilter: '',
        }
    },
    methods: {
        getFilter(e){
            console.log(e.target.className);
            this.selectFilter = e.target.className;
            EventBus.$emit('select-filter', e.target.className); //App에서 다시 받을거
        },
        //변수 저장을 위한 함수
        update(){
            var updateData = {
                title : this.newTitle,
                author : this.newAuthor,
                img : this.imgSrc,
                caption : this.newCaption,
                filter : this.selectFilter
            }
            //unshift : 배열 맨앞에 데이터 추가해주기
            // data.unshift(newData);
            // this.step = 1;
            EventBus.$emit('new-data', updateData);
        },
    },
}
</script>

<style>

</style>