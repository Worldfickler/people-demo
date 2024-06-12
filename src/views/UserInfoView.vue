<script>
import {ElMessage} from "element-plus";
import {
  CreditCard, FolderOpened,
  Iphone,
  Location,
  OfficeBuilding, Open, Postcard,
  Tickets,
  User, UserFilled,
} from '@element-plus/icons-vue';
import myAxios from "@/utils/myAxios.js";

export default {
  name: "UserInfo",
  components: {FolderOpened, Postcard, Open, UserFilled, CreditCard, OfficeBuilding, Tickets, Iphone, User, Location},
  data() {
    return {
      userId: '',
      users: {
        userId: '1',
        name: '1',
        phone: '1',
        idCard: '1',
        userWorkDtoList: [{
          id: '1',
          roleId: '0',
          departmentId: '0',
          postId: '0',
          status: '0'
        }]
      },
      userLocation: [],
      userWork: [],
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
      statusList: [
        {
          id: 0,
          statusName: '未请假'
        },
        {
          id: 1,
          statusName: '待审批'
        },
        {
          id: 2,
          statusName: '请假中'
        }],
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    this.selectUser()
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
    iconStyle() {
      const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
      }
      return {
        marginRight: marginMap[size.value] || marginMap.default,
      }
    },
    /**
     * 获取用户基本信息
     * @returns {Promise<void>}
     */
    async selectUser() {
      await this.getRoles()
      await this.getDepartments()
      await this.getPosts()
      const res = await myAxios.get('/user/select', {
        params: {
          userId: this.userId
        }
      })
      if (res.code === 0) {
        this.users = res.data
        ElMessage({
          message: '用户信息查询成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '用户信息查询失败',
          type: 'error',
        });
      }
    },
    /**
     * 请假
     * @returns {Promise<void>}
     */
    async askForLeave(userId, roleId) {
      const res = await myAxios.post('/leave/askforleave', null, {
        params: {
          userId: userId,
          roleId: roleId,
        }
      })
      if (res.code === 0) {
        await this.selectUser()
        ElMessage({
          message: '请假成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '请假失败',
          type: 'error',
        });
      }
    },
    /**
     * 销假
     * @returns {Promise<void>}
     */
    async cancelLeave(userId, roleId, status) {
      const res = await myAxios.post('/leave/cancelleave', null, {
        params: {
          userId: userId,
          roleId: roleId,
          status: status,
        }
      })
      if (res.code === 0) {
        await this.selectUser()
        ElMessage({
          message: '销假成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '销假失败',
          type: 'error',
        });
      }
    },
  }
}
</script>

<template>
  <div style="width: 1200px">
    <el-descriptions
        title="用户基本信息"
        column="3"
        border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user/>
            </el-icon>
            姓名
          </div>
        </template>
        {{ users.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            手机号
          </div>
        </template>
        {{ users.phone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <CreditCard/>
            </el-icon>
            身份证
          </div>
        </template>
        {{ users.idCard }}
      </el-descriptions-item>
    </el-descriptions>
    <br>
    <span style="font-weight: bold;">用户工作信息</span>
    <el-descriptions
        title=""
        column="3"
        border
        v-for="(item, index) in users.userWorkDtoList" :key="index"
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location/>
            </el-icon>
            角色
          </div>
        </template>
        <span v-if="roles !== null">
<!--          {{ item.roleId }}-->
          <!--          {{ roles }}-->
          {{ (roles.find(role => role.id === item.roleId) || {}).roleName || 'Unknown Role' }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets/>
            </el-icon>
            所在部门/工作位置
          </div>
        </template>
        <span v-if="departments != null">
<!--          {{ item.departmentId }}-->
          <!--          {{ departments }}-->
          {{
            (departments.find(department => department.id === item.departmentId) || {}).departmentName || 'Unknown Department'
          }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building/>
            </el-icon>
            职位/岗位/工种
          </div>
        </template>
        <span v-if="posts != null">
<!--          {{ item.postId }}-->
          <!--          {{ posts }}-->
          {{ (posts.find(post => post.id === item.postId) || {}).postName || 'Unknown Post' }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <open/>
            </el-icon>
            状态
          </div>
        </template>
        <span v-if="statusList !== null">
<!--          {{ item.status }}-->
<!--          {{ statusList }}-->
          {{ (statusList.find(statu => statu.id === item.status) || {}).statusName || 'Unknown Status' }}
        </span>
        <span v-if="item.status === 0">
          <el-button type="success" style="margin-left: 20px" @click="askForLeave(userId, item.roleId)">请假</el-button>
        </span>
        <span v-else-if="item.status === 1">
          <el-button type="primary" style="margin-left: 20px"
                     @click="cancelLeave(userId, item.roleId, item.status)">取消</el-button>
        </span>
        <span v-else-if="item.status === 2">
          <el-button type="warning" style="margin-left: 20px"
                     @click="cancelLeave(userId, item.roleId, item.status)">销假</el-button>
        </span>
        <span v-else>
          <el-button type="danger" style="margin-left: 20px">未知状态</el-button>
        </span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>

</style>
