<script setup>
import * as echarts from 'echarts'
import { ref,onMounted,onBeforeUnmount } from 'vue'
import PopupForm from '../components/PopupForm.vue';
let options = null
const chart = ref(null);
let myChart = null;
const dialogVisible = ref(false);
function initChart() {
  // 使用ECharts初始化图表
  const myChart = echarts.init(chart.value);
  // 在这里设置你的图表配置和数据
  options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [100, 200, 400],
        type: 'line',
        smooth: true
      }
    ]
  }

  // 使用配置项设置图表
  myChart.setOption(options)
}
function resizeChart() {
  if (myChart && chart.value) {
    // 通过获取容器的宽度和高度来设置图表的大小
    const width = chart.value.clientWidth;
    const height = chart.value.clientHeight;
    myChart.resize({ width, height });
  }
}
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart);
  resizeChart();
})
onBeforeUnmount(() => {
  // 在组件销毁前销毁图表
  if (chart.value) {
    chart.value.dispose();
  }
});
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header height="65px">
        <p class="title">Sol Hack ID</p>
        <img src="../../public/heart.png" />
      </el-header>
      <el-container class="container"> 
        <el-aside></el-aside>
        <el-main>
          <div class="profile_bg">
            <img src="../../public/Rectangle.png" alt="" />
          </div>
          <div class="profile_avatar">
            <img src="../../public/Ellipse.png" alt="" />
          </div>

          <div class="profile_completion">
            <div class="profile_completion_left">
              <p class="nick_name">Simon</p>
              <p>profile_completion</p>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
            </div>
            <div class="profile_completion_right">
              <el-button type="warning" class="warning_view" size="large" round>View SBT</el-button>
            </div>
          </div>
          <div class="hackerManage">
            <!-- <el-button type="warning" class="warning_Enter" size="large" round
              >Enter Hacker State</el-button
            > -->
            <PopupForm v-model="dialogVisible" />
            <el-button type="warning" class="warning_Create" size="large" round
              >Create Hacker House</el-button
            >
            <el-button type="warning" class="warning_Manage" size="large" round
              >Manage HH</el-button
            >
          </div>
          <div class="devPro">
            <p class="devPro_title">Web3 Developer Proficiency</p>
            <p class="devPro_percent">89/100</p>
            <div class="devPro_footer">
              <div class="devPro_footer_left">
                <div class="percent_info">24% Ranking</div>
                <div class="percent_info">10 Repos</div>
              </div>
              <div class="devPro_footer_right" ref="chart"></div>
            </div>
          </div>
          <div class="Highlights">
            <div class="Highlights_left">
              <p class="Highlights_title">Github Highlights</p>
            </div>
            <div class="Highlights_right">

            </div>
          </div>
        </el-main>
        <el-aside></el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.el-button {
  color: #000;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  .title {
    font-size: 2rem;
    color: #fff;
  }
  & img {
    width: 3rem;
    height: 3rem;
  }
}
.container{
  display: flex;

}
.el-aside {
  flex:1;
}
.el-main {
  flex: 3;
  padding: 0;
  min-height: 50rem;
  .profile_bg {
    flex: 1;
    height: 20rem;
    overflow: hidden;
    & img {
      width: 100%;
    }
  }
  .profile_avatar {
    position: absolute;
    top: 20rem;
    left: 25rem;
    border: 0.5rem #fff solid;
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
    & img {
      width: 100%; /* 图片宽度占满容器 */
      height: 100%; /* 图片高度占满容器 */
      object-fit: cover; /* 保持图片纵横比并覆盖整个容器 */
    }
  }
  .profile_completion {
    display: flex;
    padding-left: 25rem;
    width: 100%;
    &_left {
      width: 25rem;
      .nick_name {
        font-size: 3rem;
        font-weight: bolder;
        margin-bottom: 1rem;
      }
    }
    &_right {
      display: flex;

      flex: 1;
      align-items: center;
      justify-content: center;
      .warning_view {
        width: 10rem;
      }
    }
  }
  .hackerManage {
    display: flex;
    justify-content: space-around;
    margin-top: 3rem;
    .warning_Enter {
      width: 20rem;
    }
    .warning_Create {
      width: 20rem;
    }
    .warning_Manage {
      width: 9rem;
    }
  }
  .devPro{
    display: flex;
    flex-direction: column;
    height: 18.75rem;
    border: .15rem #8C8C8C solid;
    border-radius: 1rem;
    margin: 4rem;
    padding: 1rem;

    &_footer{
      display: flex;
      flex: 1;
      &_left{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 10px;
        padding: 10px 0;
        .percent_info{
          border:1px #8C8C8C solid;
          border-radius: 10%;
          height: 4rem;
          padding: .5rem;
          font-size: 1rem;
        }
      }
      &_right{
        flex: 1;
        width: 100%;
      }
    }
  }
}
</style>
