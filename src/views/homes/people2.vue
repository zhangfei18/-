<template>
  <div class="people2">
      <div>我是子组件2people2：</div>
      <div>我接受到了哥哥的信息：{{res}}</div>
      <Groundson></Groundson>
  </div>
</template>

<script>
import Groundson from '../Groundson'
export default {
  name: "People2",
  data() {
    return {
        res: ''
    };
  },
  mounted(){
    //  利用bus监听
      this.$bus.$on('aaa1', res=>{
          this.res = res;
          console.log(res);
      });
    //   利用ref获取people1的组件
    console.log('第25行'+this.$refs.people1)

  },
  components:{
      Groundson
  }
};
</script>
<style scoped>
.people2{
    width: 500px;
    height: 250px;
    border: 2px solid darkmagenta;
}
</style>