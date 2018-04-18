<template>
   <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">
         <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
         </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">
         <section class="chart-container">
            <el-row>
               <!--<el-col :span="24">-->
                  <!--<div id="chartLine" style="width:100%; height:400px;"></div>-->
               <!--</el-col>-->
               <el-col :span="24">
                  <div id="chartPie" style="width:100%; height:400px;"></div>
               </el-col>
               <!--<el-col :span="24">-->
               <!--<a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>-->
               <!--</el-col>-->
            </el-row>
         </section>

      </el-col>
   </el-row>
</template>
<script>
   import echarts from 'echarts'

   export default {
      data() {
         return {
            currentDate: new Date(),
            chartLine: null,
            chartPie: null
         };
      },
      mounted: function () {
         var _this = this;
         //基于准备好的dom，初始化echarts实例
//         this.chartLine = echarts.init(document.getElementById('chartLine'));
         this.chartPie = echarts.init(document.getElementById('chartPie'));
//         this.chartLine.setOption({
//            title: {
//               text: 'Line Chart'
//            },
//            tooltip: {
//               trigger: 'axis'
//            },
//            legend: {
//               data: ['均分', '平均通过率']
//            },
//            grid: {
//               left: '3%',
//               right: '4%',
//               bottom: '3%',
//               containLabel: true
//            },
//            xAxis: {
//               type: 'category',
//               boundaryGap: false,
//               data: ['2017-10-09', '2017-10-10', '2017-10-11', '2017-10-12', '2017-10-13', '2017-10-14']
//            },
//            yAxis: {
//               type: 'value'
//            },
//            series: [
//               {
//                  name: '均分',
//                  type: 'line',
//                  stack: '总量',
//                  data: [120, 132, 101, 134, 90, 230]
//               },
//               {
//                  name: '平均通过率',
//                  type: 'line',
//                  stack: '总量',
//                  data: [220, 182, 191, 234, 290, 330]
//               },
//            ]
//         });

         this.chartPie.setOption({
            title: {
               text: '注册总人数饼图',
               subtext: '',
               x: 'center'
            },
            tooltip: {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
               orient: 'vertical',
               left: 'left',
               data: ['总计未申请人数', '总计通过人数', '总计不通过人数', '总计黑名单人数']
            },
            series: [
               {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                     {value: 335, name: '总计未申请人数'},
                     {value: 310, name: '总计通过人数'},
                     {value: 234, name: '总计不通过人数'},
                     {value: 135, name: '总计黑名单人数'}
                  ],
                  itemStyle: {
                     emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                     }
                  }
               }
            ]
         });
      }
   }
</script>
<style type="text/scss" lang="scss" scoped>
   .time {
      font-size: 13px;
      color: #999;
   }

   .bottom {
      margin-top: 13px;
      line-height: 12px;
   }

   .image {
      width: 100%;
      display: block;
   }

   .clearfix:before,
   .clearfix:after {
      display: table;
      content: "";
   }

   .clearfix:after {
      clear: both
   }

   .chart-container {
      width: 100%;
   }

   .chart-container .el-col {
      padding: 30px 20px;
   }
</style>
