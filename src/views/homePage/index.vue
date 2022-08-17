<template>
  <div class="homePage" v-loading="mainLoading">
    <el-scrollbar style="height: 100%">
      <div class="head">
        <span>
          <b>{{store.state['language']===1?'Dashboard':'仪表板'}}</b>
          <el-input v-model="search" class="w-50 m-2" :placeholder="store.state['language']===1?'Search':'搜索'" clearable>
            <template #prefix>
              <el-icon class="el-input__icon"><Search /></el-icon>
            </template>
         </el-input>
        </span>
        <span style="justify-content: right">
          <svg style="margin-top: 5px;margin-right: 10px;cursor:pointer;" t="1657072703134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2276" width="30" height="30">
            <path d="M819.8 196.9C647.9 25 369.1 25 197.2 196.9s-171.9 450.7 0 622.7c171.9 171.9 450.7 171.9 622.7 0s171.9-450.8-0.1-622.7zM508.5 820.6c-33.6 0-61.1-27.5-61.1-61.1V569.3H257.3c-33.6 0-61.1-27.5-61.1-61.1s27.5-61.1 61.1-61.1h190.1V257c0-33.6 27.5-61.1 61.1-61.1s61.1 27.5 61.1 61.1v190.1h190.1c33.6 0 61.1 27.5 61.1 61.1s-27.5 61.1-61.1 61.1H569.6v190.1c0 33.7-27.5 61.2-61.1 61.2z" p-id="2277"></path>
          </svg>
          <span style="width: auto;margin-right: 50px">
            <el-badge is-dot />
            <svg style="margin-top: 5px;cursor:pointer;" t="1657073174491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3238" width="30" height="30">
              <path d="M192.032 631.402667V404.725333C192.032 228.330667 335.285333 85.333333 512 85.333333s319.968 142.997333 319.968 319.392v226.677334l60.608 121.013333c10.645333 21.237333-4.832 46.218667-28.618667 46.218667H160.042667c-23.786667 0-39.253333-24.981333-28.618667-46.218667l60.608-121.013333z m620.16 103.36l-40.842667-81.536a31.893333 31.893333 0 0 1-3.381333-14.282667V404.725333c0-141.12-114.602667-255.509333-255.968-255.509333S256.032 263.605333 256.032 404.725333V638.933333c0 4.96-1.162667 9.845333-3.381333 14.293334l-40.842667 81.525333h600.384z m-443.306667 152.32a31.893333 31.893333 0 0 1-4.149333-44.981334 32.032 32.032 0 0 1 45.056-4.138666A159.36 159.36 0 0 0 512 874.773333a159.36 159.36 0 0 0 102.186667-36.8 32.032 32.032 0 0 1 45.056 4.138667 31.893333 31.893333 0 0 1-4.16 44.981333A223.402667 223.402667 0 0 1 512 938.666667c-52.981333 0-103.2-18.453333-143.114667-51.594667z" p-id="3239"></path>
            </svg>
          </span>
          <el-avatar style="width: 40px;height: 40px;margin-right: 10px" :src="headPortrait+store.state['userInformation']['headPortrait']"></el-avatar>
          <b>{{store.state['userInformation']['name']}}</b>
        </span>
      </div>
      <div class="body">
        <span class="body-left">
          <div class="body-left-hierarchy1">
            <span><b>{{store.state['language']===1?'AdministratorList':'管理员列表'}}</b></span>
            <span>
              <el-dropdown trigger="click" @command="handleCommand">
                <el-button round>
                  {{store.state['language']===1?'English':'Chinese'}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="1">English</el-dropdown-item>
                    <el-dropdown-item :command="2">Chinese</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
          </div>
          <div class="body-left-hierarchy2">
            <el-scrollbar style="height: 100%">
              <div v-for="(item,i) in administratorList" tabindex="-1" class="administrator-list" :key="i" @focus="adminFocus(i)" :class="[item['isFocus']?'administratorColor':'']">
              <span style="width: 40px;margin-left: 0"><el-avatar style="width: 40px;height: 40px;margin: 10px 0 0 10px" :src="headPortrait+item['headPortrait']"/></span>
              <span style="width: 10%;"><b>{{item['name']}}</b></span>
              <span style="width: 23%;color: #8d8d8d">{{item['email']}}</span>
              <span style="width: 5%;color: #8d8d8d">{{item['sex']}}</span>
              <span style="width: 33%;color: #8d8d8d">加入时间：{{item['creationTime']}}</span>
              <span style="width: 5%;">
                <el-dropdown trigger="click" @command="(command)=>adminHandleCommand(command,item['id'],item['userId'])">
                    <svg style="margin-top: 15px;cursor:pointer;" t="1657169528823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2250" width="30" height="30">
                      <path d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z" p-id="2251"></path>
                      <path d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z" p-id="2252"></path>
                      <path d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z" p-id="2253"></path>
                    </svg>
                  <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="1">{{store.state['language']===1?'Rights management':'权限管理'}}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              </span>
            </div>
            </el-scrollbar>
          </div>
          <div class="body-left-hierarchy3">
            <span><b>{{store.state['language']===1?'Access number':'访问数'}}</b></span>
            <span style="display: flex">
              <span style="width: 50%;text-align: right;padding-right: 10px">{{store.state['language']===1?time[1]:time[0]}}</span>
            </span>
          </div>
          <div class="body-left-hierarchy4">
            <span style="width: 150px;height: 100%;">
              <div class="calendar" :class="calendarChoose===1?'background-black':''" @click="calendarClick(1)"  >
                7{{store.state['language']===1?' Day':' 天'}}
              </div>
              <div class="calendar" :class="calendarChoose===2?'background-black':''" @click="calendarClick(2)">
                12{{store.state['language']===1?' Day':' 天'}}
              </div>
              <div class="calendar" :class="calendarChoose===3?'background-black':''" @click="calendarClick(3)">
                17{{store.state['language']===1?' Day':' 天'}}
              </div>
            </span>
            <span style="margin-left: 10px;width: calc(100% - 160px);height: 100%;text-align: center;">
              <div ref="chart2" id="theLineChart" style="width: 100%;height: 100%;"></div>
            </span>
          </div>
        </span>
        <span class="body-right">
          <div class="body-right-hierarchy1"><b>{{store.state['language']===1?'Information bar':'信息栏'}}</b></div>
          <div class="body-right-hierarchy2">
            <el-scrollbar style="height: 100%">
              <div class="body-right-hierarchy2-arrange" v-for="item in arrange" :key="item.id">
                <span style="width: 40px;height: 100%;border-radius: 100%;background-color: black;text-align: center;">
                  <svg style="margin-top: 5px" t="1657871856414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4836" width="30" height="30">
                    <path d="M353.574293 184.604438c13.731746 0 24.904203-11.172457 24.904203-24.90625L378.478496 70.310346c0-13.731746-11.171434-24.90318-24.904203-24.90318s-24.904203 11.171434-24.904203 24.90318l0 89.387843C328.67009 173.430958 339.842547 184.604438 353.574293 184.604438z" p-id="4837" fill="#ffffff"></path>
                    <path d="M695.859983 184.604438c13.734816 0 24.908296-11.172457 24.908296-24.90625L720.768279 70.310346c0-13.731746-11.17348-24.90318-24.908296-24.90318-13.730723 0-24.902156 11.171434-24.902156 24.90318l0 89.387843C670.957827 173.430958 682.12926 184.604438 695.859983 184.604438z" p-id="4838" fill="#ffffff"></path>
                    <path d="M432.061878 139.91154l188.583053 0c13.734816 0 24.908296-11.172457 24.908296-24.90625 0-13.732769-11.17348-24.905226-24.908296-24.905226L432.061878 90.100064c-13.733792 0-24.908296 11.172457-24.908296 24.905226C407.153582 128.73806 418.328086 139.91154 432.061878 139.91154z" p-id="4839" fill="#ffffff"></path>
                    <path d="M251.104503 543.384801l547.225269 0c13.731746-0.001023 24.90318-12.534478 24.90318-27.939329 0-15.405875-11.171434-27.940352-24.90318-27.940352L251.104503 487.50512c-13.731746 0-24.90318 12.534478-24.90318 27.940352C226.201324 530.851347 237.372757 543.384801 251.104503 543.384801z" p-id="4840" fill="#ffffff"></path>
                    <path d="M842.801636 87.919399l-66.820871 0c-0.390903 0-0.785899 0.027629-1.181919 0.057305-0.274246 0.020466-0.548492 0.042979-0.825808 0.042979-14.709003 0-26.675546 12.009522-26.675546 26.770713 0 14.141068 11.07729 25.752524 25.036209 26.668383l0 0.630357 71.720462 0c31.384801 0 56.917314 25.53149 56.917314 56.913221l0 105.402585c0 1.446955-1.177825 2.623757-2.625804 2.623757L155.450956 307.028699c-1.445932 0-2.62171-1.176802-2.62171-2.623757L152.829246 199.00645c0-31.382754 25.529443-56.914244 56.909128-56.914244l63.565734 0 0.149403 0.004093 0.2415-0.005117 0-0.270153c14.546298-0.255827 26.342971-12.232602 26.342971-26.801413 0-14.851243-11.93482-26.932396-26.605961-26.932396-0.224104 0-0.435928-0.034792-0.647753-0.062422-0.354064-0.046049-0.795109-0.104377-1.290389-0.104377l-60.505026 0c-61.340043 0-111.243617 49.903573-111.243617 111.243617l0 635.918287c0 60.879556 49.526997 110.408599 110.403482 110.408599l632.657011 0c61.340043 0 111.243617-49.901527 111.243617-111.2385L954.049347 199.165062C954.05037 137.823995 904.143727 87.919399 842.801636 87.919399zM152.829246 359.462908c0-1.445932 1.175779-2.62171 2.62171-2.62171l742.894717 0c1.447978 0 2.625804 1.175779 2.625804 2.62171l0 475.786217c0 31.519878-25.647123 57.161884-57.172117 57.161884L210.237747 892.411009c-31.654954 0-57.408501-25.756617-57.408501-57.414641L152.829246 359.462908z" p-id="4841" fill="#ffffff"></path>
                    <path d="M251.104503 740.315986l547.239596 0c0 0 0 0 0.001023 0 6.711865 0 13.002129-2.949168 17.712407-8.303106 4.626367-5.260817 7.175423-12.234649 7.175423-19.636223 0-15.405875-11.171434-27.939329-24.90318-27.939329L251.104503 684.437327c-13.731746 0-24.90318 12.533454-24.90318 27.939329C226.201324 727.782531 237.372757 740.315986 251.104503 740.315986z" p-id="4842" fill="#ffffff"></path>
                  </svg>
                </span>
                <span style="line-height: 40px;margin-left: 10px;width: 180px;">{{item['label']}}</span>
                <span>
                  <svg style="margin-top: 5px;cursor:pointer;" t="1657871751755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3823" width="30" height="30">
                    <path d="M415.930119 223.790358c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 276.770704 415.930119 223.790358z" p-id="3824"></path>
                    <path d="M415.930119 511.741979c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 564.722325 415.930119 511.741979z" p-id="3825"></path>
                    <path d="M415.930119 799.865614c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 852.673946 415.930119 799.865614z" p-id="3826"></path>
                  </svg>
                </span>
              </div>
            </el-scrollbar>
          </div>
          <div class="body-right-hierarchy3">
            <div ref="chart" id="thePieChart" style="width: 100%;height: 150px;font-size: 10px"></div>
          </div>
          <div class="body-right-hierarchy4">
            <el-progress :percentage="((number.wallpaperNumber/(number.wallpaperNumber+number.testWallpaperNumber))*100).toFixed(2)" />
            <div style="width: 100%;font-size: 20px;text-align: center;margin-top: 10px">{{store.state['language']===1?'Wallpaper Number ':'壁纸总数'}}：{{number.wallpaperNumber+number.testWallpaperNumber}}</div>
          </div>
        </span>
      </div>
      <el-dialog v-model="permissionsDialog" v-loading="permissionsLoading" :title="store.state['language']===1?'Rights management':'权限管理'" width="500px">
        <el-tree
          ref="permissionsTree"
          :data="permissionsData"
          accordion
          show-checkbox
          node-key="id"
          :props="permissionsProps"
        />
        <div style="width: 100%;text-align: center;margin-top: 10px">
          <el-button @click="permissionsDialog=false">{{store.state['language']===1?'Cancel':'取消'}}</el-button>
          <el-button @click="permissionsClick" :disabled="store.state['permissions']['changePermissions']===0" type="primary">{{store.state['language']===1?'Save':'保存'}}</el-button>
        </div>
      </el-dialog>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, reactive, onMounted, onActivated } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from  "vuex";
