<template>
  <div class="header-wrapper">
    <div class="header-right-wrapper">
      <div class="header-right-box">
        <search-icon></search-icon>
      </div>
      <div class="header-right-line"></div>
      <div class="header-right-box" @click="goNotify" @mouseout="showNoti(false)" @mouseover="showNoti(true)">
        <div v-if="notifyNum !== 0">
        <el-badge :value="notifyNum" style="font-size: 23px;color: #fff;padding-right: 30px;">
          <svg-icon icon-class="notification"></svg-icon>
        </el-badge>
        </div>
        <div v-else>
          <svg-icon icon-class="notification" style="font-size: 23px;color: #fff;"></svg-icon>
        </div>
        <transition name="el-fade-in-linear">
          <div class="notify-entrance-dropdown" v-show="notiInfo">
            <div v-if="notifyData">
              <ul class="notify-entrance-list">
                <li v-for="itm in respnoses" :key="itm.idx">
                  <p @click.stop="notiDetail(itm.messageId)">{{itm.title}}</p>
                  <span>{{itm.dateTime.substring(0, itm.dateTime.length - 2)}}</span>
                </li>
              </ul>
            </div>
            <div class="notify-no-msg" v-else>您暂时没有消息通知</div>
            <div class="notify-more-msg" @click.stop="goNotify">
              <a>更多消息</a>
            </div>
          </div>
        </transition>
      </div>
      <div class="header-right-line"></div>
      <div class="header-right-box">
        <el-tooltip effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
          <span style="font-size: 23px;" @click="handleScreen">
            <svg-icon v-if="isFullScren" icon-class="exitfullscreen"></svg-icon>
            <svg-icon v-else icon-class="fullscreen"></svg-icon>
          </span>
        </el-tooltip>
      </div>
      <div class="header-right-line"></div>
      <div class="header-right-box" @mouseout="showUserInfo(false)" @mousemove="showUserInfo(true)">
        <span class="el-dropdown-link header-item" style="font-size: 38px;">
          <img v-if="userInfo.headpic" :src="userInfo.headpic" alt="个人头像" style="height:35px;width:35px;border:1px solid white;border-radius:50%; position:relative; top:4.5px;" class="user-header">
          <svg-icon v-else icon-class="users" style="width:35px; height:35px;"></svg-icon>
        </span>
        <transition name="el-fade-in-linear">
          <div class="user-entrance-dropdown" v-show="isUserEntranceDropdown">
            <div class="user-entrance-user-info">
              <img v-if="userInfo.headpic" :src="userInfo.headpic" alt="个人头像" style="width: 36px;height: 36px;border-radius: 18px;vertical-align: middle;" class="user-header">
              <svg-icon v-else icon-class="users" style="width: 36px;height: 36px;border-radius: 18px;vertical-align: middle;"></svg-icon>
              <p style="margin: 8px 0;font-size: 12px;line-height: 1.428571429;">
                <span :title="userInfo.name||userInfo.mobileNo||userInfo.userName">{{userInfo.name||userInfo.mobileNo||userInfo.userName}}</span>
              </p>
              <div class="el-dropdown">
                <span @click="isCompanyDropdown=!isCompanyDropdown" class="el-dropdown-link el-dropdown-selfdefine" style="cursor: pointer;">{{defaultCompanyName[0].companyName ? defaultCompanyName[0].companyName : ''}}
                  <i v-show="!validateNull(companyList)" class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <ul v-show="!validateNull(companyList) && isCompanyDropdown" class="el-dropdown-menu" style="width: 252px;margin-top: 19px;position: relative;">
                  <li v-for="item in companyList" :key="item.idx" class="el-dropdown-menu__item" @click="isCompanyDropdown=false">
                    {{ item.companyName }}
                  </li>
                </ul>
              </div>
            </div>
            <ul class="user-entrance-list">
              <li @click="handleDropdown('baseInfo')">
                <svg-icon icon-class="base-info" style="width: 36px;height: 36px;vertical-align: middle;"></svg-icon><br/>基本资料
              </li>
              <li @click="handleDropdown('realAuth')">
                <svg-icon icon-class="real-auth" style="width: 36px;height: 36px;vertical-align: middle;"></svg-icon><br/>实名认证
              </li>
              <li @click="handleDropdown('safeSet')">
                <svg-icon icon-class="safe-set" style="width: 36px;height: 36px;vertical-align: middle;"></svg-icon><br/>安全设置
              </li>
              <li @click="handleDropdown('comInfo')">
                <svg-icon icon-class="com-info" style="width: 36px;height: 36px;vertical-align: middle;"></svg-icon><br/>企业资料
              </li>
            </ul>
            <div @click="handleDropdown('logOut')" style="cursor: pointer; height: 50px;text-align: center;line-height: 50px;font-size: 14px;color: #333;background-color: #f5f5f6;">
              <span>退出登陆</span>
            </div>
          </div>
        </transition>
        <base-info class="header-placeholder-class" :isBaseInfoVisible="isBaseInfoVisible" @isBaseInfoVisible="isBaseInfoVisible = $event" v-if="isBaseInfoVisible" />
        <real-auth class="header-placeholder-class" :isRealAuthVisible="isRealAuthVisible" @isRealAuthVisible="isRealAuthVisible = $event" v-if="isRealAuthVisible" />
        <safe-set class="header-placeholder-class" :isSafeSetVisible="isSafeSetVisible" @isSafeSetVisible="isSafeSetVisible = $event" v-if="isSafeSetVisible" />
        <com-info class="header-placeholder-class" :isComInfoVisible="isComInfoVisible" @isComInfoVisible="isComInfoVisible = $event" v-if="isComInfoVisible" />

        <el-dialog title="密码设置" center :visible.sync="isSetPassword" width="600px">
          <el-form v-loading="false" label-position="left" label-width="100px" v-show="true" status-icon :rules="setPasswordRulr" ref="setPasswordForm" :model="setPasswordForm">
            <label>
              <el-form-item prop="userMobileNo" label="手机号">
                <el-input class="user-phone-num" v-model="setPasswordForm.userMobileNo" auto-complete="off" placeholder="请输入新手机号码" :disabled="setPasswordForm.mobileNoStatus"></el-input>
              </el-form-item>
              <el-form-item prop="userVerifyCode" label="验证码">
                <el-input v-model="setPasswordForm.userVerifyCode" auto-complete="off" placeholder="请输入验证码">
                  <template slot="append">
                    <span @click="handleSendNew" class="msg-text" :class="[{display:msgKey}]">{{activeMsgText}}</span>
                  </template>
                </el-input>
              </el-form-item>
            </label>
            <label v-if="true">
              <el-form-item prop="userPassword" label="设置密码">
                <el-input :type="passwordType" v-model="setPasswordForm.userPassword" auto-complete="off" placeholder="请设置密码">
                  <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword" label="确认密码">
                <el-input :type="passwordType" v-model="setPasswordForm.confirmPassword" auto-complete="off" placeholder="请再次确认密码">
                  <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                </el-input>
              </el-form-item>
            </label>
            <el-form-item class="bottomBtn">
              <el-button type="primary" @click.native.prevent="addUserPassword" :disabled="false">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {

}

</script>
<style lang="scss" src="./style.scss">

</style>
