<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商户管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品参数列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.shopId" style="width: 200px;"
                  class="filter-item"
                  placeholder="商家编号">
        </el-input>
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.productName" style="width: 200px;"
                  class="filter-item"
                  placeholder="产品名称">
        </el-input>
        <el-button @click.stop="on_refresh" class="filter-item" size="small" style="font-size: 16px;" plain v-waves
                   icon="el-icon-refresh"></el-button>
        <el-button class="filter-item" style="width: 90px;" type="primary" v-waves icon="el-icon-search"
                   @click="handleFilter">
          搜索
        </el-button>
      </div>

      <!--列表-->
      <el-table :data="productList" border highlight-current-row element-loading-text="拼命加载中" v-loading="listLoading"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="shopId" label="商家编号"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="shopName" label="商家名称"></el-table-column>
        <el-table-column prop="interestRate" label="利息费"></el-table-column>
        <el-table-column prop="auditRate" label="快速信审费"></el-table-column>
        <el-table-column prop="manageRate" label="账户管理费"></el-table-column>
        <el-table-column prop="latefeeRate" label="逾期费用"></el-table-column>
        <el-table-column label="操作类型" fixed="right" width="550">
          <template slot-scope="scope">
            <el-button size="small" @click="parameterConfect(scope.row)">流量收费</el-button>
            <el-button size="small" @click="parameterConfect1(scope.row)">收款配置</el-button>
            <el-button size="small" @click="parameterConfect2(scope.row)">还款配置</el-button>
            <el-button size="small" @click="parameterConfect3(scope.row)">风控配置</el-button>
            <el-button size="small" @click="parameterConfect4(scope.row)">风控参数</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--分页-->
        <div v-show="productList.length" style="float: right" class="pagination-container">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.limit"
            :page-size="listQuery.page"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
  import util from "../../common/util";
  import waves from "@/common/waves/index.js"; // 水波纹指令
  import sessionStorage from "@/storage/sessionStorage";
  import Api from "@/api";
  export default {
    directives: {
      waves
    },
    data() {
      return {
        search: {
          shopId: "",
          productName: ""
        },
        productList: [],
        total: 0,
        listQuery: {
          page: 10,
          limit: 1,
          type: undefined,
          shopId: "",
          productName: "",
          startTime: "",
          endTime: ""
        },
        listLoading: false
      };
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this.queryProductList();
      },
      handleFilter() {
        this.queryProductList();
      },
      //刷新
      on_refresh(){
        this.search.shopId = '';
        this.search.productName = '';
        this.queryProductList()
      },
      //获取参数列表-
      queryProductList() {
        let para = {
          pSize: this.listQuery.page,
          pNum: this.listQuery.limit,
          shopId: this.search.shopId,
          productName: this.search.productName
        };
        this.listLoading = true;
        Api.testApi.queryProductList(util.checkBe(para)).then(res => {
          if (res.code == "0000") {
            if (res.data.list) {
              this.total = res.data.total;
              this.productList = res.data.list;
              this.listLoading = false;
            }
            //            console.log('this.queryProductList', this.productList)
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      parameterConfect(row) {
        sessionStorage.$removeSessionStorageByName("shopId", row.shopId);
        sessionStorage.$setSessionStorageByName("shopId", row.shopId);
        let cs = "1";
        this.$router.push({path: "/parameterConfect", query: {cs: cs}});
      },
      parameterConfect1(row) {
        sessionStorage.$removeSessionStorageByName("shopId", row.shopId);
        sessionStorage.$setSessionStorageByName("shopId", row.shopId);
        let cs = "2";
        this.$router.push({path: "/parameterConfect", query: {cs: cs}});
      },
      parameterConfect2(row) {
        sessionStorage.$removeSessionStorageByName("shopId", row.shopId);
        sessionStorage.$setSessionStorageByName("shopId", row.shopId);
        let cs = "3";
        this.$router.push({path: "/parameterConfect", query: {cs: cs}});
      },
      parameterConfect3(row) {
        sessionStorage.$removeSessionStorageByName("shopId", row.shopId);
        sessionStorage.$setSessionStorageByName("shopId", row.shopId);
        let cs = "4";
        this.$router.push({path: "/parameterConfect", query: {cs: cs}});
      },
      parameterConfect4(row) {
        sessionStorage.$removeSessionStorageByName("shopId", row.shopId);
        sessionStorage.$setSessionStorageByName("shopId", row.shopId);
        let cs = "5";
        this.$router.push({path: "/parameterConfect", query: {cs: cs}});
      }
    },
    mounted() {
      this.queryProductList();
    },
    components: {}
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .demo-table-expand label {
    font-weight: bold;
  }

  .filter-container {
    padding: 20px 0;
  }
</style>
