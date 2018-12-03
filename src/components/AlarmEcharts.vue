<template>
  <div class="AlarmEcharts">
    <div class="testEcharts" ref="statistics"></div>
  </div>
</template>

<script>
import EChart from "echarts";
import { setTimeout } from "timers";

export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      statistics: {
        option: {},
        chart: {},
        element: {}
      }
    };
  },
  mounted() {
    this.initData();
    window.onresize = () => {
      this.statistics.chart.resize();
    };
  },
  destory() {
    window.onresize = null;
  },
  methods: {
    initData() {
      this.statistics.option = {
        // backgroundColor: "",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "10%",
          right: "10%",
          top: "10%",
          bottom: "35%",
          containLabel: true
        },
        xAxis: {
          //x轴
          type: "category",
          data: this.list.xData, //x轴的数据
          splitLine: {
            show: false //去掉分割线
          },
          // splitArea: {show: true},//保留网格区域
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: "rgb(52,59,70)", //轴线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisTick: {
            //刻度
            show: false, //不显示刻度线
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              color: "#878787" //坐标值的具体的颜色
            },
            formatter: function(params) {
              var newParamsName = ""; // 最终拼接成的字符串
              var paramsNameNumber = params.length; // 实际标签的个数
              var provideNumber = 8; // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ""; // 表示每一次截取的字符串
                  var start = p * provideNumber; // 开始截取的位置
                  var end = start + provideNumber; // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr; // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              //将最终的字符串返回
              return newParamsName;
            }
          }
        },
        // backgroundColor: '#fff',//图得背景色
        yAxis: {
          name: this.list.yAxis_name || "", //轴的名字，默认位置在y轴上方显示
          nameTextStyle: {
            color: "rgb(90,93,93)"
          },
          max: this.list.yAxis_max, //最大刻度
          type: "value",
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: "rgb(52,59,70)", //轴线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisTick: {
            //刻度
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "rgb(153,153,153)" //坐标值得具体的颜色
            }
          },
          minInterval: this.list.yAxis_minInterval || 2, //标值的最小间隔
          splitLine: {
            show: false
            // lineStyle: {
            //   // 使用深浅的间隔色
            //   type: "dashed",
            //   color: "rgba(56, 144, 254, 0.5)",
            //   width: "1" //坐标线的宽度
            // }
          }
        },
        series: [
          {
            // name: '', //每组数据的名字，与图例对应
            data: this.list.yData, //数据
            type: "bar", //柱状图
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: this.list.series_item_style[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: this.list.series_item_style[1] // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }, //设置柱子颜色
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                  textStyle: {
                    color: "#fff" //值得颜色
                  }
                }
              }
            },
            barWidth: 18 //设置柱子宽度，单位为px
          }
        ]
      };
      this.statistics.chart = EChart.init(this.$refs.statistics);
      this.statistics.chart.setOption(this.statistics.option);
    }
  },
  watch: {
    list: {
      handler() {
        this.$nextTick(() => {
          this.initData();
        });
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style scoped>
.testEcharts {
  border-right: 0;
  border-left: 0;
  width: 100%;
  height: 300px;
  /* background-color: red; */
}
</style>
