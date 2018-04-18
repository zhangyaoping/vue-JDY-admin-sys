<template>
  <el-container>
    <el-header>
      <v-header></v-header>
    </el-header>
    <el-container style="width: 100%">
      <el-aside width="200px">
        <v-sidenav :layout="layout"></v-sidenav>
      </el-aside>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import vHeader from "./Header.vue";
  import vSidenav from "./Sidenav.vue";

  export default {
    data() {
      return {
        layout: "left"
      };
    },
    computed: {},
    components: {
      vHeader,
      vSidenav
    }
  };
</script>


<style lang="scss" type="text/scss">
  .el-header {
    background: #373d41;
  }

  .el-container {
    height: 100%;
  }

  .el-aside {
    height: 100%;
    background-color: #324157;
  }

  .el-main {
    box-sizing: border-box;
    display: block;
  }

</style>