/**
 * 接口区
 */

/**
 * 变量区
 */
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
const { $echarts } = proxy as any;
const { $cookies } = proxy as any;
const store = useStore();
let search = ref('');
const headPortrait = $imgUrl+'/headPortrait/';
const date = new Date();
const time = ref<any>([]);
const mainLoading = ref<boolean>(false);
// 月份
const monthEnglishFormat = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const calendarChoose = ref(1);
const adminIsFocus = ref<number>(0);
const administratorList = ref<any>([]);
const arrange = ref<any>([{label: '2022-7-15',id: 0},{label: '2022-7-15',id: 1},{label: '2022-7-15',id: 2}]);
const data = reactive<any>({
  option1:{
    color: [
      '#c23531',
      '#2f4554',
    ],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: '3%',
      x: 'left',
      y: 'center'
    },
    series: [
      {
        name: store.state['language']===1?'Wallpaper number':'壁纸数量',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%','50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center',
          fontSize: '20'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 0, name: store.state['language']===1?'Online':'在线'},
          { value: 0, name: store.state['language']===1?'Not online':'不在线'}
        ]
      }
    ]
  },
  option2:{
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line'
      }
    ]
  }
});
const myCharts = ref<any>();
const myCharts2 = ref<any>();
const number = ref<any>({userNumber:0,wallpaperNumber:0,testWallpaperNumber:0,feedbackNumber:0});
const access = ref<any[]>([]);
const permissionsTree = ref<any>();
const permissionsDialog = ref<boolean>(false);
const permissionsProps = reactive({
  children: 'children',
  label: '',
  disabled: ''
});
let permissionsData = ref<any[]>([
    {
      id: '1',
      Chinese: '修改权限',
      English: 'Modify permissions',
      disabled: true
    },
    {
      id: '2',
      Chinese: '用户',
      English: 'User',
      disabled: true,
      children: [
        {
          id: '2-1',
          disabled: true,
          Chinese: '修改用户信息',
          English: 'Modifying User Information',
          value: 'modifyingUserInformation'
        }
      ]
    },
    {
      id: '3',
      Chinese: '消息',
      English: 'Message',
      disabled: true,
      children: [
        {
          id: '3-1',
          disabled: true,
          English: 'System announcement',
          Chinese: '系统公告',
          value: 'systemAnnouncement'
        },
        {
          id: '3-2',
          disabled: true,
          English: 'Important notice',
          Chinese: '重要通知',
          value: 'importantNotice',
          children: [
            {
              id: '3-2-1',
              disabled: true,
              English: 'System Users',
              Chinese: '系统内用户',
              value: 'importantSystemUsers'
            },
            {
              id: '3-2-2',
              disabled: true,
              English: 'Customize recipient',
              Chinese: '自定义接收人',
              value: 'importantNoticeCustom'
            }
          ]
        }
      ]
    },
    {
      id: '4',
      Chinese: '壁纸',
      English: 'Wallpaper',
      disabled: true,
      children: [
        {
          id: '4-1',
          Chinese: '在线壁纸',
          English: 'Online wallpaper',
          disabled: true,
          value: 'onlineWallpaper',
          children: [
            {
              id: '4-1-1',
              Chinese: '信息修改',
              English: 'Modify information',
              value: 'onlineWallpaperModify',
              disabled: true,
              children: [
                {
                  id: '4-1-1-1',
                  disabled: true,
                  value: 'onlineWallpaperModifyTitle',
                  English: 'Title',
                  Chinese: '标题'
                },
                {
                  id: '4-1-1-2',
                  disabled: true,
                  value: 'onlineWallpaperModifyLabel',
                  English: 'Label',
                  Chinese: '标签'
                },
                {
                  id: '4-1-1-3',
                  disabled: true,
                  value: 'onlineWallpaperModifyState',
                  English: 'State',
                  Chinese: '状态'
                },
                {
                  id: '4-1-1-4',
                  disabled: true,
                  value: 'onlineWallpaperModifyLocation',
                  English: 'Storage location',
                  Chinese: '存储位置'
                }
              ]
            }
          ]
        },
        {
          id: '4-2',
          Chinese: '未在线壁纸',
          English: 'Not online wallpaper',
          value: 'notOnlineWallpaper',
          disabled: true,
          children: [
            {
              id: '4-2-1',
              Chinese: '信息修改',
              English: 'Modify information',
              value: 'notOnlineWallpaperModify',
              disabled: true,
              children: [
                {
                  id: '4-2-1-1',
                  disabled: true,
                  value: 'notOnlineWallpaperModifyTitle',
                  English: 'Title',
                  Chinese: '标题'
                },
                {
                  id: '4-2-1-2',
                  disabled: true,
                  value: 'notOnlineWallpaperModifyLabel',
                  English: 'Label',
                  Chinese: '标签'
                },
                {
                  id: '4-2-1-3',
                  disabled: true,
                  value: 'notOnlineWallpaperModifyState',
                  English: 'State',
                  Chinese: '状态'
                },
                {
                  id: '4-2-1-4',
                  disabled: true,
                  value: 'notOnlineWallpaperModifyLocation',
                  English: 'Storage location',
                  Chinese: '存储位置'
                }
              ]
            }
          ]
        },
        {
          id: '4-3',
          Chinese: '批量操作',
          English: 'Batch operation',
          disabled: true,
          children: [
            {
              id: '4-3-1',
              disabled: true,
              English: 'Batch upload',
              value: 'wallpaperUpload',
              Chinese: '批量上传'
            },
            {
              id: '4-3-2',
              disabled: true,
              English: 'Batch download',
              value: 'wallpaperDownload',
              Chinese: '批量下载'
            }
          ]
        }
      ]
    },
    {
      id: '5',
      Chinese: '其他',
      English: 'Other',
      disabled: true,
      children: [
        {
          id: '5-1',
          Chinese: '操作日志',
          English: 'Operation log',
          disabled: true,
          children: [
            {
              id: '5-1-1',
              Chinese: '查看',
              English: 'To view',
              value: 'logView',
              disabled: true
            },
            {
              id: '5-1-2',
              Chinese: '导出',
              English: 'Export',
              value: 'logExport',
              disabled: true
            }
          ]
        }
      ]
    }
  ]);
