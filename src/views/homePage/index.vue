<template>
  <div class="homePage">
    <div class="head">
      <span>
        <b>Dashboard</b>
        <el-input v-model="search" class="w-50 m-2" placeholder="Search" clearable>
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
        <el-avatar style="width: 40px;height: 40px;margin-right: 10px" :src="headPortrait"></el-avatar>
        <b>Hira R</b>
      </span>
    </div>
    <div class="body">
      <span class="body-left">
        <div>
          <span><b>AdministratorList</b></span>
          <span></span>
        </div>
      </span>
      <span class="body-right"></span>
    </div>
<!--    <span class="left">-->
<!--        <div ref="chart" id="chart" :style="{ width: '600px', height: '600px' }"></div>-->
<!--      <div style="text-align: center">壁纸总数：{{number.wallpaperNumber + number.testWallpaperNumber}}</div>-->
<!--    </span>-->
<!--    <span class="right">-->
<!--      <div style="height: 200px;width: 100%">-->
<!--        <div style="height: 50px;width: 80%;display: flex;margin-left: 10%;font-size: 30px">-->
<!--          <span style="background-color: orange;color: white;text-align: center;width: 50%">用户总数</span>-->
<!--          <span style="background-color: orange;color: white;text-align: center;width: 50%">意见反馈总数</span>-->
<!--        </div>-->
<!--        <div style="height: 50px;width: 80%;display: flex;margin-left: 10%;font-size: 30px">-->
<!--          <span style="border: 1px solid black;text-align: center;width: 50%;padding-top: 10px">{{number.userNumber}}</span>-->
<!--          <span style="border: 1px solid black;text-align: center;width: 50%;padding-top: 10px">{{number.feedbackNumber}}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </span>-->
  </div>
</template>

<script setup lang="ts">
// import { reactive,inject ,ref ,onMounted } from "vue";
import { ref , inject} from "vue";
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
let search = ref('');
const headPortrait = ref('');
headPortrait.value = $imgUrl+'/headPortrait/0.png';
// const data = reactive({
//   option:{
//     color: [
//       '#c23531',
//       '#2f4554',
//     ],
//     tooltip: {
//       trigger: 'item'
//     },
//     legend: {
//       top: '5%',
//       left: 'center'
//     },
//     series: [
//       {
//         name: '壁纸数',
//         type: 'pie',
//         radius: ['40%', '70%'],
//         avoidLabelOverlap: false,
//         itemStyle: {
//           borderRadius: 10,
//           borderColor: '#fff',
//           borderWidth: 2
//         },
//         label: {
//           show: false,
//           position: 'center'
//         },
//         emphasis: {
//           label: {
//             show: true,
//             fontSize: '40',
//             fontWeight: 'bold'
//           }
//         },
//         labelLine: {
//           show: false
//         },
//         data: [
//           { value: 0, name: '已上架' },
//           { value: 0, name: '待审核' }
//         ]
//       }
//     ]
//   }
// });
// const myCharts = ref<any>();
// const proxy = inject("proxy");
// const { $echarts } = proxy as any;
// const { $http } = proxy as any;
// const number = ref<any>({userNumber:0,wallpaperNumber:0,testWallpaperNumber:0,feedbackNumber:0});
// const init = () => {
//   $http.get('/L/number').then((res: any)=>{
//     number.value = res.data[0];
//     data.option.series[0].data[0].value = number.value.wallpaperNumber;
//     data.option.series[0].data[1].value = number.value.testWallpaperNumber;
//     wallpaperChart();
//   });
// }
// init();
// const wallpaperChart = () => {
//   myCharts.value = $echarts.init(document.getElementById('chart'));
//   myCharts.value.clear();
//   myCharts.value.setOption(data.option,true);
// }
// onMounted(()=>{
//   wallpaperChart();
// });
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
    margin-top: 50px;
    height: calc(100% - 90px);
    display: flex;
    .body-left{
      width: calc(80% - 20px);
      height: 100%;
    }
    .body-right{
      width: 20%;
      margin-left: 20px;
      height: 100%;
    }
  }
  b{
    font-size: 20px;
  }
}
</style>
