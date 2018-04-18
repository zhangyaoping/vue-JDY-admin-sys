<template>
  <div class="content-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="流量收费配置" name="one">
        <collocate-One></collocate-One>
      </el-tab-pane>
      <el-tab-pane label="还款配置" name="two">
        <collocate-Two></collocate-Two>
      </el-tab-pane>
      <el-tab-pane label="额度区间配置" name="six">
        <collocate-six></collocate-six>
      </el-tab-pane>
      <el-tab-pane label="收款配置" name="three">
        <collocate-Three></collocate-Three>
      </el-tab-pane>
      <el-tab-pane label="风控配置" name="four">
        <collocate-Four></collocate-Four>
      </el-tab-pane>
      <el-tab-pane label="风控参数" name="five">
        <collocate-Five ref="childMethod"></collocate-Five>
      </el-tab-pane>
      <el-tab-pane label="收费配置" name="serven">
        <collocate-serven></collocate-serven>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Api from '@/api';
  import collocateOne from './collocate/collocate1.vue'
  import collocateTwo from './collocate/collocate2.vue'
  import collocateThree from './collocate/collocate3.vue'
  import collocateFour from './collocate/collocate4.vue'
  import collocateFive from './collocate/collocate5.vue'
  import collocateSix from './collocate/collocate6.vue'
  import collocateServen from './collocate/collocate7.vue'

  export default {
    data() {
      return {
        activeName: 'one'
      }
    },
    computed: {},
    created() {
      if (this.$route.query.cs == '1') {
        this.activeName = 'one'
      } else if (this.$route.query.cs == '2') {
        this.activeName = 'two'
      } else if (this.$route.query.cs == '3') {
        this.activeName = 'three'
      } else if (this.$route.query.cs == '4') {
        this.activeName = 'four'
      } else if (this.$route.query.cs == '5') {
        this.activeName = 'five'
        this.$router.push({path: '/scorecardsum'})
      }
    },
    methods: {
      handleClick(tab, event) {
        if (this.activeName == 'five') {
          this.$router.push({path: '/scorecardsum'});
          this.$refs.childMethod.riskDeployList();
        } else {
          this.$router.push({path: '/parameterConfect'})
        }
      },
    },
    mounted() {
    },
    components: {
      collocateOne,
      collocateTwo,
      collocateThree,
      collocateFour,
      collocateFive,
      collocateSix,
      collocateServen
    },
  }
</script>

<style type="text/scss" lang="scss">
  .content-box {
    position: relative;
  }

  .el-tabs__item {
    font-size: 18px;
  }

  .submit-box {
    text-align: center;
  }

  .saveBtn {
    width: 90px;
    margin-top: 25px;
  }


</style>
