<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import { convertPermissions } from "@/utils/index"
const iconStyle = 9
const store = useUserStore()
const info: any = store.info
</script>

<template>
  <div class="info">
    <el-descriptions class="descriptions" title="个人信息" :column="3" border>
      <template #extra>
        <router-link to="/setup/setup-account"><el-button type="primary">修改信息</el-button></router-link>
      </template>
      <el-descriptions-item label="Telephone" label-align="right" align="center" class-name="descriptionsItem">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            用户名
          </div>
        </template>
        {{ info.nickname }}
      </el-descriptions-item>
      <el-descriptions-item label="Telephone" label-align="right" align="center" width="80px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Message />
            </el-icon>
            邮箱
          </div>
        </template>
        {{ info.email }}
      </el-descriptions-item>
      <el-descriptions-item label="Telephone" label-align="right" align="center">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Lock />
            </el-icon>
            角色
          </div>
        </template>
        <el-tag size="small">{{ convertPermissions(info.type) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Telephone" label-align="right" align="center">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <PictureRounded />
            </el-icon>
            头像
          </div>
        </template>
        <el-avatar shape="square" :size="60" fit="fill" :src="info.avatar" />
      </el-descriptions-item>
      <el-descriptions-item label="Telephone" label-align="right" align="center">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            用户ID
          </div>
        </template>
        {{ info.id }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">
.info {
  width: 95%;
  margin: 0 2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  overflow: hidden;

  .descriptions {
    width: 100%;
    overflow: hidden;
  }

  .cell-item {
    display: flex;
    align-items: center;
  }
}
</style>
