<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商户管理</el-breadcrumb-item>
        <el-breadcrumb-item>商户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.shopId" style="width: 200px;"
                  class="filter-item"
                  placeholder="商家编号">
        </el-input>
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.shopName" style="width: 200px;"
                  class="filter-item"
                  placeholder="商家名称">
        </el-input>
        <el-button @click.stop="on_refresh" class="filter-item" size="small" style="font-size: 16px;" plain v-waves
                   icon="el-icon-refresh"></el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" v-waves @click="showAddDialog">添加商家</el-button>
        <el-button type="primary" icon="el-icon-edit-outline" v-waves @click="showModifySmsChannel">修改短信通道</el-button>
      </div>

      <!--列表-->
      <el-table :data="merchantList" highlight-current-row
                element-loading-text="拼命加载中" v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="shopId" label="商家编号"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="shopName" label="商家名称"></el-table-column>
        <el-table-column prop="accountAmount" label="可用余额"></el-table-column>
        <el-table-column prop="freezeAmount" label="冻结金额"></el-table-column>
        <template>
          <el-table-column prop="shopInfo.contact_name" label="联系人"></el-table-column>
          <el-table-column prop="shopInfo.contact_mobile" label="联系人手机"></el-table-column>
        </template>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="returnTagType(scope.row.status)"
              close-transition>{{returnTagValue(scope.row.status)}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作类型" width="400">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="openORclose(scope.$index,scope.row)">
              {{scope.row.status==1?'关闭运营':'开始运营'}}
            </el-button>
            <el-button type="primary" size="small" @click="showEditDialog(scope.$index,scope.row)">编辑资料</el-button>
            <el-button size="small" type="primary" plain @click="parameterConfect(scope.row)">参数配制</el-button>
            <el-button type="primary" :disabled="isBtnTg(scope.row)" size="small"
                       @click="thelinkUrl(scope.$index,scope.row)">生成链接
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--<el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button>-->

        <!--分页-->
        <div v-show="merchantList.length" style="float: right" class="pagination-container">
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

          <el-form-item label="LOGO">
            <el-upload
              ref="uploadLogo"
              :action="apiUrl"
              list-type="picture-card"
              :headers="myHeaders"
              :class="{'disabled':isDisabled}"
              :on-success="SuccessLogo"
              :on-preview="handleLogo"
              :before-upload="beforeAvatarUpload"
              :on-remove="RemoveLogo">
              <img v-if="editForm.logo_url" :src="editForm.logo_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog append-to-body :visible.sync="innerVisible1">
              <img width="100%" :src="editForm.logo_url" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="注册页背景">
            <el-upload
              ref="uploadRegBanner"
              :action="apiUrl"
              list-type="picture-card"
              :headers="myHeaders"
              :class="{'disabled':isDisabled}"
              :on-success="SuccessRegBanner"
              :on-preview="handleRegBanner"
              :before-upload="beforeAvatarUpload"
              :on-remove="RemoveRegBanner">
              <img v-if="editForm.register_banner_url" :src="editForm.register_banner_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog append-to-body :visible.sync="innerVisible3">
              <img width="100%" :src="editForm.register_banner_url" alt="">
            </el-dialog>
          </el-form-item>
          <div class="uploadingImg">
            <el-form-item label="Banner1">
              <el-upload
                ref="uploadBanner"
                :action="apiUrl"
                list-type="picture-card"
                :headers="myHeaders"
                :class="{'disabled':isDisabled}"
                :on-success="SuccessBanner"
                :on-preview="handleBanner"
                :before-upload="beforeAvatarUpload"
                :on-remove="RemoveBanner">
                <img v-if="editForm.banner_url" :src="editForm.banner_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="innerVisible2">
                <img width="100%" :src="editForm.banner_url" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="Banner2">
              <el-upload
                ref="uploadBanner2"
                :action="apiUrl"
                list-type="picture-card"
                :headers="myHeaders"
                :class="{'disabled':isDisabled}"
                :on-success="SuccessBanner2"
                :on-preview="handleBanner2"
                :before-upload="beforeAvatarUpload"
                :on-remove="RemoveBanner2">
                <img v-if="editForm.banner_url_1" :src="editForm.banner_url_1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="innerVisible4">
                <img width="100%" :src="editForm.banner_url_1" alt="">
              </el-dialog>
            </el-form-item>
          </div>
          <el-row class="warp" style="display: flex;">
            <el-col :span="12">
              <el-form-item label="商家名称" prop="shopName">
                <el-input v-model="editForm.shopName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="产品名称" prop="productName">
                <el-input v-model="editForm.productName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contact_name">
                <el-input v-model="editForm.contact_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机" prop="contact_mobile">
                <el-input v-model="editForm.contact_mobile" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="分配总量" prop="allotCount">
                <el-input type="number" v-model.number="editForm.allotCount" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账户" prop="bank_account">
                <el-input v-model="editForm.bank_account" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="bank_name">
                <el-input v-model="editForm.bank_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户人姓名" prop="bank_account_name">
                <el-input v-model="editForm.bank_account_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否开启推量" prop="account_type">
                <template>
                  <el-select v-model="editForm.allotSwitch" placeholder="请选择">
                    <el-option label="开启" :value="1"></el-option>
                    <el-option label="关闭" :value="0"></el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="客服分配量上限" prop="serviceCount">
                <el-input type="number" v-model.number="editForm.serviceCount" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="IP地址" prop="whiteList">
                <el-input type="textarea" v-model="editForm.whiteList" auto-complete="off" placeholder="192.168.0.1,192.168.100.0/24,172.16.0.0/16"></el-input>
                <div class="el-form-item__error">格式：192.168.0.1,192.168.100.0/24,172.16.0.0/16</div>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-form-item label="账户类型" prop="account_type">-->
          <!--<template>-->
          <!--<el-select v-model="editForm.account_type" placeholder="请选择">-->
          <!--<el-option label="对公" :value="1"></el-option>-->
          <!--<el-option label="对私" :value="0"></el-option>-->
          <!--</el-select>-->
          <!--</template>-->
          <!--</el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">
            {{btnEditText}}
          </el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="推广链接"
        :visible.sync="dialogVisible1"
        width="50%">
        <div class="links_url">
          <span>商户登录链接</span>
          <el-input v-model="linkurl" id="biao1" placeholder="请输入内容"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="complexsystem">复 制</el-button>
          </div>
        </div>
        <div class="links_url">
          <span>商户推广链接</span>
          <el-input v-model="linkurl_1" id="biao2" placeholder="请输入内容"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="complexsystem1">复 制</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="修改短信通道"
        :visible.sync="revampSms"
        width="50%">
        <div class="radio-box">
          <el-radio-group v-model="radioRevampSms" @change="changeHandler">
            <el-radio sizi="mini" class="radio" label="1" border>创蓝短信</el-radio>
            <el-radio sizi="mini" class="radio" label="2" border>阿里云短信</el-radio>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="revampSms = false">取 消</el-button>
          <el-button size="mini"  type="primary" @click="subRevampSms">确 定</el-button>
        </span>
      </el-dialog>

    </el-col>
  </el-row>
</template>
<script>
  import util from "../../common/util";
  import waves from "@/common/waves/index"; // 水波纹指令
  import sessionStorage from "@/storage/sessionStorage";
  import proConfig from '@/config';
  import Api from "@/api";

  export default {
    directives: {
      waves
    },
    data() {
      return {
        //图片上传
        innerVisible1: false,
        innerVisible2: false,
        innerVisible3: false,
        innerVisible4: false,
        radioRevampSms:'1',
        myHeaders: {
          tokenId: sessionStorage.$getSessionStorageByName("tokenId")
        }, // 要保证取到
        limitsImg: 1,
        apiUrl: proConfig.apiUrl + '/sys/shop/uploadImg',
        search: {
          shopId: "",
          shopName: ""
        },
        merchantList: [],
        total: 0,
        listQuery: {
          page: 10,
          limit: 1,
          shopId: "",
          startTime: "",
          endTime: "",
          type: undefined
        },
        listLoading: false,
        sels: [], //列表选中列
        //编辑相关数据
        FormTtile: "", //新增编辑title
        editFormVisible: false, //新增编辑界面是否显示
        dialogVisible1: false,
        revampSms: false,
        linkurl: '',
        linkurl_1: '',
        btnEditText: "提 交",
        editLoading: false,
        editFormRules: {
          shopName: [
            {required: true, message: '请填写商家名称！', trigger: 'blur'}
          ],
          bank_account: [
            {required: true, message: '请填写银行账户！', trigger: 'blur'}
          ],
          productName: [
            {required: true, message: '请填写产品名称！', trigger: 'blur'}
          ],
          bank_name: [
            {required: true, message: '请填写开户行！', trigger: 'blur'}
          ],
          contact_name: [
            {required: true, message: '请填写联系人姓名！', trigger: 'blur'}
          ],
          bank_account_name: [
            {required: true, message: '请填写开户人姓名！', trigger: 'blur'}
          ],
          contact_mobile: [
            {required: true, message: '请填写联系人手机！', trigger: 'blur'}
          ],
        },
        //新增编辑数据
        editForm: {
          shopId: null,
          logo_url: "", //上传logo图片
          banner_url: "", //上传banner图片
          banner_url_1: "", //上传banner图片
          register_banner_url: "", //上传注册banner图片
          shopName: "", //商家名称
          productName: "", //产品名称
          contact_name: "", //联系人
          bank_account: "", //银行账户
          bank_name: "", //开户行
          bank_account_name: "", //开户人姓名
          contact_mobile: "", //联系人手机
          account_type: "", //账户类型
          allotSwitch:"",
          allotCount:null,//分配总量
          serviceCount:null,//客服分配量
          whiteList:""
        }
      };
    },
    watch: {
      editFormVisible: "querydata"
    },
    computed: {
      isDisabled() {
        return this.limitsImg >= 1;
      }
    },
    created() {
    },
    methods: {
      thelinkUrl(index, row) {
        this.dialogVisible1 = true;
        this.linkurl = `http://jdy.jdyservice.com/shop/index.html#/login?productCode=${row.productCode}`
        this.linkurl_1 = `http://jdy.jdyservice.com/#/proxyreg?shopId=${row.shopId}`
      },
      complexsystem() {
        var Url2 = document.getElementById("biao1");
        Url2.select(); // 选择对象
        document.execCommand("Copy")
        this.dialogVisible1 = false;
        this.$message({
          message: "复制成功!",
          type: "success"
        });
      },
      complexsystem1() {
        var Url2 = document.getElementById("biao2");
        Url2.select(); // 选择对象
        document.execCommand("Copy")
        this.dialogVisible1 = false;
        this.$message({
          message: "复制成功!",
          type: "success"
        });
      },

      querydata() {
        if (this.editFormVisible) {
          console.log("hhh", this.editFormVisible);
        } else {
          this.clearUploadedImage();
        }
      },
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this.businessist();
      },
      handleFilter() {
        this.businessist();
      },
      //刷新
      on_refresh() {
        this.search.shopId = '';
        this.search.shopName = '';
        this.businessist()
      },
      //获取商户列表
      businessist() {
        let para = {
          pSize: this.listQuery.page,
          pNum: this.listQuery.limit,
          shopId: this.search.shopId,
          shopName: this.search.shopName
        };
        this.listLoading = true;
        Api.testApi.queryShopList(util.checkBe(para)).then(res => {
          if (res.code == "0000") {
            if (res.data.list) {
              for (let i in res.data.list) {
                res.data.list[i].shopInfo = JSON.parse(res.data.list[i].shopInfo);
                res.data.list[i].shopInfo.allotCount = res.data.list[i].shopInfo.allotCount?res.data.list[i].shopInfo.allotCount:0
                res.data.list[i].shopInfo.serviceCount = res.data.list[i].shopInfo.serviceCount?res.data.list[i].shopInfo.serviceCount:0
                res.data.list[i].shopInfo.account_type = this.returnVal(
                  res.data.list[i].shopInfo.account_type
                );
              }
              //          this.merchantList.push(Object.assign({}, list[0], JSON.parse(list[0].shopInfo)))
              this.total = res.data.total;
              this.radioRevampSms=res.data.sendPlatform
              this.merchantList = res.data.list;
              this.listLoading = false;
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      parameterConfect(row) {
        sessionStorage.$removeSessionStorageByName("shopId", row.shopId);
        sessionStorage.$setSessionStorageByName("shopId", row.shopId);
        this.$router.push({path: "/parameterConfect"});
      },
      selsChange: function (sels) {
        this.sels = sels;
      },

      //显示新增界面
      showAddDialog: function () {
        this.editFormVisible = true;
        this.FormTtile = "添加商家";
        this.btnEditText = "提交";
        this.editForm = {
          logo_url: "", //上传logo图片
          banner_url: "", //上传banner图片
          banner_url_1: "", //上传banner图片
          register_banner_url: "", //上传banner图片
          shopName: "", //公司名称
          productName: "", //平台名称
          contact_name: "", //联系人
          bank_account: "", //银行账户
          bank_name: "", //开户行
          bank_account_name: "", //开户人姓名
          contact_mobile: "", //联系人手机
          // account_type: "", //账户类型
          allotSwitch:"",
          allotCount:0,
          serviceCount:0,
          whiteList:""
        };
      },
      //显示编辑界面
      showEditDialog: function (index, row) {
        this.editFormVisible = true;
        this.FormTtile = "编辑资料";
        this.btnEditText = "保存";
        //        this.editForm = Object.assign({}, row);
        console.log(row);
        this.editForm = {
          shopId: row.shopId, //1
          logo_url: row.shopInfo.logo_url, //上传logo图片
          banner_url: row.shopInfo.banner_url, //上传banner图片
          banner_url_1: row.shopInfo.banner_url_1, //上传banner图片
          register_banner_url: row.shopInfo.register_banner_url, //上传推广banner图片
          productName: row.productName, //产品名称1
          shopName: row.shopName, //商户名称1
          contact_name: row.shopInfo.contact_name, //联系人1
          bank_account: row.shopInfo.bank_account, //银行账户1
          bank_name: row.shopInfo.bank_name, //开户行1
          bank_account_name: row.shopInfo.bank_account_name, //开户人姓名
          contact_mobile: row.shopInfo.contact_mobile, //联系人手机1
          // account_type: row.shopInfo.account_type, //账户类型1
          allotSwitch: row.allotSwitch, //账户类型1
          allotCount:row.shopInfo.allot_count,
          serviceCount:row.shopInfo.service_count,
          whiteList:row.shopInfo.white_list
        };
      },
      //      清空file
      clearUploadedImage() {
        this.$refs.uploadLogo.clearFiles();
        this.$refs.uploadBanner.clearFiles();
        this.$refs.uploadBanner2.clearFiles();
        this.$refs.uploadRegBanner.clearFiles();
      },
      //上传logo
      RemoveLogo(file, fileList) {
        this.editForm.logo_url = "";
        //        console.log(file, fileList);
      },
      handleLogo(file) {
        this.editForm.logo_url = file.url;
        console.log("logo", this.editForm.logo_url);
        this.innerVisible1 = true;
      },

      async SuccessLogo(response) {
        this.editForm.logo_url = await response.data;
      },
      //      上传banner
      RemoveBanner(file, fileList) {
        this.editForm.banner_url = "";
        // console.log('file', file);
      },
      handleBanner(file) {
        this.editForm.banner_url = file.url;
        console.log("banner", this.editForm.banner_url);
        this.innerVisible2 = true;
      },
      async SuccessBanner(response) {
        this.editForm.banner_url = await response.data;
      },
      RemoveBanner2(file, fileList) {
        this.editForm.banner_url_1 = "";
        // console.log('file', file);
      },
      handleBanner2(file) {
        this.editForm.banner_url_1 = file.url;
        console.log("banner", this.editForm.banner_url_1);
        this.innerVisible4 = true;
      },
      async SuccessBanner2(response) {
        this.editForm.banner_url_1 = await response.data;
      },
      //      上传推广banner
      RemoveRegBanner(file, fileList) {
        this.editForm.register_banner_url = "";
        // console.log('file', file);
      },
      handleRegBanner(file) {
        this.editForm.register_banner_url = file.url;
        console.log("banner", this.editForm.register_banner_url);
        this.innerVisible3 = true;
      },
      async SuccessRegBanner(response) {
        this.editForm.register_banner_url = await response.data;
      },
      beforeAvatarUpload(file) {
        const isRightType =
          file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isRightType) {
          this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isRightType && isLt2M;
      },
      //编辑or新增
      editSubmit: function () {
        var _this = this;
        console.log('res',_this.editForm)
        _this.$refs.editForm.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              if(_this.editForm.allotCount<0||_this.editForm.allotCount==undefined) {
                this.$message({
                  message: "分配量不能小于0！",
                  type: "warning"
                });
                return
              }
              if(_this.editForm.serviceCount<0||_this.editForm.serviceCount==undefined) {
                this.$message({
                  message: "客服分配量不能小于0！",
                  type: "warning"
                });
                return
              }
              if (!_this.editForm.shopId) {
                //新增
                let para = Object.assign({}, _this.editForm);
                Api.testApi.baseInfo(para).then(res => {
                  if (res.code == "0000") {
                    this.$message({
                      message: "提交成功",
                      type: "success"
                    });
                    this.businessist();
                    this.editFormVisible = false;
                    this.$refs["editForm"].resetFields();
                  } else {
                    this.$message.error(res.msg);
                  }
                });
              } else {
                //编辑
                let para = Object.assign({}, this.editForm);
                Api.testApi.changeBaseInfo(para).then(res => {
                  if (res.code == "0000") {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.$refs["editForm"].resetFields();
                    this.businessist();
                    this.editFormVisible = false;
                  } else {
                    this.$message.error(res.msg);
                  }
                });
              }
            });
          }
        });
      },
      //开启关闭状态
      openORclose: function (index, row) {
        //        console.log('state', row.state)
        this.$confirm(row.status == 1 ? "确认关闭吗?" : "确认开启吗", "提示", {
          type: "warning"
        }).then(() => {
            let para = {
              status: row.status == 1 ? 3 : 1,
              shopId: row.shopId,
              allotSwitch:row.status == 1?0:1
            };
            Api.testApi.shopService(para).then(res => {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.businessist();
            });
          })
          .catch(() => {
          });
      },
      //显示修改短信通道
      showModifySmsChannel(){
        this.revampSms=true
      },
      subRevampSms(){
        let para={
          type:this.radioRevampSms
        }
        Api.testApi.changeSmsSendPlatform(para).then(res=>{
          if(res.code==='0000') {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.revampSms=false
            this.businessist()
          }
        })
      },
      changeHandler(val) {
        console.log('val',val)
      },
      //操作按钮是否可以点击
      isBtnTg(row) {
        return (row.status == 1) ? false : true;
      },
      //返回表格内标签的类型
      returnTagType(status) {
        switch (status) {
          case 1:
            return "primary";
          case 3:
            return "info";
        }
      },
      //返回表格内标签的内容
      returnTagValue(status) {
        switch (status) {
          case 0:
            return "待上架";
          case 1:
            return "运营中";
          case 2:
            return "冻结中";
          case 3:
            return "已关闭";
        }
      },
      returnVal(val) {
        switch (val) {
          case "0":
            return "对私";
          case "1":
            return "对公";
        }
      }
    },
    mounted() {
      this.businessist();
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

  /*图片上传*/

  .el-upload--picture-card img {
    width: 100%;
    height: 100%;
  }

  .disabled {
    width: 80px;
    height: 80px;
    overflow: hidden;
  }

  .uploadingImg {
    display: flex;
  }

  .links_url {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    span {
      width: 130px;
    }
    .dialog-footer {
      margin-left: 10px;
    }
  }
</style>
