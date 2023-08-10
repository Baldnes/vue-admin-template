<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入职位名称" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="success" size="default" icon="Plus" @click="addRole">
      添加职位
    </el-button>
    <el-table style="margin: 10px 0" border :data="allRole">
      <el-table-column
        label="#"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        label="id"
        width="100"
        align="center"
        prop="id"
      ></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #="{ row }">
          <el-button
            type="success"
            size="small"
            icon="User"
            @click="setPermisstion(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.roleName}?`"
            width="260px"
            @confirm="removeRole(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="true"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasRole"
      @size-change="sizeChange"
    />
    <el-dialog
      v-model="dialogFormVisible"
      :title="roleParams.id ? '更新职位' : '添加职位'"
    >
      <el-form :model="roleParams" :rules="rules" ref="form">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请输入职位名称"
            v-model="roleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false" type="warning">
            取消
          </el-button>
          <el-button type="success" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--    分配职位-->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <span>
          注：按钮太多，只做了用户管理与品牌管理的添加权限，如拿到代码想完善按钮权限（请在每个页面上的按钮添加全局自定义指令v-has="`后端返回按钮标识`"）
        </span>
        <div>
          <el-tree
            :data="menuArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectArr"
            :props="defaultProps"
            ref="tree"
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false" type="warning">取消</el-button>
          <el-button type="success" @click="handler">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermisstion,
} from '@/api/acl/rule'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/rule/type.ts'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'

let settingStore = useLayOutSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let keyword = ref<string>('')
let allRole = ref<Records>([])
let total = ref<number>(0)
let dialogFormVisible = ref<boolean>(false)
let roleParams = reactive<RoleData>({
  roleName: '',
})
//获取form组件实例
let form = ref<any>()
let drawer = ref<boolean>(false)
let menuArr = ref<MenuList>([])
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])
let tree = ref<any>()
// @ts-ignore
const getHasRole = async (pager = 1) => {
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    allRole.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  getHasRole()
})
const sizeChange = () => {
  getHasRole()
}
//搜索按钮的回调
const search = () => {
  //再次发请求根据关键字
  getHasRole()
  keyword.value = ''
}
//重置按钮的回调
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
const addRole = () => {
  dialogFormVisible.value = true
  //清空数据
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
const updateRole = (row: RoleData) => {
  dialogFormVisible.value = true
  Object.assign(roleParams, row)
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
// @ts-ignore
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称至少两位'))
  }
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
const save = async () => {
  //表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
  await form.value.validate()
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    //提示文字
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    //对话框显示
    dialogFormVisible.value = false
    //再次获取全部的已有的职位
    getHasRole(roleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新失败' : '添加失败',
    })
    //对话框显示
    dialogFormVisible.value = false
  }
}
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
const setPermisstion = async (row: RoleData) => {
  drawer.value = true
  Object.assign(roleParams, row)
  let result: MenuResponseData = await reqAllMenuList(roleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

const defaultProps = {
  children: 'children',
  label: 'name',
}
const handler = async () => {
  const roleId = roleParams.id as number
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  let permisstionId = arr.concat(arr1)
  let result: any = await reqSetPermisstion(roleId, permisstionId)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    window.location.reload()
  } else {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'error', message: '分配权限失败' })
  }
}
//删除已有的职位
const removeRole = async (id: number) => {
  let result: any = await reqRemoveRole(id)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '删除成功' })
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({ type: 'success', message: '删除失败' })
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
