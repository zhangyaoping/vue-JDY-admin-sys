<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>复审列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <!--<el-input clearable @keyup.enter.native="handleFilter" v-model="search.inviteCode" style="width: 200px;"-->
        <!--class="filter-item"-->
        <!--placeholder="代理编号">-->
        <!--</el-input>-->

        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.cusMobile" style="width: 200px;"
                  class="filter-item"
                  placeholder="手机号">
        </el-input>
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.cusName" style="width: 200px;"
                  class="filter-item"
                  placeholder="用户姓名">
        </el-input>
        <!--<el-input clearable @keyup.enter.native="handleFilter" v-model="search.auditUserName" style="width: 200px;"-->
        <!--class="filter-item"-->
        <!--placeholder="认领人">-->
        <!--</el-input>-->
        <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="审核状态">
          <el-option v-for="item in platformName" :key="item.key" :label="item.status"
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
        <el-button class="filter-item" style="width: 90px;" type="primary" v-waves icon="el-icon-search"
                   @click="handleFilter">
          搜索
        </el-button>
      </div>
      <!--列表-->
      <el-table :data="userAuditlist" border highlight-current-row element-loading-text="拼命加载中" v-loading="listLoading"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <!--<el-table-column type="index" width="60"></el-table-column>-->
        <el-table-column prop="cusMobile" width="115" label="手机号"></el-table-column>
        <el-table-column prop="inviteCode" width="110" label="代理编号"></el-table-column>
        <el-table-column prop="cusName" width="65" label="姓名"></el-table-column>
        <el-table-column prop="cusAge" width="50" label="年龄"></el-table-column>
        <el-table-column prop="cusSex" width="50" label="性别"></el-table-column>
        <el-table-column prop="device" width="80" label="设备">
          <template slot-scope="scope">
            {{returnDeviceVal(scope.row.device)}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="160"></el-table-column>
        <el-table-column prop="serviceUserName" width="65" label="客服"></el-table-column>
        <el-table-column prop="auditUserName" width="80" label="信审人员"></el-table-column>
        <el-table-column prop="remark" min-width="150" label="备注"></el-table-column>
        <el-table-column width="100" prop="auditStatus" label="审核状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="returnTagType(scope.row.auditStatus)"
              close-transition>{{returnTagValue(scope.row.auditStatus)}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="320">
          <template slot-scope="scope">
            <!--:disabled="isBtnTg(scope.row)"-->
            <el-button size="mini" type="primary" plain @click="pushUser(scope.row)">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--分页-->
        <div v-show="userAuditlist.length" style="float: right" class="pagination-container">
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
  import util from '../../common/util'
  import waves from '@/common/waves/index.js' // 水波纹指令
  import Api from '@/api';
  import sessionStorage from '@/storage/sessionStorage'
  import proConfig from '../../config';

  const platformName = [
    {key: '2', status: '待审核'},
    {key: '3', status: '已通过'},
    {key: '4', status: '已拒绝'},
  ]

  // arr to obj
  const platformNameKeyValue = platformName.reduce((acc, cur) => {
    acc[cur.key] = cur.status
    return acc
  }, {})
  export default {
    directives: {
      waves
    },
    data() {
      return {
        search: {
//          inviteCode: '',
          auditUserName: '',
          cusMobile: '',
          cusName:''

        },
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
        userAuditlist: [],
        platformName,
        total: 0,
        listQuery: {
          page: 15,
          limit: 1,
          type: '',
          startTime: '',
          endTime: '',
        },
        listLoading: false,
      }
    },
    filters: {
      typeFilter(type) {
        return platformNameKeyValue[type]
      }
    },
    created() {
      this._getReviewCusCustomer();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this._getReviewCusCustomer()
      },
      handleFilter() {
        this.listQuery.limit=1
        this._getReviewCusCustomer()
      },
      on_refresh() {
//        this.search.inviteCode = '';
        this.search.auditUserName = '';
        this.search.cusMobile = '';
        this.search.cusName='';
        this.listQuery.type = '';
        this.timeQuantum = null;
        this._getReviewCusCustomer()
      },
      //获取参数列表-
      _getReviewCusCustomer() {
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
//          inviteCode: this.search.inviteCode,
          auditUserName: this.search.auditUserName,
          cusMobile: this.search.cusMobile,
          cusName:this.search.cusName,
          auditStatus: this.listQuery.type || "",
          startTime: startTime || "",
          endTime: endTime || ""
        };
        this.listLoading = true;
        Api.testApi.getReviewCusCustomer(util.checkBe(para)).then(res => {
          if (res.code == '0000') {
            if (res.data) {
              if (res.data.customers) {
                let resData = res.data.customers;
                this.total = res.data.total;
                for (let i = 0; i < resData.length; i++) {
                  resData[i].createTime = util.formatDate.format(new Date(resData[i].createTime), 'yyyy-MM-dd hh:mm:ss')
                }
                this.userAuditlist = res.data.customers;
                this.listLoading = false;
              }
            } else {
              this.userAuditlist = [];
              this.total = 0
              this.listLoading = false
            }
          }
        })
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
              this._getReviewCusCustomer()
            }
          });
        })
      },
      //返回表格内标签的类型
      returnTagType(status) {
        switch (status) {
          case 1:
            return 'success';
          case 2:
            return 'info';
          case 3:
            return '';
          case 4:
            return 'danger'
        }
      },
      //返回表格内标签的内容
      returnTagValue(status) {
        switch (status) {
          case 1:
            return '待认领';
          case 2:
            return '待审核'
          case 3:
            return '已通过'
          case 4:
            return '已拒绝'
        }
      },
      //返回设备来源来源0：苹果，1：安卓，2其他
      returnDeviceVal(Device) {
        switch (Device) {
          case 0:
            return '苹果'
          case 1:
            return '安卓'
          default:
            return '其他'
        }
      },
      //操作按钮是否可以点击
      isBtnTg(row) {
        return row.auditStatus == 3 || row.auditStatus == 4 ? true : false;
      },
    },
    components: {},
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .demo-table-expand label {
    font-weight: bold;
  }

  .filter-container {
    padding: 20px 0;
    line-height: 50px;
  }

</style>
