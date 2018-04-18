<template>
  <div>
    <el-upload
      class="bd-upload"
      :class="{'disabled':isDisabled}"
      list-type="picture-card"
      name="image"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-success="uploadSuccess"
      :on-remove="handleRemove"
      :before-upload="selectImg"
      ref="upload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" :modal="isModal">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      maxSize: {
        type: Number,
        default: 9999
      },
      value: {
        default: []
      }
    },
    data() {
      return {
        isModal: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
//        action: 'http://biding365.oss-cn-hangzhou.aliyuncs.com/api/upload/image.json'
      };
    },
    methods: {
      selectImg (){
        if (this.isDisabled) {
          this.$message({
            type: 'info',
            message: `最多上传${this.maxSize}张图片`
          });
          return false;
        }
      },
      clearFiles (){
        this.$refs.upload.clearFiles();
        this.fileList = [];
      },
      handleRemove (file) {
        if (!file) {
          return
        }
        this.fileList = this.fileList.filter((image) => {
          return image.url !== file.url;
        })
        this.$emit('input', this.fileList);
      },
      uploadSuccess (data){
        this.fileList.push(data.image);
        this.$emit('input', this.fileList);
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    computed: {
      isDisabled (){
        console.log('this.fileList.length', this.fileList.length)
        return this.fileList.length >= this.maxSize;
      }
    },
    watch: {
      value (){
        this.fileList = this.value;
      }
    }
  }
</script>
<style>
  .bd-upload .el-upload-list__item-thumbnail {
    width: auto;
    height: auto;
    max-width: 130px;
    max-height: 130px;
    vertical-align: middle;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bd-upload .el-upload-list__item {
    border-radius: 2px !important;
  }

  /*图片上传*/
  /*.bd-upload.disabled .el-upload--picture-card {*/
  /*display: none;*/
  /*}*/
</style>
