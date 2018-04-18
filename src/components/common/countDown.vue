<template>
  <!-- 倒计时组件 -->
  <div class="count-down-wraper">
    <input type="button" v-if="!disable" v-model="btnName" class="get-code get-code-off" v-on:click="getCode();"/>
    <input type="button" v-if="disable" v-model="btnName" class="get-code get-code-on" disabled/>
  </div>
</template>

<script>
  import Api from '@/api'
  export default {
    props: ['username'],
    data () {
      return {
        btnName: '获取验证码',
        disable: false
      }
    },
    methods: {
      getCode () {
        if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test(this.username)) {
          this.$message({
            message: '手机号格式不正确，请重新输入！',
            type: 'warning'
          });
          return false;
        }

        let num = 60;
        this.disable = true;
        let timer = setInterval(() => {
          num -= 1;
          this.btnName = num + 's后重试';
          if (num < 1) {
            this.disable = false;
            this.btnName = '获取验证码';
            clearInterval(timer);
            timer = null;
          }
        }, 1000);
        let para = {
          mobile: this.username
        }

        Api.testApi.postSendMessage(para).then(res => {
          if (res.code == '0000') {
            this.$message({
              message: '发送成功！',
              type: 'success'
            });
          } else {
            this.$message.error(res.msg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="text/scss">
  .get-code {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 90px;
    height: 30px;
    background-color: #fff;
    font-size: 13px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    outline: none;
  }

  .get-code-on {
    color: #b4b4b4;
  }

  .get-code-off {
    color: #2577e3;
  }
</style>
