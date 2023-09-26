<script setup>
import { ref,onMounted } from 'vue'
import { getAllAndroidPlugins } from '../utils/request.js'
import { useStore } from '@/stores/counter'

const store = useStore()
const input = ref('')
const loading = ref(false)
const step = ref(1)
const code = ref('')
const userInfo = ref()
function clickHandle() {
  step.value = 2
  window.sessionStorage.setItem('count', 2)
  window.open('https://github.com/login/oauth/authorize?client_id=152c6b12ae755df02796')

  code.value = window.location.search.slice(6)
}
async function nextHandle() {
  alert(input.value)
  store.setUserName({name:input.value})
  window.sessionStorage.setItem('count', 3)
  step.value = 3
}
function MintHandle() {
  window.sessionStorage.setItem('count', 1)
  this.$router.push('/HackerProfile');
  step.value = 1
}
function init() {
  step.value = window.sessionStorage.getItem('count')
}
function getUserInfo() {
  console.log(code.value)
   getAllAndroidPlugins(code.value).then(res=>{
    console.log(res)
    userInfo.value = res

   }
   )
}
onMounted(() => {
  init()
  if (window.sessionStorage.getItem('count') == 2){
    code.value = window.location.search.slice(6)
    getUserInfo()
  }
})

</script>


<template>
  <div class="common-layout" v-loading="loading">
    <el-container class="container">
      <el-card class="box-card">
        <div class="title">Sol Hack ID</div>
        <div class="step_one" v-if="step == 1">
          <div class="tips_one">Link My Github</div>
          <img
            src="../../public/GitHub_Invertocat_Logo 1.png"
            alt="Githup.png"
            class="github"
            @click="clickHandle"
          />
        </div>
        <div class="step_two" v-else-if="step == 2">
          <div class="tips_two">Your Nick Name</div>
          <el-input v-model="input" placeholder="Please input" />
          <el-text tag="ins" @click="nextHandle">Next</el-text>
        </div>
        <div class="step_three" v-else>
          <router-link to="/HackerProfile">
            <el-text tag="ins" class="tips_three" @click="MintHandle"
              >Claim Hacker SBT On SOLANA</el-text
            >
          </router-link>
        </div>
        <div class="footer">STEP {{ step }}/3</div>
      </el-card>
      <el-footer> </el-footer>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../public/Events.png');
  background-size: contain;
}
.box-card {
  margin: auto;
  width: 43.1875rem;
  height: 28.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.875rem;
  // justify-content: center;
  text-align: center;
  .el-card__body {
    height: 28.625rem;
  }
  .title {
    margin: auto;
    width: 12rem;
    font-size: 1.75rem;
    color: black;
    font-weight: 700;
    margin-top: 1.25rem;
    text-justify: distribute-all-lines;
    text-align-last: justify;
  }
  .step_one,
  .step_two,
  .step_three {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3.25rem;
    width: 12rem;
    height: 14.125rem;
  }
  .step_two {
    width: 34rem;
    margin-top: 0rem;
  }
  .tips_one,
  .tips_two,
  .tips_three {
    width: 11rem;
    font-size: 1rem;
    color: #868484;
    margin-bottom: 1.75rem;
    font-weight: 500;
    text-justify: distribute-all-lines;
    text-align-last: justify;
  }
  .tips_three {
    width: 24rem;
  }
  .github {
    font-size: 1.75rem;
    &:hover {
      cursor: pointer;
    }
  }
  .el-text {
    margin-top: 0.75rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  .footer {
    // position: absolute;
    color: #868484;
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 1.25rem;
  }
}
</style>
