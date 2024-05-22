<script>
import myAxios from "../plugins/myAxios.js";
import axios from "axios";

export default {
  name: "UserView",
  data() {
    return {
      result: [{
        userId: '',
        name: '',
        role: '',
        phone: '',
        idCard: '',
      }],
      user: [],
    };
  },
  methods: {
    getDate() {
      const res = axios.get('http://localhost:8080/user/selectAll')
          .then(response => {
            this.user = response;
            console.log("response = " + response)
          })
      console.log("result = " + this.user)
      // console.log("result = " + this.result[1].name)
    },
  }
}
</script>

<template>
  <div id="userView">
    <el-form
        label-position="left"
        label-width="auto"
        style="max-width: 600px"
    >
      <el-form-item>
        <el-button type="primary" @click="getDate">Query</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>
