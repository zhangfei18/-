<template>
  <div class="groundson">
      <div>我是孙子组件:</div>
      <div>爷爷给我发来消息：{{groundsonmsg}}</div>
  </div>
</template>

<script>
export default {
  name: "Groundson",
  data() {
    return {
        res: ''
    };
  },
  mounted(){
      
  },
  inject:['groundsonmsg']
};
</script>
<style scoped>
.groundson{
    width: 300px;
    height: 150px;
    border: 2px solid rgb(0, 72, 139);
}
</style>