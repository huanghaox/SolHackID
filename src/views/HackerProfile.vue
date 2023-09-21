<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PopupForm from '../components/PopupForm.vue'
let options = null
const chart = ref(null)
let myChart = null
const dialogVisible = ref(false)
const skills = [
  { language: 'Rust', nums: 1 },
  { language: 'Solidity', nums: 1 },
  { language: 'AWS', nums: 1 },
  { language: 'Android', nums: 1 },
  { language: 'Data Mining', nums: 1 }
]

function initChart() {
  // 使用ECharts初始化图表
  const myChart = echarts.init(chart.value)
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
    const width = chart.value.clientWidth
    const height = chart.value.clientHeight
    myChart.resize({ width, height })
  }
}
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
  resizeChart()
})
onBeforeUnmount(() => {
  // 在组件销毁前销毁图表
  if (chart.value) {
    chart.value.dispose()
  }
})
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
              <div class="skills">
                <p class="skills_title">Skills</p>
              </div>

              <div v-for="(item, index) in skills" :key="index" class="skills">
                <div class="skills_bg"></div>
                <div class="skills_info">
                  <p>{{ item.language }}</p>
                  <p>{{ item.nums }} Reops</p>
                </div>
              </div>
              <div class="Highlights_module">
                <div class="Highlights_module_info">
                  <p>240</p>
                  <p>Commits</p>
                </div>
                <div class="Highlights_module_info">
                  <p>240</p>
                  <p>Stars</p>
                </div>
                <div class="Highlights_module_info">
                  <p>240</p>
                  <p>Forks</p>
                </div>
              </div>
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
.container {
  display: flex;
}
.el-aside {
  flex: 1;
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
    top: 21rem;
    left: 30rem;
    border: 0.5rem #fff solid;
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
  .devPro {
    display: flex;
    flex-direction: column;
    height: 18.75rem;
    border: 0.15rem #8c8c8c solid;
    border-radius: 1rem;
    margin: 4rem;
    padding: 1rem;

    &_footer {
      display: flex;
      flex: 1;
      &_left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 10px;
        padding: 10px 0;
        .percent_info {
          border: 1px #8c8c8c solid;
          border-radius: 10%;
          height: 4rem;
          padding: 0.5rem;
          font-size: 1rem;
        }
      }
      &_right {
        flex: 1;
        width: 100%;
      }
    }
  }
  .Highlights {
    display: flex;
    height: 27rem;
    border: 0.15rem #8c8c8c solid;
    border-radius: 1rem;
    margin: 4rem;
    padding: 1rem;
    &_title {
      margin-bottom: 1rem;
    }
    &_left {
      flex: 2;
      .skills {
        width: 30rem;
        border-radius: 0.9375rem;
        background: #d9d9d9;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        &_title {
          padding-left: 1rem;
        }
        &_bg {
          width: 1.25rem;
          height: 1.25rem;
          margin:0 1rem;
          // border-radius: 50%;
          background-color: #00ce65;
        }
        &_info {
          display: flex;
          flex: 1;
          justify-content: space-between;
          padding-right: 1rem;
        }
      }
      
    }
    &_module{
        display: flex;
        padding-right: 3rem;
        margin-top: 2rem;
        &_info{
          flex: 1;
          width: 7.5rem;
          height: 5rem;
          border: 1px #8c8c8c solid;
          border-radius: 10%;
          padding: 0.5rem;
          font-size: 1rem;
          margin-right: 2rem;
          text-align: center;
        }
      }
    &_right {
      flex: 1.5;
    }
  }
}
</style>
