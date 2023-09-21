<template>
    <el-button round @click="dialogFormVisible = true" color="#FFD850"   size="large">
      View SBT
    </el-button>
    
    <el-dialog v-model="dialogFormVisible" title="View Participants" class="dialog" width="35%">
        <div class="History">
            <div class="History_info">
              <div class="History_item">
                <el-text size="large">Simon</el-text>
                <p>Email: Simon@gmail.com</p>
                <p>Telegram Simon2022</p>
                <el-text tag="ins">VIew Profile</el-text>
              </div>

              <div class="History_item">
                <el-text size="large">Charles</el-text>
                <p>Email: Simon@gmail.com</p>
                <p>Telegram Simon2022</p>
                <el-text tag="ins">VIew Profile</el-text>
              </div>
            </div>
          </div>
    </el-dialog>
  
  </template>
  
  <script setup>
  import { ref } from 'vue'
//   import { getAllAndroidPlugins } from '../utils/request'

  const dialogFormVisible = ref(false)

  </script>
  
  <style lang="less" scoped>
.History {
    display: flex;
    flex-direction: column;
    padding:0 1.5rem;
    &_info {
    }
    &_item {
      border-left: 0.2rem #8c8c8c solid;
      padding: 0.5rem 2rem;
      margin-bottom: 1rem;
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #8c8c8c;
      }
    }
  }
 
  </style>
  