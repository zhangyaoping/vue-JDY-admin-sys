<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商户管理</el-breadcrumb-item>
        <el-breadcrumb-item>资金明细</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.productName" style="width: 200px;"
                  class="filter-item"
                  placeholder="产品名称">
        </el-input>

        <el-select clearable class="filter-item" style="width: 150px" v-model="listQuery.type" placeholder="业务类型">
          <el-option v-for="item in platformName" :key="item.key" :label="item.type"
                     :value="item.key">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="timeQuantum"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-button @click.stop="on_refresh" class="filter-item" size="small" style="font-size: 16px;" plain v-waves
                   icon="el-icon-refresh"></el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <!--列表-->
      <el-table :data="financialList" border highlight-current-row element-loading-text="拼命加载中" v-loading="listLoading"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="type" label="业务类型" width="200"></el-table-column>
        <el-table-column prop="createTime" label="发生时间" width="180"></el-table-column>
        <el-table-column prop="orderId" label="支付流水号" width="150"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
        <el-table-column prop="tradeAmount" label="发生金额" width="170"></el-table-column>
        <el-table-column prop="accountAmount" label="可用余额" width="120"></el-table-column>
        <el-table-column prop="orderInfo" label="业务描述"></el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">

        <!--分页-->
        <div v-show="financialList.length" style="float: right" class="pagination-container">
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
  import Api from "@/api";
  const platformName = [
    {key: "1", type: "CPA费用"},
    {key: "2", type: "充值费用"},
    {key: "3", type: "提现费用"},
    {key: "4", type: "第三方短信费用"},
    {key: "5", type: "第三方身份证识别费用"},
    {key: "6", type: "第三方手机运营商费用"},
    {key: "7", type: "第三方芝麻信用"}
  ];

  // arr to obj
  const platformNameKeyValue = platformName.reduce((acc, cur) => {
    acc[cur.key] = cur.type;
    return acc;
  }, {});
  export default {
    directives: {
      waves
    },
    data() {
      return {
        search: {productName: ""},
        pickerOptions2: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        timeQuantum: "", //时间段
        financialList: [],
        platformName,
        total: 0,
        listQuery: {
          page: 10,
          limit: 1,
          startTime: null,
          endTime: null,
          type: undefined,
          shopId: "",
          productName: "",
          startTime: "",
          endTime: ""
        },
        listLoading: false
      };
    },
    filters: {
      typeFilter(type) {
        return platformNameKeyValue[type];
      }
    },

    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this.queryCostDetail();
      },
      handleFilter() {
        this.queryCostDetail();
      },
      //刷新
      on_refresh(){
        this.search.productName = '';
        this.listQuery.type = '';
        this.timeQuantum = null;
        this.queryCostDetail()
      },
      //获取商户资金明细列表
      queryCostDetail() {
        if (this.timeQuantum) {
          this.startTime = util.formatDate.format(
            new Date(this.timeQuantum[0]),
            "yyyy-MM-dd hh:mm:ss"
          );
          this.endTime = util.formatDate.format(
            new Date(this.timeQuantum[1]),
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        let para = {
          pSize: this.listQuery.page,
          pNum: this.listQuery.limit,
          productName: this.search.productName,
          type: this.listQuery.type || "",
          startTime: this.startTime || "",
          endTime: this.endTime || ""
        };
        //        console.log('para', para)

        this.listLoading = true;
        Api.testApi.queryCostDetail(util.checkBe(para)).then(res => {
          if (res.code == "0000") {
            if (res.data.orderShopEvs) {
              for (let i = 0; i < res.data.orderShopEvs.length; i++) {
                res.data.orderShopEvs[i].tradeAmount =
                  res.data.orderShopEvs[i].type == "2"
                    ? `+${res.data.orderShopEvs[i].tradeAmount}`
                    : `-${res.data.orderShopEvs[i].tradeAmount}`;
                res.data.orderShopEvs[i].createTime = util.formatDate.format(
                  new Date(res.data.orderShopEvs[i].createTime),
                  "yyyy-MM-dd hh:mm:ss"
                );
                res.data.orderShopEvs[i].type = this.returnTypeValue(
                  res.data.orderShopEvs[i].type
                );
              }
              this.total = res.data.total;
              this.financialList = res.data.orderShopEvs;
              this.listLoading = false
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      returnTypeValue(status) {
        switch (status) {
          case 1:
            return "CPA费用";
          case 2:
            return "充值费用";
          case 3:
            return "提现费用";
          case 4:
            return "第三方短信费用";
          case 5:
            return "第三方身份证识别费用";
          case 6:
            return "第三方手机运营商费用";
          case 7:
            return "第三方芝麻信用";
        }
      }
    },
    mounted() {
      this.queryCostDetail();
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

  .el-date-editor .el-range-separator {
    width: 7% !important;
  }
</style>
