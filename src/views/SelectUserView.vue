<script>
import axios from "axios";

export default {
  name: "UserView",
  data() {
    return {
      result: {
        userId: '',
        name: '',
        role: '',
        phone: '',
        idCard: '',
      },
      user: [],
    };
  },
  methods: {
    getDate() {
      axios.get('http://localhost:8080/user/select', {
        params: {
          userId: 1
        }
      })
          .then(response => {
            this.result = response.data;
            console.log("response = " + response)
            console.log("response = " + response.data)
          })
      console.log("result name = " + this.result.name)
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
