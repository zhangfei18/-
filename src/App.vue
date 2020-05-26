<template>
  <div id="app">
    <router-link to="/rili">日历</router-link>
    <!-- <router-link to="/boll">波纹小球</router-link> -->
    <!-- <router-link to="/home">home</router-link> -->
    <router-link style="float: right" to="/myrili">我的日历</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  height: 100vh;
}
body,
html {
  overflow: hidden;
   /* -webkit-filter: grayscale(1);
    filter: grayscale(1);
    -moz-filter: grayscale(1);
    -o-filter: grayscale(1); */
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: "Segoe UI";
}
</style>