const permissionsReturn = reactive<any>({
  id: '',
  uuid: ''
})
const permissionsLoading = ref<boolean>(false);
/**
 * 方法区
 */

const init = async () => {
  mainLoading.value = true;
  let m = date.getMonth();
  let d = date.getDate();
  time.value.push(date.getFullYear()+'-'+(m+1<10?'0'+(m+1):m+1)+'-'+(d+1<10?'0'+d:d));
  time.value.push(monthEnglishFormat[m]+' '+(d+1<10?'0'+d:d)+','+date.getFullYear());
  await obtainAccess(30);
  await adminList();
  mainLoading.value = false;
}
const handleCommand = (command: number) => {
  $http.get('/L/language',{
    params:{
      language: command,
      uuid: $cookies.get('uuid')
    }
  }).then((res:any)=>{
    if (res.data){
      store.commit('modifyLanguage',{val:command});
      if(command===1){
        permissionsProps.label='English';
        data.option1.series[0].name = 'Wallpaper number';
        data.option1.series[0].data[0]['name'] = 'Online';
        data.option1.series[0].data[1]['name'] = 'Not online';
      }else{
        permissionsProps.label='Chinese';
        data.option1.series[0].name = '壁纸数量';
        data.option1.series[0].data[0]['name'] = '在线';
        data.option1.series[0].data[1]['name'] = '不在线';
      }
      myCharts.value.setOption(data.option1);
    }else{
      ElMessage.error(store.state['language']===1?'Failed. Please try again':'失败,请重新尝试');
    }
  });
}
const adminHandleCommand = (command: number,id: number,uuid: string) => {
  permissionsLoading.value = true;
  permissionsDialog.value = true;
  store.state['permissions']['changePermissions']===1?permissionsProps.disabled='disabled2':permissionsProps.disabled='disabled';
  store.state['language']===1?permissionsProps.label = 'English':permissionsProps.label = 'Chinese';
  permissionsReturn.id = id;
  permissionsReturn.uuid = store.state['userInformation']['userId'];
  gainPermissions(uuid);
}
const adminFocus = (val:number) => {
  administratorList.value[adminIsFocus.value]['isFocus'] = false;
  adminIsFocus.value = val;
  administratorList.value[val]['isFocus'] = true;
}
const calendarClick = (num:number) => {
  calendarChoose.value = num;
  switch (num) {
    case 1:
      data.option2.xAxis.data = [];
      data.option2.series[0].data = [];
      for (let i =0;i<7;i++){
        data.option2.xAxis.data.push(access.value[i]['dateTime']);
        data.option2.series[0].data.push(access.value[i]['accessNumber']);
      }
      myCharts2.value.setOption(data.option2);
      break;
    case 2:
      data.option2.xAxis.data = [];
      data.option2.series[0].data = [];
      for (let i =0;i<12;i++){
        data.option2.xAxis.data.push(access.value[i]['dateTime']);
        data.option2.series[0].data.push(access.value[i]['accessNumber']);
      }
      myCharts2.value.setOption(data.option2);
      break;
    case 3:
      data.option2.xAxis.data = [];
      data.option2.series[0].data = [];
      for (let i =0;i<17;i++){
        data.option2.xAxis.data.push(access.value[i]['dateTime']);
        data.option2.series[0].data.push(access.value[i]['accessNumber']);
      }
      myCharts2.value.setOption(data.option2);
      break;
  }
}
const wallpaperChart = () => {
  myCharts.value = $echarts.init(document.getElementById('thePieChart'));
  myCharts.value.clear();
  $http.get('/L/number').then((res: any)=>{
    number.value = res.data[0];
    data.option1.series[0].data[0]['value'] = number.value.wallpaperNumber;
    data.option1.series[0].data[1]['value'] = number.value.testWallpaperNumber;
    myCharts.value.setOption(data.option1);
  });
}
const obtainAccess = (day:number) => {
  myCharts2.value = $echarts.init(document.getElementById('theLineChart'));
  myCharts2.value.clear();
  $http.get('/L/obtainAccess',{
    params:{
      limit: day
    }
  }).then((res:any)=>{
    access.value = res.data;
    data.option2.xAxis.data = [];
    data.option2.series[0].data = [];
    for (let i =0;i<7;i++){
      data.option2.xAxis.data.push(access.value[i]['dateTime']);
      data.option2.series[0].data.push(access.value[i]['accessNumber']);
    }
    myCharts2.value.setOption(data.option2);
  });
}
const adminList = () => {
  $http.get('/admin/c896d9988afd44939906b45e8703df3a',{
    params:{
      identity:0,
      uuid:$cookies.get('uuid'),
      page: 1,
      limit: 10
    }
  }).then((res:any)=>{
    administratorList.value= res.data['data'];
    administratorList.value.forEach((item:any)=>{
      item['isFocus'] = false
    });
    administratorList.value[0]['isFocus'] = true;
  });
}
const permissionsClick = () => {
  let arr = permissionsTree.value.getCheckedNodes();
  let arr2 = permissionsTree.value.getHalfCheckedNodes();
  arr.forEach((item:any)=>{
    if (item['value'] !== undefined){
      permissionsReturn[item['value']] = 1;
    }
  });
  arr2.forEach((item:any)=>{
    if (item['value'] !== undefined){
      permissionsReturn[item['value']] = 1;
    }
  });
  $http.post("admin/PermissionsModify",permissionsReturn).then((res:any)=>{
    if (res.data){
      ElMessage({
        message: store.state['language']===1?'Successful':'成功',
        type: 'success',
      });
      permissionsDialog.value=false;
    }
  });
}
const gainPermissions = (uuid:string) => {
  $http.get('/admin/PermissionsView',{
    params:{
      uuid:uuid
    }
  }).then((res:any)=>{
    let arr = [];
    if (res.data[0]['changePermissions']===1) arr.push('1');
    if (res.data[0]['modifyingUserInformation']===1) arr.push('2-1');
    if (res.data[0]['systemAnnouncement']===1) arr.push('3-1');
    if (res.data[0]['importantSystemUsers']===1) arr.push('3-2-1');
    if (res.data[0]['importantNoticeCustom']===1) arr.push('3-2-2');
    if (res.data[0]['onlineWallpaperModifyTitle']===1) arr.push('4-1-1-1');
    if (res.data[0]['onlineWallpaperModifyLabel']===1) arr.push('4-1-1-2');
    if (res.data[0]['onlineWallpaperModifyState']===1) arr.push('4-1-1-3');
    if (res.data[0]['onlineWallpaperModifyLocation']===1) arr.push('4-1-1-4');
    if (res.data[0]['notOnlineWallpaperModifyTitle']===1) arr.push('4-2-1-1');
    if (res.data[0]['notOnlineWallpaperModifyLabel']===1) arr.push('4-2-1-2');
    if (res.data[0]['notOnlineWallpaperModifyState']===1) arr.push('4-2-1-3');
    if (res.data[0]['notOnlineWallpaperModifyLocation']===1) arr.push('4-2-1-4');
    if (res.data[0]['wallpaperUpload']===1) arr.push('4-3-1');
    if (res.data[0]['wallpaperDownload']===1) arr.push('4-3-2');
    if (res.data[0]['logView']===1) arr.push('5-1-1');
    if (res.data[0]['logExport']===1) arr.push('5-1-2');
    permissionsTree.value.setCheckedKeys(arr);
    permissionsLoading.value = false;
  })
}
onMounted(()=>{
  mainLoading.value = true;
  if ($cookies.get('uuid')!==null){
    init();
  }
});
onActivated(()=>{
  wallpaperChart();
});
</script>

