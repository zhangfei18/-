<template>
  <div class="boll">
    <div id="container" class="container" ref="container">
      <div v-for="(circles,index) in circlesArr" :key="index">
        <div
          @click="growCircle(index,index1)"
          v-for="(circle,index1) in circles"
          :key="index1"
          class="circle"
        ></div>
      </div>
    </div>
    <p>{{circlesArr}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Boll",
  data() {
    return {
      circlesArr: [],
      rows: 15,
      cols: 15
    };
  },
  created() {
    for (let i = 0; i < this.cols; i++) {
      this.circlesArr[i] = [];
      for (let j = 0; j < this.rows; j++) {
        // const circle = document.createElement("div");
        // circle.classList.add("circle");
        // console.log(circle);
        // this.$refs.container.appendChild(circle);
        this.circlesArr[i].push(j);
      }
    }
    console.log(this.circlesArr);
  },
  methods: {
    growCircle(j, i) {
      if (this.circlesArr[i] && this.circlesArr[i][j]) {
        if (!this.circlesArr[i][j].classList.contains("grow")) {
          this.circlesArr[i][j].classList.add("grow");
          setTimeout(() => {
            growCircle(i - 1, j);
            growCircle(i + 1, j);
            growCircle(i, j - 1);
            growCircle(i, j + 1);
          }, 100);
          setTimeout(() => {
            this.circlesArr[i][j].classList.remove("grow");
          }, 300);
        }
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
.boll {
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 450px;
  height: 450px;
}
.circle {
  background-color: #fff;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  cursor: pointer;
  margin: 8px;
  transform: scale(1);
  transition: transform 0.3s linear;
}
.circle.grow {
  transform: scale(2);
}
</style>