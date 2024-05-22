<script>
import axios from "axios";
import {ElMessage} from 'element-plus'

export default {
  name: "UserView",
  data() {
    return {
      formLabelAlign: {
        name: '',
        phone: '',
        idCard: '',
        role: '',
      }
    };
  },
  methods: {
    getDate() {
      console.log(this.formLabelAlign);
      const res = axios.post('http://localhost:8080/user/insert', this.formLabelAlign);
      console.log(res);
      alert(res)
      alert(res.status)
      if (res.data === true) {
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      }
    },
  }
}
</script>

<template>
  <div id="userView">
    <el-form
        label-position="left"
        label-width="auto"
        :model="formLabelAlign"
        style="max-width: 600px"
    >
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.phone" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="formLabelAlign.idCard" placeholder="请输入身份证"/>
      </el-form-item>
      <el-form-item label="角色">
        <el-select
            v-model="formLabelAlign.role"
            placeholder="请选择角色"
            clearable
        >
          <el-option label="建设人员" value="1"/>
          <el-option label="管理人员" value="2"/>
          <el-option label="工作人员" value="3"/>
          <el-option label="其他人员" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDate">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>
