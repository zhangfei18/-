<template>
  <div class="myRili">
    <!-- 顶部标题 -->
    <div class="nav">
      <ul>
        <li>列表</li>
        <li>月</li>
        <li class="active">日</li>
      </ul>
    </div>
    <!-- 周几标题 -->
    <div class="week">
      <ul>
        <li v-for="(val, index) in week" :key="index">{{ val }}</li>
      </ul>
    </div>
    <!-- 主体区域 -->
    <div
      class="main-move"
      @touchstart="start"
      @touchend="end"
      @touchmove="move"
      ref="mMove"
      :style="{ transform: `translateX(${x}px)`, transition: transitionNum }"
    >
      <div class="main">
        <div class="m-bg">{{month === 0?12:month}}</div>
        <ul class="days">
          <li v-for="(val, index) in prevdays" :key="index">
            <span
              :class="[
                { today: val.getDate() === day },
                { past: isCurrentMonthDay(val, month-1) },
              ]"
              >{{ val | getDay }}</span
            >
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="m-bg">{{month+1}}</div>
        <ul class="days">
          <li v-for="(val, index) in days" :key="index">
            <span
              :class="[
                { today: val.getDate() === day },
                { past: isCurrentMonthDay(val, month) },
              ]"
              >{{ val | getDay }}</span
            >
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="m-bg">{{month+2 === 13?1:month+2}}</div>
        <ul class="days">
          <li v-for="(val, index) in nextdays" :key="index">
            <span
              :class="[
                { today: val.getDate() === day },
                { past: isCurrentMonthDay(val, month +1) },
              ]"
              >{{ val | getDay }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 计算日期的方法
function getYearMonthDay(year, month, day) {
  let d = new Date(...arguments);
  let week = d.getDay();
  let starDay = d - week * 86400000;
  let dayArys = [];
  for (let i = 0; i < 42; i++) {
    dayArys.push(new Date(starDay + i * 86400000));
  }
  return dayArys;
}
export default {
  name: "MyRili",
  props: {
    time: {
      default: () => {
        return new Date();
      },
    },
  },
  data: function() {
    return {
      week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      year: this.time.getFullYear(),
      month: this.time.getMonth(),
      day: this.time.getDate(),
      days: [],
      prevdays: [],
      nextdays: [],
      disX: 0,
      x: 0,
      moveX: 0,
      transitionNum: 0,
      screenX: 0,
    };
  },

  filters: {
    getDay(val) {
      let y = val.getFullYear();
      let m = val.getMonth();
      let d = val.getDate();
      let now = new Date();
      if (
        y === now.getFullYear() &&
        m === now.getMonth() &&
        d === now.getDate()
      ) {
        return "今";
      } else {
        return d;
      }
    },
  },
  mounted() {
    this.getDays();
    // console.log(this.days);
    this.screenX = window.screen.width;
    // console.log(this.screenX, "---屏幕的宽度---");
    this.x = -this.screenX;
  },
  methods: {
    getDays() {
      this.prevdays = getYearMonthDay(this.year, this.month - 1, 1);
      this.days = getYearMonthDay(this.year, this.month, 1);
      this.nextdays = getYearMonthDay(this.year, this.month + 1, 1);
    },
    isCurrentMonthDay(val, month) {
      return !(val.getMonth() === month);
    },
    start(ev) {
      this.transitionNum = "none";
      this.disX = ev.changedTouches[0].pageX;
      let num = Math.round(
        getComputedStyle(this.$refs.mMove).transform.split(',')[4] / this.screenX
      );
      let d = new Date(this.year, this.month, 1);
      /**
       * 注意：每当按下时都要计算此时位于第几屏上，这样才能计算月份赋值给不用的数组源
       */
      if (Math.abs(num) === 2) {
        d.setMonth(this.month + 1);
      } else if (Math.abs(num) === 0) {
        d.setMonth(this.month - 1);
      }
      this.year = d.getFullYear();
      this.month = d.getMonth();
      this.getDays();
      // 瞬间拉回到中间的那一屏
      this.x = -this.screenX;
    },
    end() {
      this.transitionNum = ".5s";
      // 计算出用户滑动的距离是否超过屏幕的一半，超过的话就过渡到下一个屏幕
      let num = Math.round(
        getComputedStyle(this.$refs.mMove).transform.split(",")[4] /
          this.screenX
      );
      this.x = num * this.screenX;
    },
    move(ev) {
      this.moveX = ev.changedTouches[0].pageX - this.disX;
      this.x = -this.screenX + this.moveX; //-this.screenX 是第一屏的宽度
    },
  },
};
</script>
<style scoped>
/* 顶部标题样式 start */
.nav {
}
.nav ul {
  width: 60vw;
  margin: 0 auto;
  display: flex;
  border: 1px solid blueviolet;
  border-radius: 5px;
}
.nav li {
  flex: 1;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: blueviolet;
}
.nav li.active {
  color: #ffffff;
  background: blueviolet;
}
/* 顶部标题样式 end */
/* 顶部周几标题样式 start */
.week ul {
  width: 90vw;
  display: flex;
  margin: 0 auto;
}
.week ul li {
  flex: 1;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
}
/* 顶部周几标题样式 end */
/* 主体样式start */
.main {
  width: 100vw;
  position: relative;
  height: 240px;
  float: left;
}
.m-bg{
  position: absolute;
  left:0;
  top:0;
  height:240px;
  width:100%;
  text-align: center;
  line-height: 240px;
  font-size:200px;
  color:cornflowerblue;
  opacity: .1;
}
/* ul总 */
.days {
  width: 90%;
  margin: 0 auto;
  /* display: flex; */
}
.days li {
  width: calc(100% / 7);
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  position: relative;
  float: left;
}
/* 表格的底部边框 */
.days li ::before {
  content: "";
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background: #cccccc;
  height: 1px;
}
.days li span {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  display: inline-block;
  /* background: chartreuse; */
  border-radius: 100%;
  font-size: 12px;
}
/* 今天的样式 */
.today {
  background: violet;
  color: #ffffff;
}
/* 不是本月的样式 */
.past {
  color: #cccccc;
}
/* 主体样式end*/
/* 主题容器样式start */
.main-move {
  width: 300vw;
}
/* 主题容器样式end */
</style>
