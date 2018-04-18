<template>
  <div class="sidebar">
    <el-menu :default-active="defaultActive" router style="display: inline-block;text-align: center;">
      <template v-for="item in menuService">
        <el-menu-item :index="item.module">
          <i></i>{{ item.title}}
        </el-menu-item>
      </template>
    </el-menu>
    <div id="content-right" :class="{contentRight:isActiveNone}">
      <router-view></router-view>
    </div>
    <div v-if="isActiveNone" style="text-align: center;width: 100%">请填写提交风控配制</div>
  </div>
</template>

<script>
  import Api from "@/api";
  import sessionStorage from "@/storage/sessionStorage";

  export default {
    data() {
      return {
        menuService: [
          {
            index: "scorecardsum",
            is_null: 1,
            module: "scorecardsum",
            title: "总评分卡"
          }
        ],
        isActiveNone: true
      };
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace("/", "");
      }
    },
    created() {
      this.riskDeployList();
    },
    mounted() {
    },
    methods: {
      riskDeployList() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName("shopId")
        };

        Api.testApi.getRiskModules(para).then(res => {
          if (res.code == "0000") {
            if (res.data.chooseModules) {
              if (JSON.parse(res.data.chooseModules) == 0) {
                this.isActiveNone = true;
                this.menuService = [
                  {
                    index: "scorecardsum",
                    is_null: 1,
                    module: "scorecardsum",
                    title: "总评分卡"
                  }
                ];
              } else {
                this.menuService = [
                  {
                    index: "scorecardsum",
                    is_null: 1,
                    module: "scorecardsum",
                    title: "总评分卡"
                  }
                ];
                this.isActiveNone = false;
                let resChoose = JSON.parse(res.data.chooseModules);
                for (let i = 0; i < resChoose.length; i++) {
                  if (resChoose[i].is_null == 1 || resChoose[i].is_null == 2) {
                    this.menuService.push(resChoose[i]);
                    // console.log('res',this.menuService)
                  }
                }
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    }
  };
</script>
<style type="text/scss" lang="scss" scoped>
  .sidebar {
    display: flex;
    display: -webkit-box;
  }

  #content-right {
    flex: 1;
    text-align: center;
  }

  .contentRight {
    display: none;
  }
</style>