<style scoped lang="scss">
.homePage {
  width: 100%;
  height: 100%;
  .head{
    width: 100%;
    height: 40px;
    display: flex;
    span{
      width: 50%;
      line-height: 40px;
      display: flex;
      .el-input{
        width: 300px;
        margin-left: 20px;
        ::v-deep .el-input__wrapper{
          border-radius: 50px;
        }
      }
      .el-badge{
        margin-left: 20px;
        margin-top: 5px;
        position: absolute;
        line-height: initial;
      }
    }
  }
  .body{
    width: 100%;
    margin-top: 30px;
    height: calc(100% - 90px);
    display: flex;
    .body-left{
      width: calc(70% - 20px);
      height: 100%;
      .body-left-hierarchy1{
        width: 100%;
        height: 40px;
        display: flex;
        span{
          width: 50%;
          height: 40px;
          line-height: 40px;
        }
      }
      .body-left-hierarchy2{
        width: 100%;
        height: 180px;
        .administrator-list{
          width: 100%;
          height: 60px;
          border-radius: 50px;
          display: flex;
          span{
            height: 60px;
            line-height: 60px;
            margin-left: 20px;
            white-space:nowrap;
          }
        }
      }
      .body-left-hierarchy3{
        width: 100%;
        height: 40px;
        display: flex;
        margin-top: 10px;
        span{
          width: 50%;
          height: 40px;
          line-height: 40px;
        }
      }
      .body-left-hierarchy4{
        width: 100%;
        height: 210px;
        margin-top: 10px;
        display: flex;
        .calendar{
          width: 140px;
          height: 60px;
          border-radius: 20px;
          border: 1px solid #dedede;
          cursor:pointer;
          margin-bottom: 10px;
          line-height: 70px;
          text-align: center;
          font-size: 20px;
          .calendar-span1{
            width: 60px;
            height: 100%;
            text-align: center;
            font-size: 20px;
            line-height: 70px;
          }
          .calendar-span2{
            width: 90px;
            height: 100%;
            padding-top: 15px;
          }
        }
      }
    }
    .body-right{
      width: 30%;
      margin-left: 20px;
      height: 495px;
      background-color: #f3f6fb;
      border-radius: 20px;
      .body-right-hierarchy1{
        width: 80%;
        margin: 20px 0 0 10%;
      }
      .body-right-hierarchy2{
        width: 90%;
        height: 150px;
        margin: 10px 0 0 5%;
        .body-right-hierarchy2-arrange{
          width: 100%;
          height: 40px;
          display: flex;
          margin-bottom: 10px;
        }
      }
      .body-right-hierarchy3{
        width: 90%;
        height: 190px;
        margin: 20px 0 0 5%;
      }
      .body-right-hierarchy4{
        width: 90%;
        margin: 20px 0 0 5%;
      }
    }
  }
  b{
    font-size: 20px;
  }
  .administratorColor{
    background-color: #f3f6fb;
  }
  .background-black{
    color: white;
    background-color: black;
  }
}
</style>
