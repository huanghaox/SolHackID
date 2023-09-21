<template>
  <el-button round @click="dialogFormVisible = true" color="#FFD850"   size="large">
    Enter Hacker State
  </el-button>
  
  <el-dialog v-model="dialogFormVisible" title="Hacker House Information" class="dialog" width="35%">
    <el-form :model="form" label-position="left">
      <el-form-item label="Hacker House Name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Activity time" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          
        />
      </el-form-item>
      <el-form-item label="city" :label-width="formLabelWidth">
        <el-input v-model="form.city" autocomplete="off" />
      </el-form-item>
      <el-form-item label="country" :label-width="formLabelWidth">
        <el-input v-model="form.country" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Hacker House Info" prop="desc">
      <el-input v-model="form.info" type="textarea" />
    </el-form-item>
    <el-form-item label="Requirement" prop="desc">
      <el-input v-model="form.requirement" type="textarea" />
    </el-form-item>
    <el-upload
    v-model:file-list="form.fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-text tag="ins" size="large">Upload 3 Image of the Environment</el-text>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
    </el-form>
    <el-text tag="ins" size="large" @click="submit">submit</el-text>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit"> Confirm </el-button>
      </span>
    </template>-->
  </el-dialog>

</template>

<script setup>
import { reactive, ref } from 'vue'
import { getAllAndroidPlugins } from '../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  city: '',
  country: '',
  date: '',
  info: '',
  requirement: '',
  fileList:[]
})
function submit() {
  console.log(form)
  getAllAndroidPlugins()
  dialogFormVisible.value = false
}

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed= (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove = (uploadFile) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>

<style scoped>
:deep(.el-dialog){
  width: 35%;
}
.dialog{
  width: 35% !important;
}
.el-form-item {
  flex-direction: column;
}
.el-form-item__label{
  justify-content: start ;
  margin-bottom: 1rem;
}
.el-button {
  color: #000;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
