<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import HackerStateForm from '../components/HackerStateForm.vue'
import CreateHackerHouseForm from '../components/CreateHackerHouseForm.vue'
import ViewParticipantsForm from '../components/ViewParticipantsForm.vue'

// import { useStore } from '@/stores/counter'
// import { storeToRefs } from 'pinia'
// 可以在组件中的任意位置访问 `store` 变量 ✨
// const store = useStore()
// const { count, userInfo } = storeToRefs(store)
// const { increment } = store
let options = null
const chart = ref(null)
let myChart = null
let provider;
let isConnect = ref(false)
const skills = ref([
  { language: 'Rust', number: 1 },
  { language: 'Solidity', number: 1 },
  { language: 'AWS', number: 1 },
  { language: 'Android', number: 1 },
  { language: 'Data Mining', number: 1 }
])
const repos = ref([
  {
    date: '2023.9.1',
    options: '10 PR Merged'
  },
  {
    date: '2023.6.1',
    options: 'Owned 10 Repo'
  },
  {
    date: '2023.9.1',
    options: '10 PR Merged'
  },
  {
    date: '2023.9.1',
    options: '10 PR Merged'
  },
  {
    date: '2023.9.1',
    options: '10 PR Merged'
  }
])
// function setInfo() {
//   let newInfo = { count: '123' }
//   store.setUserInfo(newInfo)
// }
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
    grid: {
      x: 50,
      y: 25,
      x2: 30,
      y2: 35
    },
    series: [
      {
        data: [100, 400, 1600],
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
  getProvider()
  initChart()
  window.addEventListener('resize', resizeChart)
  resizeChart()
 
})
onBeforeUnmount(() => {
  // 在组件销毁前销毁图表
  if (chart.value) {
    chart.value.dispose()
  }
  logoutHandle()
})
function connectWallet() {
  getProvider()
  console.log("connectWallet",provider)
  provider.connect()
  isConnect.value = true
}
function logoutHandle() {
  console.log('logout')
  provider.disconnect();
  
  isConnect.value = false
  provider = null;
  console.log(provider)
}
function getProvider () {
  if ('phantom' in window) {
    provider = window.phantom?.solana;
    console.log(provider)
    if (provider?.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
};
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header height="4rem">
        <p class="title">Sol Hack ID</p>
        <el-popover
          placement="top-start"
          :width="100"
          trigger="hover"
          v-if="isConnect == true "
        >
        <div class="Profile">
          <el-text tag="ins" size="large">Profile</el-text>
        </div>
        <div class="LogOut" @click="logoutHandle">
          <el-text tag="ins" size="large">Log Out</el-text>
        </div>
        
          <template #reference>
            <img src="../../public/heart.png" /> 
            
          </template>
        </el-popover>
        <el-text v-if="isConnect == false" @click="connectWallet()"  tag="ins" size="large">Connect Wallet</el-text>
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
            <!-- <div class="profile_completion_right">
              <el-button color="#FFD850" class="warning_view" size="large" round
                >View SBT</el-button
              >
            </div> -->
          </div>
          <div class="hackerManage">
            <!-- <el-button color="#FFD850" class="warning_Enter" size="large" round
              >Enter Hacker State</el-button
            > -->
            <HackerStateForm />
            <CreateHackerHouseForm />
            <!-- <el-button color="#FFD850" class="warning_Create" size="large" round
              >Create Hacker House</el-button
            > -->
            <ViewParticipantsForm />
            <!-- <el-button color="#FFD850" class="warning_Manage" size="large" round
              >Manage HH</el-button> -->
          </div>
          <div class="devPro">
            <p class="devPro_title">Web3 Developer Proficiency</p>
            <p class="devPro_percent">89/100</p>
            <div class="devPro_footer">
              <div class="devPro_footer_left">
                <div class="percent_info">
                  <p>24%</p>
                  <p>Ranking</p>
                </div>
                <div class="percent_info">
                  <p>10</p>
                  <p>Repos</p>
                </div>
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

              <div v-for="(item, index) in skills" :key="index" class="skills_item">
                <div class="skills_bg"></div>
                <div class="skills_info">
                  <p>{{ item.language }}</p>
                  <p>{{ item.number }} Reops</p>
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
              <div>
                <div v-for="(item, index) in repos" :key="index" class="Highlights_right_repos">
                  <p>{{ item.date }}</p>
                  <p>{{ item.options }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="History">
            <div class="History_header">
              <p class="History_title">Hackathon History</p>
              <div class="History_add">
                <img src="../../public/add.png" class="icon-add" alt="" />
              </div>
            </div>
            <div class="History_info">
              <div class="History_item">
                <p>Moonshot Web 3.0 Hackathon</p>
                <p>2023.6 - 2023.8</p>
                <p>1st in Defi Track</p>
              </div>
              <div class="History_item">
                <p>Moonshot Web 3.0 Hackathon</p>
                <p>2023.6 - 2023.8</p>
                <p>1st in Defi Track</p>
              </div>
              <div class="History_item">
                <p>Moonshot Web 3.0 Hackathon</p>
                <p>2023.6 - 2023.8</p>
                <p>1st in Defi Track</p>
              </div>
            </div>
          </div>
        </el-main>
        <el-aside></el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.el-popover{
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  & .el-text{
    cursor: pointer;
  }
  .Profile{
    padding-left: .5rem;
    margin-bottom: 1rem;
  }
  .LogOut{
    padding-left: .5rem;
  }
}
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
  & .el-text{
    color: #fff;
    &:hover{
      cursor: pointer;
    }
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
    margin: 2rem 4rem;
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
          text-align: center;
        }
      }
      &_right {
        flex: 1;
        width: 100%;
        height: 100%;
      }
    }
  }
  .Highlights {
    display: flex;
    height: 27rem;
    border: 0.15rem #8c8c8c solid;
    border-radius: 1rem;
    margin: 2rem 4rem;
    padding: 1rem;
    &_title {
      margin-bottom: 1rem;
    }
    &_left {
      flex: 2;
      .skills,
      .skills_item {
        width: 90%;
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
          margin: 0 1rem;
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
      .skills {
        margin-bottom: 1.5rem;
      }
    }
    &_module {
      display: flex;
      padding-right: 3rem;
      margin-top: 1rem;
      &_info {
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
      padding-left: 4rem;
      &_repos {
        border-left: 0.2rem #8c8c8c solid;
        margin-bottom: 1rem;
        padding-left: 3rem;
        &:hover {
          cursor: pointer;
          box-shadow: 0 0 5px #8c8c8c;
        }
      }
    }
  }
  .History {
    display: flex;
    flex-direction: column;
    height: 30rem;
    border: 0.15rem #8c8c8c solid;
    border-radius: 1rem;
    margin: 2rem 4rem;
    padding: 1.5rem;
    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      &_title {
        font-size: 2rem;
        font-weight: bolder;
      }
    }
    &_add {
      width: 1.5rem;
      height: 1.5rem;
      &:hover {
        cursor: pointer;
      }
      .icon-add {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    &_info {
      margin-left: 2rem;
    }
    &_item {
      height: 7.3125rem;
      border-left: 0.2rem #8c8c8c solid;
      padding: 0.5rem 2rem;
      margin-bottom: 1rem;
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #8c8c8c;
      }
    }
  }
}
</style>
