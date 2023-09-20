<script setup>



</script>

<template>
  <div class="register">
    <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
  </div>
</template>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>