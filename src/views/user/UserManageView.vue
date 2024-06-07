<script>
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import myAxios from "@/utils/myAxios.js";
import {Operation} from "@element-plus/icons-vue";

export default {
  components: {Operation},
  data() {
    return {
      users: [],
      searchUserId: '',
      userInfoDialogVisible: false,
      userInfo: {
        id: '',
        name: '',
        phone: '',
        idCard: '',
        userWorkDtoList: [
          {
            roleId: '',
            departmentId: '',
            postId: ''
          }
        ]
      },
      roles: [{
        id: '',
        roleName: ''
      }],
      departments: [{
        id: '',
        departmentName: ''
      }],
      posts: [{
        id: '',
        postName: ''
      }],
      optionalDialogVisible: false,
      isLeave: false,
      leaveUserId: '',
    };
  },
  mounted() {
    this.getRoles()
    this.getPosts()
    this.getDepartments()
  },
  methods: {
    async getRoles() {
      const res = await myAxios.get('/role/list')
      if (res.code === 0) {
        this.roles = res.data;
      } else {
        ElMessage({
          message: '角色信息加载失败',
          type: 'error',
        });
      }
    },
    async getDepartments() {
      const res = await myAxios.get('/department/list')
      if (res.code === 0) {
        this.departments = res.data;
      } else {
        ElMessage({
          message: '所在部门/工作位置信息加载失败',
          type: 'error',
        });
      }
    },
    async getPosts() {
      const res = await myAxios.get('/post/list')
      if (res.code === 0) {
        this.posts = res.data;
      } else {
        ElMessage({
          message: '职位/岗位/工种信息加载失败',
          type: 'error',
        });
      }
    },
    // 查询全部
    async getDate() {
      const res = await myAxios.get('/user/selectAll')
      if (res.code === 0) {
        this.users = res.data;
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
    insertUserDialog() {
      this.userInfoDialogVisible = true
    },
    updateUserDialog(userInfo) {
      this.userInfoDialogVisible = true
      this.userInfo.id = userInfo.id
      this.userInfo.name = userInfo.name
      this.userInfo.phone = userInfo.phone
      this.userInfo.idCard = userInfo.idCard
    },
    async updateUserInfo() {
      const res = await myAxios.post('/user/update', this.userInfo);
      console.log(this.userInfo)
      if (res.data === true) {
        await this.getDate()
        this.userInfoDialogVisible = false
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
      this.resetForm();
    },
    async insertUser() {
      console.log(this.userInfo);
      const res = await myAxios.post('/user/insert', this.userInfo);
      if (res.code === 0) {
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '添加失败',
          type: 'error',
        });
      }
      this.resetForm();
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
    // 对话框关闭操作
    handleDialogClose() {
      // 清空表单内容
      this.resetForm();
    },
    // 清空表单内容
    resetForm() {
      this.userInfo = {
        id: '',
        name: '',
        phone: '',
        idCard: '',
        userWorkDtoList: [
          {
            roleId: '',
            departmentId: '',
            postId: ''
          }
        ]
      };
    },
    addWorkInfo() {
      this.userInfo.userWorkDtoList.push({
        roleId: '',
        departmentId: '',
        postId: ''
      })
    },
    deleteWorkInfo(index) {
      this.userInfo.userWorkDtoList.splice(index, 1)
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
        class="userInfo"
    >
      <el-form-item>
        <el-button type="primary" @click="getDate">查询全部</el-button>
        <el-button type="primary" @click="insertUserDialog()">新增用户</el-button>
      </el-form-item>
      <el-form-item style="margin-bottom: 10px">
        <el-input v-model.number="searchUserId" placeholder="请输入用户ID" type="text" style="width: 180px"/>
        <el-button type="primary" @click="selectUser" style="margin-left: 10px">查询</el-button>
      </el-form-item>
      <el-table :data="users" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180"/>
        <el-table-column prop="name" label="姓名" width="180"/>
        <el-table-column prop="phone" label="手机号" width="180"/>
        <el-table-column prop="idCard" label="身份证" width="180"/>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button size="small" type="success" @click="updateUserDialog(scope.row)">
              更新
            </el-button>
            <el-button size="small" type="primary" @click="optionalDialog(scope.row.id)">
              审批
            </el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">
              删除
            </el-button>
            <el-button size="small" @click="toUserInfo(scope.row.id)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--新增/更新用户信息弹窗-->
    <el-dialog
        v-model="userInfoDialogVisible"
        :title="userInfo.id ? '更新用户信息' : '新增用户信息'"
        width="800px"
        @close="handleDialogClose"
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
        <el-form-item
            v-for="(userWork, index) of userInfo.userWorkDtoList"
            :label="`工作信息-${index + 1}`"
        >
          <el-select
              style="margin-bottom: 5px"
              v-model="userWork.roleId"
              placeholder="请选择角色"
              clearable
          >
            <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
            />
          </el-select>
          <el-select
              style="margin-bottom: 5px"
              v-model="userWork.departmentId"
              placeholder="请选择工作部门/位置"
              clearable
          >
            <el-option
                v-for="item in departments"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
            />
          </el-select>
          <el-select
              style="margin-bottom: 5px"
              v-model="userWork.postId"
              placeholder="请选择岗位/部门/工种"
              clearable
          >
            <el-option
                v-for="item in posts"
                :key="item.id"
                :label="item.postName"
                :value="item.id"
            />
          </el-select>
          <el-button type="danger" @click="deleteWorkInfo(index)">删除工作信息</el-button>
        </el-form-item>
        <el-button type="success" @click="addWorkInfo">增加工作信息</el-button>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="userInfoDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="userInfo.id ? updateUserInfo : insertUser">
            {{ userInfo.id ? '更新' : '添加' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--审批弹窗-->
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
