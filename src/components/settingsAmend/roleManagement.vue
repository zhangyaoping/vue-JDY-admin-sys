<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="搜索">
        </el-input>

        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        <el-button type="primary" v-waves @click="showAdd">添加角色</el-button>
      </div>
      <!--列表-->
      <el-table :data="merchantList" border @row-dblclick="showEdit" highlight-current-row v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="roleId" label="角色ID"></el-table-column>
        <el-table-column prop="roleName" label="角色名"></el-table-column>
        <el-table-column prop="resourceInfo" label="资源信息"></el-table-column>
        <el-table-column label="操作类型" width="350">
          <template slot-scope="scope">
            <el-button class="saveBtn-a" type="primary" size="small" @click="showEdit(scope.$index,scope.row)">编辑
            </el-button>
            <el-button class="saveBtn-a" type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--<el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button>-->

        <!--分页-->
        <div v-show="!listLoading" style="float: right" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         background
                         :current-page.sync="listQuery.limit+1"
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.page"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
      <!--新增编辑界面-->
      <el-dialog
        :title="FormTtile"
        :visible.sync="editFormVisible">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="角色ID" prop="roleId">
            <el-input v-model="editForm.roleId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="资源信息" prop="resourceInfo">
            <el-input v-model="editForm.resourceInfo" auto-complete="off"></el-input>
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
  import util from '../../common/util'
  import waves from '@/common/waves/index.js' // 水波纹指令
  import Api from '@/api';
  export default{
    directives: {
      waves
    },
    data(){
      return {
        filters: {
          name: ''
        },
        merchantList: [],
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          type: undefined
        },
        listLoading: false,
        sels: [], //列表选中列
        //编辑相关数据
        FormTtile: '',//新增编辑title
        editFormVisible: false,//新增编辑界面是否显示
        btnEditText: '提 交',
        editLoading: false,
        editFormRules: {
//          name: [
//            {required: true, message: '1', trigger: 'blur'}
//          ],
        },
        //新增编辑数据
        editForm: {
          "roleId": 1,
          "roleCode": null,
          "resourceInfo": null,
          "roleName": "超级管理员"
        },

      }
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.businessist();
      },
      handleSizeChange (val) {
        this.listQuery.limit = val;
        this.businessist();
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.businessist()
      },

      //获取商户列表
      businessist() {
        let para = {
          page: this.listQuery.page,
          name: this.filters.name
        };
        //假数据
        this.total = 20;
        this.merchantList = [{
          "roleId": 1,
          "resourceInfo": '哈哈',
          "roleName": "超级管理员"
        }, {
          "roleId": 2,
          "resourceInfo": '哈哈',
          "roleName": "管理员"
        }];
//            this.listLoading = true;
//            Api.testApi.reqGetBookListPage(para).then(res => {
//               this.total = res.total;
//               this.books = res.books;
//               console.log('ssss', this.books)
//               this.listLoading = false;
//            })
      },

      selsChange: function (sels) {
        this.sels = sels;
      },

      //显示编辑界面
      showAdd: function () {
        this.editFormVisible = true;
        this.FormTtile = '添加商家';
        this.editForm = {
          "roleId": null,
          "resourceInfo": '',
          "roleName": ""
        }
      },
      showEdit: function (index, row) {
        this.editFormVisible = true;
        this.FormTtile = '编辑资料';
        this.editForm = Object.assign({}, row);
        console.log('sd', this.editForm)
      },
      //编辑or新增
      editSubmit: function () {
        var _this = this;
        _this.$refs.editForm.validate((valid) => {
          if (valid) {
            _this.$confirm('确认提交吗？', '提示', {}).then(() => {
              if (!_this.editForm.id) {
                //新增
                this.editLoading = true;

                let para = Object.assign({}, _this.editForm);
                console.log(para)
                Api.testApi.reqEditBook(para).then(res => {
                  this.editLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.businessist();
                });

              } else {
                //编辑
                this.editLoading = true;
                let para = Object.assign({}, this.editForm);
                console.log(para)
                para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
                Api.testApi.reqEditBook(para).then(res => {
                  this.editLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.businessist();
                });

              }
            });
          }
        });
      },
      //删除
      deleteUser (index, row) {
        this.$confirm('确认删除吗?', '提示', {type: 'warning'}).then(() => {
//          let para = {id: row.id};
//          Api.testApi.reqDeleteBook(para).then(res => {
//            this.$message({
//              message: '删除成功',
//              type: 'success'
//            });
//            this.businessist();
//          });
        }).catch(() => {
        });
      },

    },
    mounted() {
      this.businessist();
    },
    components: {},
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .saveBtn-a {
    width: 70px;
  }

  .filter-container {
    padding: 20px 0;
  }
</style>
