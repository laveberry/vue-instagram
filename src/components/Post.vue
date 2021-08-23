<template>
  <div>
      <!-- {{postData}} -->
      <!-- <h2>{{postData[0].title}}</h2>
      <p><img v-bind:src="postData[0].img" alt=""></p>
      <p>글쓴이 : {{postData[0].author}}</p>
      <p>{{postData[0].caption}}</p> -->

        <h2>{{postData.title}}</h2>
      <p><img v-bind:src="postData.img" alt=""></p>
      <p>글쓴이 : {{postData.author}}</p>
      <p>{{postData.caption}}</p>
  </div>
</template>

<script>
export default {
    name : 'post',
    //넘어온 prop 받기위한 작업
    props : {
        'postData' : Object
    }
}
</script>

<style>

</style>