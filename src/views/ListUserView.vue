<script>
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import myAxios from "@/utils/myAxios.js";

export default {
  name: "UserView",
  data() {
    return {
      users: [],
      searchUserId: '',
      userUpdateDialogVisible: false,
      userInfo: {
        name: '',
        phone: '',
        idCard: '',
        role: '',
      },
      optionalDialogVisible: false,
      isLeave: false,
      leaveUserId: '',
    };
  },
  methods: {
    // 查询全部
    async getDate() {
      const res = await myAxios.get('/user/selectAll')
      if (res.data) {
        const usersList = res.data;
        this.users = usersList;
        ElMessage({
          message: '查询成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '查询失败',
          type: 'error',
        });
      }
    },
    // 根据用户ID查询
    async selectUser() {
      const res = await myAxios.get('/user/select', {
        params: {
          userId: this.searchUserId
        }
      })
      // const res = await myAxios().get('/user/select')
      if (res.data) {
        this.users = [res.data]
        console.log(this.users)
        ElMessage({
          message: '查询成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '查询失败',
          type: 'error',
        });
      }
    },
    async deleteUser(userId) {
      alert(userId)
      const res = await myAxios.post('/user/delete', null, {
        params: {
          userId: userId
        }
      })
      if (res.data === true) {
        this.getDate()
        ElMessage({
          message: '查询成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '查询失败',
          type: 'error',
        });
      }
    },
    getRoleText(status) {
      switch (status) {
        case 1:
          return '建设人员';
        case 2:
          return '管理人员';
        case 3:
          return '作业人员';
        case 4:
          return '其他人员'
        default:
          return '未知人员';
      }
    },
    getRoleTagType(status) {
      switch (status) {
        case 1:
          return 'primary';
        case 2:
          return 'success';
        case 3:
          return 'warning';
        case 4:
          return 'info'
        default:
          return 'danger';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 0:
          return '未请假';
        case 1:
          return '待审批';
        case 2:
          return '请假中';
        default:
          return '未知状态';
      }
    },
    getStatusTagType(status) {
      switch (status) {
        case 0:
          return 'info';
        case 1:
          return 'success';
        case 2:
          return 'warning';
        default:
          return '';
      }
    },
    updateUserDialog(userInfo) {
      this.userUpdateDialogVisible = true
      this.userInfo = userInfo
    },
    async updateUserInfo() {
      const res = await myAxios.post('/user/update', this.userInfo);
      console.log(this.userInfo)
      if (res.data === true) {
        await this.getDate()
        this.userUpdateDialogVisible = false
        ElMessage({
          message: '更新成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '更新失败',
          type: 'error',
        });
      }
    },
    optionalDialog(userId) {
      this.optionalDialogVisible = true
      this.leaveUserId = userId
    },
    async agreeOptional() {
      alert(this.leaveUserId)
      const res = await myAxios.post('/leave/dealleave', null, {
        params: {
          id: this.leaveUserId
        }
      });
      console.log(this.userInfo)
      if (res.data === true) {
        await this.getDate()
        this.optionalDialogVisible = false
        ElMessage({
          message: '审批成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '审批失败',
          type: 'error',
        });
      }
    },
    toUserInfo(userId) {
      router.push({
        path: `/user/info/${userId}`
      })
    },
  }
}
</script>

<template>
  <div id="userView">
    <el-form
        label-position="left"
        label-width="auto"
        style="max-width：100%"
    >
      <el-form-item>
        <el-button type="primary" @click="getDate">查询全部</el-button>
      </el-form-item>
      <el-form-item style="margin-bottom: 10px">
        <el-input v-model.number="searchUserId" placeholder="请输入用户ID" type="text" style="width: 180px"/>
        <el-button type="primary" @click="selectUser" style="margin-left: 10px">查询</el-button>
      </el-form-item>
      <el-table :data="users" border style="width: 100%">
        <el-table-column prop="userId" label="用户ID" width="180"/>
        <el-table-column prop="name" label="姓名" width="180"/>
        <el-table-column prop="phone" label="手机号" width="180"/>
        <el-table-column prop="idCard" label="身份证" width="180"/>
        <el-table-column prop="role" label="角色" width="100">
          <template #default="scope">
            <el-tag :type="getRoleTagType(scope.row.role)">
              {{ getRoleText(scope.row.role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button size="small" type="success" @click="updateUserDialog(scope.row)">
              更新
            </el-button>
            <el-button size="small" type="primary" @click="optionalDialog(scope.row.userId)">
              审批
            </el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.userId)">
              删除
            </el-button>
            <el-button size="small" @click="toUserInfo(scope.row.userId)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-dialog
        v-model="userUpdateDialogVisible"
        title="更新用户信息"
        width="800px"
    >
      <el-form
          label-position="left"
          label-width="auto"
          :model="userInfo"
          style="max-width: 600px; margin: 15px"
      >
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="userInfo.idCard" placeholder="请输入身份证"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
              v-model="userInfo.role"
              placeholder="请选择角色"
              clearable
          >
            <el-option label="建设人员" value="1"/>
            <el-option label="管理人员" value="2"/>
            <el-option label="工作人员" value="3"/>
            <el-option label="其他人员" value="4"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="userUpdateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateUserInfo">
            更新
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
        v-model="optionalDialogVisible"
        title="审批"
        width="500px"
    >
      <el-button type="success" @click="agreeOptional">同意</el-button>
      <el-button type="danger" @click="refuseOptional">拒绝</el-button>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
