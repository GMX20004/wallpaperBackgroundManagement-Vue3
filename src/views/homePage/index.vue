<template>
  <div class="homePage">
    <perfect-scrollbar>
      <div class="head">
        <span>
          <b>{{language===1?'Dashboard':'仪表板'}}</b>
          <el-input v-model="search" class="w-50 m-2" :placeholder="language===1?'Search':'搜索'" clearable>
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
          <el-avatar style="width: 40px;height: 40px;margin-right: 10px" :src="headPortrait+userInformation['headPortrait']"></el-avatar>
          <b>{{userInformation['name']}}</b>
        </span>
      </div>
      <div class="body">
        <span class="body-left">
          <div class="body-left-hierarchy1">
            <span><b>{{language===1?'AdministratorList':'管理员列表'}}</b></span>
            <span>
              <el-dropdown trigger="click" @command="handleCommand">
                <el-button round>
                  {{language===1?'English':'Chinese'}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
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
            <perfect-scrollbar>
              <div v-for="(item,i) in administratorList" tabindex="-1" class="administrator-list" :key="i" @focus="adminFocus(i)" :class="[item['isFocus']?'administratorColor':'']">
              <span style="width: 40px;margin-left: 0"><el-avatar style="width: 40px;height: 40px;margin: 10px 0 0 10px" :src="headPortrait+item['headPortrait']"/></span>
              <span style="width: 100px;"><b>{{item['name']}}</b></span>
              <span style="width: 200px;color: #8d8d8d">{{item['mail']}}</span>
              <span style="width: 50px;color: #8d8d8d">{{item['sex']}}</span>
              <span style="width: 220px;color: #8d8d8d">加入时间：{{item['time']}}</span>
              <span style="width: 30px;">
                <svg style="margin-top: 15px;cursor:pointer;" t="1657169528823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2250" width="30" height="30">
                  <path d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z" p-id="2251"></path>
                  <path d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z" p-id="2252"></path>
                  <path d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z" p-id="2253"></path>
                </svg>
              </span>
            </div>
            </perfect-scrollbar>
          </div>
          <div class="body-left-hierarchy3">
            <span><b>{{language===1?'Schedule':'时间表'}}</b></span>
            <span style="display: flex">
              <span style="width: 50%;text-align: right;padding-right: 10px">{{language===1?time[1]:time[0]}}</span>
              <span style="width: 50%;">
                <el-dropdown style="margin-top: 3px" trigger="click" @command="handleCommand2">
                  <el-button round style="background-color: black;color: white">
                    {{administratorList[adminIsFocus]['name']}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="1">{{language===1?'Send a message':'发送消息'}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </span>
            </span>
          </div>
          <div class="body-left-hierarchy4">
            <span style="width: 100px;height: 100%;">
              <div class="calendar" :class="calendarChoose===1?'background-black':''" @click="calendarClick(1)"  >
                7{{language===1?' Day':' 天'}}
              </div>
              <div class="calendar" :class="calendarChoose===2?'background-black':''" @click="calendarClick(2)">
                12{{language===1?' Day':' 天'}}
              </div>
              <div class="calendar" :class="calendarChoose===3?'background-black':''" @click="calendarClick(3)">
                17{{language===1?' Day':' 天'}}
              </div>
            </span>
            <span style="margin-left: 20px;width: calc(100% - 120px);height: 100%;text-align: center;">
              <div ref="chart2" id="theLineChart" style="width: 100%;height: 100%;"></div>
            </span>
          </div>
        </span>
        <span class="body-right">
          <div class="body-right-hierarchy1"><b>{{language===1?'Information bar':'信息栏'}}</b></div>
          <div class="body-right-hierarchy2">
            <perfect-scrollbar>
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
            </perfect-scrollbar>
          </div>
          <div class="body-right-hierarchy3">
            <div ref="chart" id="thePieChart" style="width: 100%;height: 150px;font-size: 10px"></div>
          </div>
          <div class="body-right-hierarchy4">
            <el-progress :percentage="((number.wallpaperNumber/(number.wallpaperNumber+number.testWallpaperNumber))*100).toFixed(2)" />
            <div style="width: 100%;font-size: 20px;text-align: center;margin-top: 10px">{{language===1?'Wallpaper Number ':'壁纸总数'}}：{{number.wallpaperNumber+number.testWallpaperNumber}}</div>
          </div>
        </span>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";

/**
 * 变量区
 */

const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
const { $echarts } = proxy as any;
const { $cookies } = proxy as any;
let search = ref('');
const headPortrait = $imgUrl+'/headPortrait/';
let language:any = inject('language');
const modifyLanguage:any = inject('modifyLanguage');
const modifyIsLogTo:any = inject('modifyIsLogTo');
const userInformation:any = inject('userInformation');
const date = new Date();
const time = ref<any>([]);
// 月份
const monthEnglishFormat = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const monthChineseFormat = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
// 星期
const weekEnglishFormat = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const weekChineseFormat = ['周日','周一','周二','周三','周四','周五','周六'];
const calendarChoose = ref(1);
const calendar = ref<any>([]);
const adminIsFocus = ref<number>(0);
const administratorList = ref<any>([
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '水水水水水水水水水水水水水水水水水水水'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '日日日日日日日日日日日日日日日日日日日'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '她她她她她她她她她她她她她她她她她她她'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱古古怪怪'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱'},
  {headPortrait:'0.png',name:'Hira R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,signature: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'}
]);
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
        name: '壁纸数',
        type: 'pie',
        radius: ['40%', '70%'],
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
          { value: 0, name: '已上架'},
          { value: 0, name: '待审核'}
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
/**
 * 方法区
 */

const init = () => {
  let m = date.getMonth();
  let d = date.getDate();
  let wk = date.getDay()
  time.value.push(date.getFullYear()+'-'+(m+1<10?'0'+(m+1):m+1)+'-'+(d+1<10?'0'+d:d));
  time.value.push(monthEnglishFormat[m]+' '+(d+1<10?'0'+d:d)+','+date.getFullYear());
  let curretMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let curretMonthDayCount = curretMonth.getDate();
  let today = d+1<10?'0'+d:d;
  let tomorrow = d+1>curretMonthDayCount? '01':d+1<10?'0'+(d+1):d+1;
  let afterTomorrow = d+2>curretMonthDayCount? '02':d+2>curretMonthDayCount? '01':d+2<10?'0'+(d+2):d+2;
  calendar.value = [];
  calendar.value.push({English: [today,monthEnglishFormat[m],weekEnglishFormat[wk]],Chinese: [today,monthChineseFormat[m],weekChineseFormat[wk]]});
  calendar.value.push({English: [tomorrow,monthEnglishFormat[tomorrow==='01'?m+1:m],weekEnglishFormat[wk+1>6?0:wk+1]],Chinese: [tomorrow,monthChineseFormat[tomorrow==='01'?m+1:m],weekChineseFormat[wk+1>6?0:wk+1]]});
  calendar.value.push({English: [afterTomorrow,monthEnglishFormat[afterTomorrow==='01'?m+1:m],weekEnglishFormat[wk+1>6?1:wk+2>6?0:wk+2]],Chinese: [afterTomorrow,monthChineseFormat[afterTomorrow==='01'?m+1:m],weekChineseFormat[wk+1>6?1:wk+2>6?0:wk+2]]});
}
init();
const handleCommand = (command: number) => {
  $http.get('/L/language',{
    params:{
      language: command,
      uuid: $cookies.get('uuid')
    }
  }).then((res:any)=>{
    if (res.data){
      modifyLanguage(command);
    }else{
      ElMessage.error(language===1?'Failed. Please try again':'失败,请重新尝试');
    }
  });

}
const handleCommand2 = (command: number) => {
  console.log(command);
  console.log(userInformation.value,'userInformation');
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
    access.value = res.data.reverse();
    data.option2.xAxis.data = [];
    data.option2.series[0].data = [];
    for (let i =0;i<7;i++){
      data.option2.xAxis.data.push(access.value[i]['dateTime']);
      data.option2.series[0].data.push(access.value[i]['accessNumber']);
    }
    myCharts2.value.setOption(data.option2);
  });
}
onMounted(()=>{
  if ($cookies.get('uuid')===null){
    modifyIsLogTo(false);
  }else{
    wallpaperChart();
    obtainAccess(30);
  }
});
</script>

<style scoped lang="scss">
.homePage {
  width: 100%;
  height: 100%;
  .ps{
    height: 100%;
    width: 100%;
  }
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
    margin-top: 50px;
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
        .ps{
          width: 100%;
          height: 100%;
        }
        .administrator-list{
          width: 740px;
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
        height: 250px;
        margin-top: 10px;
        display: flex;
        .calendar{
          width: 150px;
          height: 70px;
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
      height: 520px;
      background-color: #f3f6fb;
      border-radius: 20px;
      .body-right-hierarchy1{
        width: 80%;
        margin: 20px 0 0 10%;
      }
      .body-right-hierarchy2{
        width: 90%;
        height: 200px;
        margin: 20px 0 0 5%;
        .ps{
          width: 100%;
          height: 200px;
        }
        .body-right-hierarchy2-arrange{
          width: 100%;
          height: 40px;
          display: flex;
          margin-bottom: 10px;
        }
      }
      .body-right-hierarchy3{
        width: 90%;
        height: 150px;
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
