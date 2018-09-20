<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-info text-white animated fadeInLeft">
      <h2 style="margin: 0;font-size: 30px;color: #ffffff">人和数据服务平台</h2>
      <h2 class="login-info-title" style="margin-bottom: 30px">人和方可致远，数据唤醒希望</h2>
      <ul class="login-info-list">
        <li class="login-info-item"> 动态实名制管理</li>
        <li class="login-info-item"> 社保卡制卡数据在线服务</li>
        <li class="login-info-item"> 医疗实名自助服务</li>
        <li class="login-info-item"> 劳动力就业服务</li>
      </ul>
      <canvas id="mycvs"></canvas>
    </div>
    <div class="login-border pull-height">
      <div class="login-main animated fadeIn">
        <!-- <svg-icon style="height:90px;width:180px;" icon-class="rhcompany-logo"></svg-icon> -->
        <div class="title-wrapper">
          <div>
            <h2>登录(开发)</h2>
            <p>人和数据服务平台</p>
          </div>
          <svg-icon style="height:80px;width:80px;" icon-class="index-logo"></svg-icon>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户密码" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <codeLogin></codeLogin>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Layout extends Vue {
  
}
</script>

<style lang="scss" src="./style.scss">

</style>
