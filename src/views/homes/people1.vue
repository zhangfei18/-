<template>
  <div class="people1">
    <div @click="peo1">我是子组件1people1：{{msg}}</div>
    <div @click="emitBrother"> 给弟弟传递数据：</div>
  </div>
</template>

<script>
export default {
  name: "People1",
  data() {
    return {};
  },
  mounted(){
      console.log(this.$bus)
  },
  methods: {
    peo1() {
      this.$emit("people1", "大儿子->父亲");
      console.log("我是");
    },
    emitBrother(){
        console.log(this.$bus) ;
        this.$bus.$emit('aaa1', '你好呀弟弟')
    }
  },
  props: {
    msg: {
      type: String,
      default: "爸爸不爱我了"
    }
  }
};
</script>
<style scoped>
.people1{
    width: 500px;
    height: 250px;
    border: 2px solid salmon;
}
</style>