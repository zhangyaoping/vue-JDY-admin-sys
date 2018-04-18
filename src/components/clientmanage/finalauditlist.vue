<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>终审列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.cusMobile" style="width: 200px;"
                  class="filter-item"
                  placeholder="手机号">
        </el-input>
        <el-button @click.stop="on_refresh" class="filter-item" size="small" style="font-size: 16px;" plain v-waves
                   icon="el-icon-refresh"></el-button>
        <el-button class="filter-item" style="width: 90px;" type="primary" v-waves icon="el-icon-search"
                   @click="handleFilter">
          搜索
        </el-button>
      </div>

      <!--列表-->
      <el-table :data="borrowinglist" border highlight-current-row element-loading-text="拼命加载中" v-loading="listLoading"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column width="65" prop="cusName" label="姓名"></el-table-column>
        <el-table-column width="115" prop="cusMobile" label="手机号"></el-table-column>
        <el-table-column width="50" prop="cusAge" label="年龄"></el-table-column>
        <el-table-column width="50" prop="cusSex" label="性别"></el-table-column>
        <el-table-column prop="createTime" label="申请时间" min-width="170"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain
                       @click="pushUser(scope.row)">推送
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--分页-->
        <div v-show="!listLoading" style="float: right" class="pagination-container">
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
  import sessionStorage from '@/storage/sessionStorage'
  import proConfig from '../../config';

  const platformName = [
    {key: "0", status: "待打款"},
    {key: "1", status: "打款成功"},
    {key: "5", status: "取消订单"}
  ];

  // arr to obj
  const platformNameKeyValue = platformName.reduce((acc, cur) => {
    acc[cur.key] = cur.status;
  return acc;
  }, {});
  export default {
    directives: {
      waves
    },
    data() {
      return {
        dialogVisible: false,
        search: {
          loanId: "",
          cusMobile: ""
        },
        value1: '',
        borrowinglist: [],
        receiptdata: [],
        current_time: '',
        end_time: '',
        lnterest: '',
        platformName,
        total: 0,
        listQuery: {
          page: 15,
          limit: 1,
          type: undefined,
          startTime: "",
          endTime: ""
        },
        listLoading: false,
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
      };
    },
    filters: {
      typeFilter(type) {
        return platformNameKeyValue[type];
      }
    },
    created() {
      this._getFinalCusCustomer();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this._getFinalCusCustomer();
      },
      handleFilter() {
        this._getFinalCusCustomer();
      },
      on_refresh() {
        this.search.loanId = '';
        this.search.cusMobile = '';
        this.listQuery.type = '';
        this.timeQuantum = null;
        this._getFinalCusCustomer()
      },
      //获取参数列表-
      _getFinalCusCustomer() {
        let startTime = null;
        let endTime = null;
        if (this.timeQuantum) {
          startTime = util.formatDate.format(
            new Date(this.timeQuantum[0]),
            "yyyy-MM-dd hh:mm:ss"
          );
          endTime = util.formatDate.format(
            new Date(this.timeQuantum[1]),
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        let para = {
          pSize: this.listQuery.page,
          pNum: this.listQuery.limit,
          loanId: this.search.loanId,
          cusMobile: this.search.cusMobile,
          loanStatus: this.listQuery.type,
          startTime: startTime,
          endTime: endTime
        };
        this.listLoading = true;
        Api.testApi.getFinalCusCustomer(util.checkBe(para)).then(res => {
          if (res.code == '0000') {
          if (res.data) {
            if (res.data.customers) {
              for (let i = 0; i < res.data.customers.length; i++) {
                res.data.customers[i].cusInfo = JSON.parse(res.data.customers[i].cusInfo);
                res.data.customers[i].createTime = util.formatDate.format(
                  new Date(res.data.customers[i].createTime),
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              this.total = res.data.total;
              this.borrowinglist = res.data.customers;
              this.listLoading = false
            }
          } else {
            this.total = 0
            this.listLoading = false
            this.borrowinglist = [];
          }
        }
      });
      },
      pushUser(row){
        this.$confirm('确认推送吗?', '提示', {type: 'success'}).then(() => {
          let para = {
            cusIds: row.cusId,
          };
          Api.testApi.convertCustomer(para).then(res => {
            if (res.code == '0000') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this._getFinalCusCustomer()
            }
          });
        })
      },
      //返回表格内标签的类型
      returnTagType(status) {
        switch (status) {
          case 0:
            return "primary";
          case 1:
            return "success";
          case 5:
            return "info";
        }
      },
      //返回表格内标签的内容
      returnTagValue(status) {
        switch (status) {
          case 0:
            return "待打款";
          case 1:
            return "打款成功";
          case 5:
            return "取消订单";
        }
      },
      //操作按钮是否可以点击
      isBtnTg(row) {
        return row.loanStatus == 0 ? false : true;
      }
    },
    components: {}
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .inputss {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    font-size: 14px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  .bills-box {
    height: 100%;
    padding: 0.3rem;
    .bills {
      height: 40px;
      line-height: 40px;
      background-color: #e5e5e5;
      border-radius: 10px 10px 0 0;
      color: #666666;
      font-size: 16px;
      padding-left: 25px;
      text-align: center;
    }
    .wp-box {
      padding: 0 25px;
      background-color: #ffffff;
      .wp {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        p {
          font-size: 16px;
          .span-a {
            color: #999999;
            margin-right: 10px;
          }
        }
      }
      .wp-p {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        .span-a {
          color: #999999;
          margin-right: 10px;
        }
      }
    }
    .wp-boxs {
      padding: 40px 25px;
      /*background: url("../borrowingmanage/img/jt-bg1.png") center no-repeat;*/
      background-size: 100%;
      .wp-ps {
        height: 50px;
        line-height: 0.5rem;
        font-size: 16px;
        .span-a {
          color: #999999;
          margin-right: 10px;
        }
      }
    }
  }

  .demo-table-expand label {
    font-weight: bold;
  }

  .filter-container {
    padding: 20px 0;
    line-height: 50px;
  }

</style>
