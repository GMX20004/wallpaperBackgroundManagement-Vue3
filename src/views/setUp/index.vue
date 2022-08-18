<template>
  <div class="setUp" :class="store.state['displayMode']?'night':'daytime'">
    <el-scrollbar style="height: 100%">
      <el-button style="width: 100px;margin-left: 50px" type="primary" round @click="viewLogClick" :disabled="store.state['permissions']['logView']===0">{{store.state['language']===1?'View log':'查看日志'}}</el-button>
      <el-button style="width: 100px;margin-left: 50px" type="danger" round @click="exitClick">{{store.state['language']===1?'Exit':'退出'}}</el-button>
    </el-scrollbar>
    <el-dialog v-model="log.dialogVisible" v-loading="log.loading" :title="store.state['language']===1?'Log':'日志'" width="1000px">
      <el-table :data="log.tableData" stripe style="width: 100%;" height="300px">
        <el-table-column prop="userId" label="用户编号" align="center" width="100" />
        <el-table-column prop="action" label="操作" align="center" />
        <el-table-column prop="operatingTime" label="时间"  align="center"/>
        <el-table-column prop="ipAddress" label="IP地址" align="center" />
      </el-table>
      <div style="width: 100%;margin-top: 10px;display: flex">
        <span style="width: 30%;line-height: 40px">
          <span v-if="store.state['permissions']['logExport']===1" style="color: #2c95d4;cursor: pointer" @click="logExport">导出日志</span>
        </span>
        <span style="width: 70%;text-align: right">
          <el-pagination @current-change="logPage" layout="prev, pager, next" :total="log.total" />
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  reactive,
} from "vue";
import router from "@/router";
import { useStore } from  "vuex";
/**
 * 接口区
 */
interface logInterface{
  dialogVisible: boolean,
  tableData: any[],
  loading: boolean,
  page: number,
  total: number
}
/**
 * 变量区
 */
// 公共
const proxy = inject("proxy");
const { $cookies } = proxy as any;
const { $http } = proxy as any;
const { $file } = proxy as any;
const store = useStore();
const modifyIsLogTo:any = inject('modifyIsLogTo');
const modifyDialogClass:any = inject('modifyDialogClass');
// 日志
const log = reactive<logInterface>({
  dialogVisible: false,
  tableData: [],
  loading: false,
  page: 1,
  total:0
});
/**
 * 方法区
 */
// 公共
const exitClick = () => {
  $cookies.remove('uuid');
  modifyIsLogTo(0);
  modifyDialogClass(true);
  router.push({
    'path': '/'
  });
}
// 日志
const viewLogClick = () => {
  logQuery();
  log.dialogVisible=true;
}
const logQuery = () => {
  log.loading = true;
  $http.get('/admin/OperationLog',{
    params:{
      page: log.page,
      limit:10
    }
  }).then((res:any)=>{
    log.tableData = res.data['data'];
    log.total = res.data['total'];
    log.loading = false;
  });
}
const logPage = (val:number) => {
  log.page = val;
  logQuery();
}
const logExport = () => {
  $http.get('/admin/OperationLogExport',{
    responseType: 'blob',
    params:{
      uuid:$cookies.get('uuid')
    }
  }).then((res:any)=>{
    $file(res.data, '导出日志.xls');
  });
}
</script>

<style scoped lang="scss">
.setUp{
  width: 100%;
  height: 100%;
  user-select: none;
  ::v-deep .el-pagination{
    justify-content: right;
  }
}
.daytime{

}
.night{
  ::v-deep .el-input__wrapper{
    background-color: #7a7a7a;
  }
  ::v-deep .el-dialog{
    background-color: #7a7a7a;
  }
  ::v-deep .btn-prev{
    background-color: #7a7a7a;
  }
  ::v-deep .btn-next{
    background-color: #7a7a7a;
  }
  ::v-deep .number{
    background-color: #7a7a7a;
  }
  ::v-deep .more{
    background-color: #7a7a7a;
  }
  ::v-deep .number{
    background-color: #7a7a7a;
  }
}
</style>
