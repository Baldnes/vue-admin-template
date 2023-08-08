<template>
  <el-card class="box-card">
    <!--    添加按钮-->
    <el-button type="success" size="default" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <span style="color: #8c939d; font-size: 10px; margin-left: 10px">
      注：商品id为27前（包括27）设置了不能进行更改操作，请使用后面的商品进行操作设置
    </span>
    <!--    表格-->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="商品ID"
        width="120"
        align="center"
        prop="id"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updataTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定删除${row.tmName}吗？`"
            width="250px"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference>
              <el-button icon="Delete" type="danger" size="small"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页器-->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :small="true"
      :background="true"
      layout=" prev, pager, next, jumper,->, sizes, total"
      :total="total"
      @current-change="getHasTrademark"
      @size-change="sizeChange"
    />
  </el-card>
  <!--  对话框-->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParmas.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      style="width: 80%"
      label-width="120px"
      :model="trademarkParmas"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input
          placeholder="请输入品牌名称"
          v-model="trademarkParmas.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="120px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParmas.logoUrl"
            :src="trademarkParmas.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <UploadFilled />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { reqDeleteTrademark, reqHasTrademark } from '@/api/product/trademark'
import {
  Records,
  TrademarkData,
  TrademarkResponseData,
} from '@/api/product/trademark/type.ts'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reaAddOrUpdate } from '@/api/product/trademark/index.ts'
//当前页码
let pageNo = ref<number>(1)
//当前展示几条数据
let pageSize = ref<number>(3)
//品牌总数
let total = ref<number>(0)
//品牌数据
let trademarkArr = ref<Records>([])
//控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
//收集新增数据
let trademarkParmas = reactive<TrademarkData>({
  tmName: '',
  logoUrl: '',
})
//获取组件实例
let formRef = ref()
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
const sizeChange = () => {
  getHasTrademark()
}
//添加品牌
const addTrademark = () => {
  trademarkParmas.tmName = ''
  trademarkParmas.logoUrl = ''
  trademarkParmas.id = 0
  dialogFormVisible.value = true
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
//修改品牌
const updataTrademark = (row: TrademarkData) => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  Object.assign(trademarkParmas, row)
  dialogFormVisible.value = true
}
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reaAddOrUpdate(trademarkParmas)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParmas.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParmas.id ? pageNo.value : 1)
  } else {
    dialogFormVisible.value = false
    ElMessage({
      type: 'error',
      message: trademarkParmas.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif' ||
    rawFile.type == 'image/jpg'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传的文件应小与4M')
      return false
    }
  } else {
    ElMessage.error('上传的文件务必是jpeg｜png｜gif｜jpg')
    return false
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  trademarkParmas.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
//表单校验
// @ts-ignore
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('商品品牌名称需要大于2位'))
  }
}
//品牌LOGO图片的自定义校验规则方法
// @ts-ignore
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片务必上传'))
  }
}

//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
//删除数据
const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
