<script>
import {ElMessage} from "element-plus";
import myAxios from "@/utils/myAxios.js";

export default {
  name: "DealUserLeave",
  data() {
    return {
      users: [{
        userId: '',
        name: '',
        phone: '',
        roleId: '',
        roleName: '',
        departmentId: '',
        departmentName: '',
        postId: '',
        postName: '',
        status: '',
        statusName: '',
      }],
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
      keyword: '',
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.searchAll(1)
  },
  methods: {
    async searchAll(status) {
      const res = await myAxios.get('/user_work/selectbystatus', {
        params: {
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage,
          status: status,
        }
      })
      if (res.code === 0) {
        await this.getRoles();
        await this.getDepartments();
        await this.getPosts();
        this.users = res.data.records;
        this.page.total = res.data.total;
        for (let i = 0; i < this.users.length; i++) {
          // this.users[i].roleId = this.roles.find(role => role.id === this.users[i].roleId)
          let roleFlag = true;
          for (let j = 0; j < this.roles.length; j++) {
            if (this.users[i].roleId === this.roles[j].id) {
              this.users[i].roleName = this.roles[j].roleName;
              roleFlag = false;
              break;
            }
          }
          if (roleFlag) {
            this.users[i].roleName = '未知';
          }
          let departmentFlag = true;
          for (let j = 0; j < this.departments.length; j++) {
            if (this.users[i].departmentId === this.departments[j].id) {
              this.users[i].departmentName = this.departments[j].departmentName;
              departmentFlag = false;
              break;
            }
          }
          if (departmentFlag) {
            this.users[i].departmentName = '未知';
          }
          let postFlag = true;
          for (let j = 0; j < this.posts.length; j++) {
            if (this.users[i].postId === this.posts[j].id) {
              this.users[i].postName = this.posts[j].postName;
              postFlag = false;
              break;
            }
          }
          if (postFlag) {
            this.users[i].postName = '未知';
          }
          if (this.users[i].status === 0) {
            this.users[i].statusName = '未请假';
          } else if (this.users[i].status === 1) {
            this.users[i].statusName = '待审批';
          } else if (this.users[i].status === 2) {
            this.users[i].statusName = '请假中';
          } else {
            this.users[i].statusName = '未知';
          }
        }
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
    async searchUser(keyword) {
      const res = await myAxios.get('/user/select', {
        params: {
          keyword: keyword
        }
      })
      if (res.data) {
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
    async dealLeave(userId, roleId, status) {
      // alert(this.leaveUserId)
      // alert(userId)
      const res = await myAxios.post('/leave/dealleave', null, {
        params: {
          userId: userId,
          roleId: roleId,
          status: status,
        }
      });
      console.log(this.userInfo)
      if (res.code === 0) {
        // await this.getDate()
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
    handlePageChange(pageNum) {
      this.page.currentPage = pageNum;
      this.searchAll(1);
    },
  }
}
</script>

<template>
  <div id="dealUserLeaveView">
    <el-form
        label-position="left"
        label-width="auto"
        style="max-width：100%"
        class="userInfo"
    >
      <el-form-item style="margin-bottom: 10px">
        <el-input v-model="keyword" placeholder="全字段模糊查询" type="text" style="width: 180px"/>
        <el-button type="primary" @click="searchUser(keyword)" style="margin-left: 10px">查询</el-button>
      </el-form-item>
      <el-table :data="users" border style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"/>
        <el-table-column prop="phone" label="手机号" width="180"/>
        <el-table-column prop="roleName" label="角色" width="180"/>
        <el-table-column prop="departmentName" label="所在部门/工作位置" width="180"/>
        <el-table-column prop="postName" label="职位/岗位/工种" width="180"/>
        <el-table-column prop="statusName" label="状态" width="180"/>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button type="success" @click="dealLeave(scope.row.userId, scope.row.roleId, 2)">同意</el-button>
            <el-button type="danger" @click="dealLeave(scope.row.userId, scope.row.roleId, 0)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          @current-change="handlePageChange"
      ></el-pagination>
    </el-form>
  </div>
</template>

<style scoped>

</style>
