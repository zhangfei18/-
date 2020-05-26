<template>
  <div>
    <!-- 日历标题 -->
      <nav class="nav">
          <ul>
            <li>列表</li>
            <li class="active">日</li>
            <li>月</li>
          </ul>
      </nav>
      <!-- 周几标题列表 -->
      <div class="m-h">
        <ul class="m-header">
          <li v-for="(val,key) in week" :key="key">
            {{val}}
          </li>
        </ul>
      </div>
      <!-- 主题区域 -->
      <div class="m-content">
        <div 
          class="m-move" 
          @touchstart = "start"
          @touchmove = "move"
          @touchend = "end"
          :style="{transform:`translateX(${x}px)`,transition:transitionNum}"
          ref="mMove"
        >
          <div class="m-content-box">
            <div class="m-bg">{{month===0?12:month}}</div>
            <ul class="days">
              <li v-for="(val,key) in prevDays" :key="key" class="m-row">
                <span
                  :class="[
                    {
                      today:val.getDate() === day
                    },
                    {
                      past:!isCurrentMonthDay(val,month-1)
                    }
                  ]"
                >{{val | getday }}</span>
              </li>
            </ul>
          </div>
          <div class="m-content-box">
            <div class="m-bg">{{month+1}}</div>
            <ul class="days">
              <li v-for="(val,key) in days" :key="key" class="m-row">
                <span
                  :class="[
                    {
                      today:val.getDate() === day
                    },
                    {
                      past:!isCurrentMonthDay(val,month)
                    }
                  ]"
                  @click="click(val)"
                >{{val | getday }}</span>
              </li>
            </ul>
          </div>
          <div class="m-content-box">
            <div class="m-bg">{{month+2===13?1:month+2}}</div>
            <ul class="days">
              <li v-for="(val,key) in lastDays" :key="key" class="m-row">
                <span
                  :class="[
                    {
                      today:val.getDate() === day
                    },
                    {
                      past:!isCurrentMonthDay(val,month+1)
                    }
                  ]"
                >{{val | getday }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
/**难点解析
 * 1.怎么将本月的天数获取到并填充到格子里
 *  获取到getYearMonthDay+getDays
 * 2.确定格子里面的天数是不是本月的天数-是的话字体颜色是黑色，不是的话颜色是灰色
 * 3.确定是不是今天，是的话展示‘今’字样
 * 4.实现滑动
 * 。。。。。
 */
  function getYearMonthDay(year,month,day){
    let d = new Date(...arguments); //计算出今天的时间
    let week = d.getDay();//确定这个月的第一天是周几
    /**
     * 这里解释一下：为什么要求出本月的第一天是周几呢？因为我们可以看到日历的每个月
     * 的展示都不是从本月的第一天算起的，前面都是要空着几天的，也就是上个月的几天（只不过是灰色的），
     * 因此我们要将这几天算出来拼进数组ary中，然后遍历它展示出来，而这里的一个技巧就是，本月的
     * 第一天是周几然后用这天的时间减去几就是本月日历的格子的第一天的时间，这样就可以让本月的
     * 日历的格子占满了。
     */
    let startDay = d - week * 86400000;//86400000是一天的毫秒数
    let ary = [];
    for(let i=0;i<42;i++){
      // 然后将每天的日期对象拼劲数组中
      ary.push(new Date(startDay+i*86400000))
    }
    return ary;//ary存放饿就是本月的所有格子的数据
  }
  export default {
    name:'calendar',
    // 父组件参数-----------此刻的时间time------------
    props:{
      time:{
        default:()=>{
          return new Date();
        }
      }
    },
    data(){
      return {
        week:['周日','周一','周二','周三','周四','周五','周六'],

        day:this.time.getDate(),//获取几号
        month:this.time.getMonth(),//获取月份
        year:this.time.getFullYear(),//获取年份

        days:[],//本月格子里需要展示的数据
        lastDays:[],//上一个月格子里需要展示的数据
        prevDays:[],//下一个月格子里需要展示的数据
        
        disX:0, //按下的坐标
        x:0,//实际移动的坐标
        screenX:0,//设备尺寸
        transitionNum:0,//运动的状态
        movex:0
      }
    },
    filters:{
      //将遍历到的每天的时间戳变为对应的号数-也就是这个月的几号，并判断是不是今天
      getday(val){
        //先把数组中传过来的时间获取到年月日
        let y = val.getFullYear();
        let m = val.getMonth()+1;
        let d = val.getDate();

        //再和今天进行对比
        let now = new Date;
        if(y === now.getFullYear() && m === now.getMonth()+1 && d === now.getDate()){//表示当前格子的日期是今天，返回‘今’字
          return '今';
        }
        return d;//返回对应的几号
      }
    },
    mounted(){
      // console.log(this.time)
      //初始化
      this.getDays();
      this.screenX = window.screen.width;//设备的实际宽度（注意是设备而不是屏幕）
      this.x = - this.screenX;
    },
    methods:{
      click(val){
        console.log(val);
      },
      //确定格子里的日期是否为当前月的---如果不是的话就给他字体颜色设成灰体
      isCurrentMonthDay(val,month){
        //这里可以过一会讲
        if(month === 12){
          month = 0;
        }else if(month === -1){
          month = 11;
        }
        return val.getMonth() === month;
      },
      // 获取每页的数据
      getDays(lastYear){
        // 因为我们要一块算出三个月的时间，也就是说页面中始终有三个月份展示，第一个和第三个隐藏，
        // 这样做的目的就是为了做出滑动的效果
        // 上个月
        this.prevDays = getYearMonthDay(this.year,this.month-1,1);
        // 本月
        this.days = getYearMonthDay(this.year,this.month,1);
        // 下个月
        this.lastDays = getYearMonthDay(this.year,this.month+1,1);
      },
      start(ev){
        /**
         * Touch事件:
         *  touchstart：手指触摸到一个 DOM 元素时触发。
            touchmove：手指在一个 DOM 元素上滑动时触发。
            touchend：手指从一个 DOM 元素上移开时触发。
         * 上面三个事件有分别对应三个触摸列表：
            touches：正在触摸屏幕的所有手指的一个列表。
            targetTouches：正在触摸当前 DOM 元素上的手指的一个列表。
            changedTouches：涉及当前事件的手指的一个列表。
         * 每个触摸列表都对应一个列表，里面的内容差不多：
            TouchList {0: Touch, length: 1}
            length:1
            0:Touch
              clientX:65 // 触摸点在浏览器窗口中的横坐标
              clientY:18 // 触摸点在浏览器窗口中的纵坐标
              force:1 // 触摸点压力大小
              identifier:0 // 触摸点唯一标识（ID）
              pageX:65 // 触摸点在页面中的横坐标
              pageY:18 // 触摸点在页面中的纵坐标
              radiusX:11.5 // 触摸点椭圆的水平半径
              radiusY:11.5 // 触摸点椭圆的垂直半径
              rotationAngle:0 // 旋转角度
              screenX:560 // 触摸点在屏幕中的横坐标
              screenY:175 // 触摸点在屏幕中的纵坐标
              target:div#touchLog 触摸目标
              __proto__:Touch
              __proto__:TouchList
          *那么这三个事件各自的touchs\targetTouchs\changedTouches会有差别吗
           经过检测：
           1.touchstart 事件：touches、targetTouches 和 changedTouches 是一样的。
           2.touchmove 事件：touches、targetTouches 和 changedTouches 是一样的（数据依然会有多组，原因上面也已经分析过了）。
           3.touchend 事件：当你手指离开屏幕后，也就是 touchend 事件触发时，touches、targetTouches 的 TouchList 的 length 同样为0，也就是说没有 touch 对象。
          */ 
        // console.log(ev.changedTouches,'---touchlist---')
        this.disX = ev.changedTouches[0].pageX; //点击时的坐标
        this.transitionNum = 'none'; //过渡时间为0
        console.log(getComputedStyle(this.$refs.mMove).transform,'---transform---')
        // console.log(this.screenX)
        let num = Math.round(getComputedStyle(this.$refs.mMove).transform.split(',')[4] / this.screenX);

        let d = new Date(this.year,this.month,1);//设置当前月
        

        if(Math.abs(num) === 2){ //++
                  
          d.setMonth(this.month+1);  //设置一个下个月的时间
          
        }else if(Math.abs(num) === 0){ //--
         
          d.setMonth(this.month-1);  //设置一个上个月的时间
      
        }

        this.year = d.getFullYear();
        this.month = d.getMonth();

        this.getDays();

        this.x = -this.screenX;
     
      },
      move(ev){
        //页面移动的距离 = 滑动 - 手指按下的坐标 + 屏幕的距离（因为每次滑动都是从中间开始）
        this.movex = ev.changedTouches[0].pageX - this.disX;
        this.x = - this.screenX + this.movex;
      },
      end(){
        
        this.transitionNum = '.5s';
        //最终的位置，四舍五入
        let num = Math.round(getComputedStyle(this.$refs.mMove).transform.split(',')[4] / this.screenX)
        this.x = num * this.screenX; //计算最终页面的位置
      }
    }
  }
</script>

<style scoped>

/* 日历总标题 */
.nav ul{
  width:60%;
  margin: 0 auto;
  display: flex;
  border: 1px solid cornflowerblue;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.nav ul li{
 flex: 1;
 text-align: center;
 color:cornflowerblue;
 height: 30px;
 line-height: 30px;
 font-size:14px;
}
.nav ul li.active{
  color: #fff;
  background: cornflowerblue;
}



/* 周几标题 */
.m-header{
  width: 90%;
  margin: 0 auto;
  display: flex;
  font-size:11px;
}
.m-header li{
  flex: 1;
  text-align: center;
  line-height: 18px;
}


/* 主体区域 */
.m-content{
  height:240px;
}
/* 三个盒子的容器 */
.m-move{
  width:300vw;
}
/* 每一个子盒子 */
.m-content-box{
  width:100vw;
  position:relative;
  height: 240px;
  float: left;
}
/* 背景div */
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

.days{
  width:90%;
  margin: 0 auto;
}

.m-row{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width: calc(100% / 7);
    text-align: center;
    cursor: pointer;
    position: relative;
    float: left;
}
.m-row ::before{
    content: '';
    position: absolute;
    background-color: #ccc;
    display: block;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
}
.m-row span{
  width:30px;
  height:30px;
  display:inline-block;
  line-height: 30px;
  border-radius: 100%;
}

.today{
  background: cornflowerblue;
  color:#fff;
}

.past{
  color:#ccc;
}
</style>