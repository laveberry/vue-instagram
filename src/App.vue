<template>
  <div>
    <!-- {{postData}} -->
    <!-- prop 전달 -->
    <Post v-bind:postData="postData"/>
  </div>
</template>

<script>
import data from './assets/data.js';
import Post from './components/Post.vue'

export default {
  data(){
    return {
      postData : data
    }
  },
  components : {
    Post
  }
}
</script>

<style>

</style>