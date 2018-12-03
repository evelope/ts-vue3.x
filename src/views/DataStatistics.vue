<template>
  <div class="DataStatistics">
      <div class="change-title">
        <p v-for="(x,i) in changeTitleData" :key="i" :class="[showData===i?'active':'']" @click="changeTitle(i)"><i :class="['iconfont',x.icon]"></i><span>{{x.title}}</span></p>
        <div :style="{left:showData?(100/3*showData)+'%':'0'}" class="active-float"></div>
      </div>
      <div class="echart-title">
        近7天报警数据统计
      </div>
      <div class="echart-statistics">
        <div v-if="!hasData" class="no-has">
          暂无数据
        </div>
        <AlarmEcharts :list="list"/>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AlarmEcharts from '@/components/AlarmEcharts.vue';
import axios from 'axios';
const instance = axios.create({
  baseURL: "",
  timeout: 60000,
  headers: { "X-Custom-Header": "foobar" }
});

// 声明组件*****************
@Component({
  components: {
    AlarmEcharts,
  },
})
export default class DataStatistics extends Vue {
  // 属性*****************
  private changeTitleData: Array<Object> = [
    {
      icon:'icon-huojingshujutongjiicon',
      title:'火警报警',
    },
    {
      icon:'icon-guzhangshujutongjiicon',
      title:'故障报警',
    },
    {
      icon:'icon-tuoyuan',
      title:'水压报警',
    },
  ];
  created ():void {
    document.title = '数据统计';
  };
  private getBeforeDate(n:number):string{
    let s;
    let d = new Date();
    let year = d.getFullYear();
    let mon=d.getMonth()+1;
    let day=d.getDate();
    if(day <= n){
      if(mon>1) {
          mon=mon-1;
      }
    else {
      year = year-1;
      mon = 12;
      }
    }
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    // s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
    s = (day<10?('0'+day):day)+'/'+(mon<10?('0'+mon):mon)
    return s;
  }
  private showData:number = 0;
  private list: any = {
    xData:[this.getBeforeDate(7),this.getBeforeDate(6),this.getBeforeDate(5),this.getBeforeDate(4),this.getBeforeDate(3),this.getBeforeDate(2),this.getBeforeDate(1)],
    yData:[0, 0, 0, 0, 0, 0, 0],
    series_item_style:['rgb(0,190,255)','rgb(0,231,255)'],
    // yAxis_max:10,
    yAxis_minInterval:2,
    yAxis_name:'(次数)'
  };

  mounted ():void {
    // console.log(this.getBeforeDate(26))
  }
  // 方法*****************
  // 头部切换
  private changeTitle(i:number): void {
    this.showData = i;
  }
  /** 报警查询列表 */
  private ajaxStatisticSevenDays = (data: object, type: string) => instance.get('/statistic/statistic/wechat/alarms/' + type + '/last_seven_days/', {params: data});

  @Watch('showData', { immediate: true, deep: false })
  onShowDataChanged(val: number, oldVal: number):void {
    switch(val){
      case 0:
        this.ajaxStatisticSevenDays({
          open_id: this['$route']['query']['open_id']
        },'fire').then((res: any)=>{
          this.list["yData"] = res['data']['data']['info'];
        })
        break;
      case 1:
        this.ajaxStatisticSevenDays({
          open_id: this['$route']['query']['open_id']
        },'trouble').then((res: any)=>{
          this.list["yData"] = res['data']['data']['info'];
        })
        break;
      case 2:
        this.ajaxStatisticSevenDays({
          open_id: this['$route']['query']['open_id']
        },'hydraulic').then((res: any)=>{
          this.list["yData"] = res['data']['data']['info'];
        })
        break;
      default:
        this.list["yData"] = [0, 0, 0, 0, 0, 0, 0];
        break;
    }
  }

  // computed
  get hasData(): number {
    return this.list["yData"].some((x: number)=>x!==0);
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/less-css/flexible.less");
.DataStatistics {
  background: rgb(36, 43, 49);
  height: 100%;
  .change-title {
    position: relative;
    color: #fff;
    display: flex;
    justify-content: space-around;
    .h(145);
    border-bottom:1px solid rgb(59, 69, 81);
    .active{
      color: rgb(0, 192, 254);
      transition: color 0.2s;
    } 
    p {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i{
        .fs(50);
      }
      span{
        .fs(26);
        .px2rem(margin-top,12);
      }
    }
    .active-float{
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgb(0, 192, 254);
      width: calc(100% / 3);
      transition: left 0.2s;
      .h(6);
    }
  }
  .echart-title{
    .lh(160);
    .fs(35);
    color: rgb(153, 153, 153);
    text-align: center;
  }
  .echart-statistics{
    position: relative;
    .no-has{
      .t(150);
      .fs(30);
      position: absolute;
      color: rgb(153, 153, 153);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

