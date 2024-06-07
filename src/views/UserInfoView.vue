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
        userId: '',
        name: '',
        phone: '',
        idCard: '',
        userWorkDtoList: [{
          id: '',
          roleId: '',
          departmentId: '',
          postId: '',
          status: ''
        }]
      },
      userLocation: [],
      userWork: [],
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    this.selectUser()
  },
  methods: {
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
    async leaveOptional() {
      const res = await myAxios.post('/leave/user_leave', null, {
        params: {
          id: this.userId
        }
      })
      if (res.data) {
        this.users = res.data
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
    async cancelLeaveOptional() {
      const res = await myAxios.post('/leave/user_cancelled', null, {
        params: {
          id: this.userId
        }
      })
      if (res.data) {
        this.users = res.data
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
    }
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
    <el-descriptions
        title="用户工作信息"
        column="3"
        border
    >
      <!--      <template #extra>-->
      <!--        <el-button type="success" @click="leaveOptional">请假</el-button>-->
      <!--        <el-button type="danger" @click="cancelLeaveOptional">销假</el-button>-->
      <!--      </template>-->
      <el-descriptions-item v-for="(item, index) in users.userWorkDtoList" :key="index">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user/>
            </el-icon>
            姓名
          </div>
        </template>
        {{ item.roleId }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>

</style>
