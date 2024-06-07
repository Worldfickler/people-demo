<script>
export default {
  name: "demo",
  methods: {
    createtest() {
      this.dialogFormVisible = true
    },
    editVisible() {
      this.dialogFormVisible = true
      this.List.forEach(ele => {
        ele.id = ''
        ele.date1 = ''
      })
    }
  }
}
</script>

<template>
  <el-dialog title="默认组"
             width="30%"
             :visible.sync="dialogFormVisible"
             ref="form">

    <div class="form"
         v-show="dialogForm"
         v-for="(item,index) in List"
         :key="index"
         style="position: relative"
    >
      <el-form :model="form"
               class="show"
               :label-position="labelPosition"
               style="text-align:left"
               prop="defaultgrup"
               ref="form"
      >
        <el-button icon="el-icon-minus"
                   @click="deleteItem(item,index)"
                   circle
                   style="font-size:10px;   position: absolute; left:1px"/>

        <el-form-item class="el-icon-remove-outline" :label-width="formWidth" prop="id">
          <el-input v-model="item.id"
                    style="width:430px"
                    autocomplete="off"/>
        </el-form-item>

        <el-form-item label="灰度" :label-width="formWidth" prop="date1">
          <el-input v-model="item.date1"
                    style="width:430px"

                    autocomplete="off"/>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="adddialog">保存</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
