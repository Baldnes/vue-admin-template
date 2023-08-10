<template>
  <el-card>
    <el-table
        :data="PermisstionArr"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #="{row}">
          <el-button type="success" size="small" @click="addPermisstion(row)" :disabled="row.level == 4 ? true : false">{{row.level == 3 ? '添加功能' : '添加菜单' }}</el-button>
          <el-button size="small" type="warning" @click="updatePermisstion(row)" icon="Edit" :disabled="row.level==1?true:false">编辑</el-button>
          <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="removeMenu(row.id)">
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level == 1 ? true : false">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
      <template #default>
        <el-form :inline="true" align="center">
          <el-form-item label="名称">
            <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
          </el-form-item>
          <el-form-item label="权限值">
            <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" type="warning">取消</el-button>
        <el-button type="success" @click="save">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {reqAddOrUpdateMenu, reqAllPermisstion, reqRemoveMenu} from "@/api/acl/menu";
import type {MenuParams, Permisstion, PermisstionList, PermisstionResponseData} from "@/api/acl/menu/type.ts";
import {ElMessage} from "element-plus";
let PermisstionArr = ref<PermisstionList>([])
let dialogVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  code:"",
  level:0,
  name:"",
  pid:0
})
const getHasPermisstion = async () => {
  let result:PermisstionResponseData = await reqAllPermisstion()
  if(result.code == 200) {
    PermisstionArr.value = result.data
  }
}
onMounted( ()=>{
  getHasPermisstion()
})
const addPermisstion = (row:Permisstion) => {
  //清空数据
  Object.assign(menuData, {
    id: 0,
    "code": "",
    "level": 0,
    "name": "",
    "pid": 0,
  })
  //对话框显示出来
  dialogVisible.value = true;
  //收集新增的菜单的level数值
  menuData.level = row.level + 1;
  //给谁新增子菜单
  menuData.pid = (row.id as number);
}
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData);
  if (result.code == 200) {
    //对话框隐藏
    dialogVisible.value = false;
    //提示信息
    ElMessage({ type: 'success', message: menuData.id ? '更新成功' : '添加成功' })
    //再次获取全部最新的菜单的数据
    getHasPermisstion();
  } else {
    ElMessage({ type: 'error', message: menuData.id ? '更新失败' : '添加失败' })
  }
}
//编辑已有的菜单
const updatePermisstion = (row: Permisstion) => {
  dialogVisible.value = true;
  //点击修改按钮:收集已有的菜单的数据进行更新
  Object.assign(menuData, row);
}
//删除按钮回调
const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id);
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasPermisstion();
  } else {
    ElMessage({ type: 'error', message: '删除失败' });
  }
}
</script>

<style scoped lang="scss"></style>
