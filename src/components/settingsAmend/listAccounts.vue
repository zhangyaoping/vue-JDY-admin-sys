<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.userMobile" style="width: 200px;"
                  class="filter-item"
                  placeholder="用户名称">
        </el-input>
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.realName" style="width: 200px;"
                  class="filter-item"
                  placeholder="真实姓名">
        </el-input>
        <el-button @click.stop="on_refresh" class="filter-item" size="small" style="font-size: 16px;" plain v-waves
                   icon="el-icon-refresh"></el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button type="primary" icon='el-icon-plus' v-waves @click="showAdd">添加账户</el-button>
      </div>

      <!--列表-->
      <el-table :data="userList" border @row-dblclick="showEdit" highlight-current-row v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="userId" label="用户编号"></el-table-column>
        <el-table-column prop="userMobile" label="用户名称"></el-table-column>
        <el-table-column prop="sysRoleId" label="账户角色"></el-table-column>
        <el-table-column prop="realName" label="真实姓名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作类型" width="350">
          <template slot-scope="scope">
            <el-button class="saveBtn-a" type="primary" size="small" @click="showEdit(scope.$index,scope.row)">编辑
            </el-button>
            <el-button class="saveBtn-a" type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
            <el-button class="saveBtn-a" type="primary" plain size="small" @click="resetPwd(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--<el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button>-->

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
      <!--新增编辑界面-->
      <el-dialog
        :title="FormTtile"
        :visible.sync="editFormVisible">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item v-if="editForm.userId" label="用户名称" prop="userMobile">
            <el-input :disabled="true" v-model="editForm.userMobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-else label="用户名称" prop="userMobile">
            <el-input v-model="editForm.userMobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="editForm.realName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="user_type">
            <template>
              <el-select v-model="editForm.sysRoleId" placeholder="请选择">
                <el-option label="超级管理员" :value="1"></el-option>
                <el-option label="运营主管" :value="2"></el-option>
                <el-option label="运营专员" :value="3"></el-option>
                <el-option label="财务人员" :value="4"></el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">
            {{btnEditText}}
          </el-button>
        </div>
      </el-dialog>
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
          realName: "",
          userMobile: ""
        },
        sysRoleId: "",
        roleList: [],
        userList: [],
        total: 0,
        listQuery: {
          page: 10,
          limit: 1
        },
        listLoading: false,
        sels: [], //列表选中列
        //编辑相关数据
        FormTtile: "", //新增编辑title
        editFormVisible: false, //新增编辑界面是否显示
        btnEditText: "提 交",
        editLoading: false,
        editFormRules: {
          //          name: [
          //            {required: true, message: '1', trigger: 'blur'}
          //          ],
        },
        //新增编辑数据
        editForm: {
          userId: null,
          userMobile: "",
          realName: "",
          sysRoleId: ""
        }
      };
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this.listAccounts();
      },
      handleFilter() {
        this.listAccounts();
      },
      on_refresh(){
        this.search.realName = '',
          this.search.userMobile = ''
        this.listAccounts()
      },

      //获取账户列表
      listAccounts() {
        let para = {
          pSize: this.listQuery.page,
          pNum: this.listQuery.limit,
          realName: this.search.realName,
          userMobile: this.search.userMobile
        };

        Api.testApi.userList(util.checkBe(para)).then(res => {
          if (res.code == "0000") {
            if (res.data.list) {
              let resData = res.data.list;
              for (let i = 0; i < resData.length; i++) {
                resData[i].createTime = util.formatDate.format(
                  new Date(resData[i].createTime),
                  "yyyy-MM-dd"
                );
                resData[i].sysRoleId = this.returnVal(resData[i].sysRoleId);
              }
              this.total = res.data.total;
              this.userList = resData;
            }
          } else {
            this.$message(res.msg);
          }
        });
      },
      //获取所有角色信息
      getAllRoles() {
        Api.testApi.getAllRoles().then(res => {
          let resData = res.data;
          if (resData) {
            this.roleList = resData;
          }
        });
      },

      selsChange: function (sels) {
        this.sels = sels;
      },

      //显示编辑界面
      showAdd: function () {
        this.editFormVisible = true;
        this.FormTtile = "添加";
        this.editForm = {
          userMobile: "",
          realName: "",
          sysRoleId: ""
        };
      },
      showEdit: function (index, row) {
        this.editFormVisible = true;
        this.FormTtile = "编辑";
        this.editForm = Object.assign({}, row);
      },
      //编辑or新增
      editSubmit: function () {
        var _this = this;
        _this.$refs.editForm.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              if (!_this.editForm.userId) {
                //新增
                let para = Object.assign({}, _this.editForm);

                Api.testApi.addUser(para).then(res => {
                  if (!res.code == "0000") {
                    this.$message(res.msg);
                  } else {
                    this.$message({
                      message: "提交成功",
                      type: "success"
                    });
                    this.$refs["editForm"].resetFields();
                    this.editFormVisible = false;
                    this.listAccounts();
                  }
                });
              } else {
                //编辑
                //                let para = Object.assign({}, this.editForm)
                let para = {
                  userId: _this.editForm.userId,
                  sysRoleId: _this.returnVal1(_this.editForm.sysRoleId),
                  realName: _this.editForm.realName
                };

                Api.testApi.changeUser(para).then(res => {
                  if ((res.code = "0000")) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.$refs["editForm"].resetFields();
                    this.editFormVisible = false;
                    this.listAccounts();
                  } else {
                    this.$message.error(res.msg);
                  }
                });
              }
            });
          }
        });
      },
      //删除
      deleteUser(row) {
        this.$confirm("确认删除吗?", "提示", {type: "warning"})
          .then(() => {
            let para = {userId: row.userId};

            Api.testApi.delateUser(para).then(res => {
              if ((res.code = "0000")) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.listAccounts();
              } else {
                this.$message.error(res.msg);
              }
            });
          })
          .catch(() => {
          });
      },
      resetPwd(row) {
        this.$confirm("确认重置密码吗?", "提示", {type: "warning"})
          .then(() => {
            let para = {
              sysUserId: sessionStorage.$getSessionStorageByName("userId"),
              userId: row.userId
            };

            //          console.log('sssss',para)
            Api.testApi.resetPwd(para).then(res => {
              if ((res.code = "0000")) {
                this.$message({
                  message: "重置密码成功",
                  type: "success"
                });
                this.listAccounts();
              } else {
                this.$message.error(res.msg);
              }
            });
          })
          .catch(() => {
          });
      },
      //角色选择
      currentSelectFun(data) {
        //        console.log(data);
      },
      returnVal(val) {
        switch (val) {
          case 1:
            return "超级管理员";
          case 2:
            return "运营主管";
          case 3:
            return "运营专员";
          case 4:
            return "财务人员";
        }
      },
      returnVal1(val) {
        switch (val) {
          case "超级管理员":
            return "1";
          case "运营主管":
            return "2";
          case "运营专员":
            return "3";
          case "财务人员":
            return "4";
        }
      }
    },
    mounted() {
      this.listAccounts();
      this.getAllRoles();
    },
    components: {}
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .filter-container {
    padding: 20px 0;
  }
</style>
