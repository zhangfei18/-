<template>
  <div class="home">
      <div>Home</div>
      <people1 ref="people1" :msg=msg @people1="people1"></people1>
      <people2 ref="people2"></people2>
      <button @click="getchild">我要获取我的孩儿们</button>
      <div>{{child}}</div>
  </div>
</template>

<script>
import people1 from './homes/people1';
import people2 from './homes/people2';
export default {
  name: "Home",
  data() {
    return {
        msg: '父=>大儿子（信息）',
        peo1: '',
        child: [],
    };
  },
  provide:{
      groundsonmsg: '孙子，我是你爷爷！！！'
  },
  methods:{
      people1(m){
          this.peo1 = m;
      },
      getchild(){
          console.log(this.$children);
          this.child = this.$children;
      }
  },
  components:{
      people1,people2
  },
  mounted(){
      console.log(this.$refs.people1)
  }
};
</script>