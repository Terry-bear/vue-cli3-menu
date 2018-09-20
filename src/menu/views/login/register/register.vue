<template>
  <div class="god-wrapper">
    <div class="container">
      <div class="top-wrapper">
        <img :src="regIcon" alt="人和数据你值得拥有">
        <div class="title-wrapper">
          <div class="title">
            <span>劳动力就业服务平台</span>
          </div>
          <div class="title-content">
            <span>1000+万待就业劳动力等你选择</span>
          </div>
        </div>
        <div class="statement">客服热线:0857-242342342</div>
      </div>
      <div class="content-wrapper" v-loading="loading" @click="showMap(false)">
        <div class="content-main">
          <el-steps :active="activeStep" style="margin-top: 32px;" finish-status="success">
            <el-step title="填写企业基本信息"></el-step>
            <el-step title="完善企业信息"></el-step>
            <el-step title="注册完成"></el-step>
          </el-steps>
          <el-form :model="newOrg" ref="base" :rules="rules" label-width="140px" style="width: 578px; margin-top: 40px;">
            <div class="base-content" v-show="activeStep === 0">
              <el-form-item label="企业名称" prop="orgName">
                <el-input v-model="newOrg.orgName" placeholder="请输入企业名称"></el-input>
              </el-form-item>
              <el-form-item label="企业法人" prop="legalPerson">
                <el-input v-model="newOrg.legalPerson" placeholder="请输入企业法人"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="orgCode">
                <el-input v-model="newOrg.orgCode" placeholder="请输入统一社会信用代码"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <el-form :model="newOrg" ref="detail" :rules="rules" label-width="140px" style="width: 578px; margin-top: 40px;">
            <div class="detail-content" v-show="activeStep === 1">
              <el-form-item label="企业所在地" prop="regAddress">
                <div @click="stopPropagation">
                  <el-input v-model="newOrg.regAddress" placeholder="请输入企业所在地" autosize @focus="showMap(true)"></el-input>
                  <el-collapse-transition>
                    <map-position v-show="showMapStatus" :width="mWidth" :height="mHeight" :showInfo="false" ref="mapComp" @adr="adr = $event" @adrCode="adrCode = $event" @adrPosition="adrPosition = $event"></map-position>
                  </el-collapse-transition>
                </div>
              </el-form-item>
              <el-form-item label="所属行业" prop="industry">
                <el-select @focus="showMap(false)" style="width:438px;" v-model="newOrg.industry" placeholder="请选择行业">
                  <el-option v-for="item in industryOpt" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业规模" prop="personScale">
                <el-select @focus="showMap(false)" style="width:438px;" value-key="label" v-model="newOrg.personScale" placeholder="请选择企业规模">
                  <el-option v-for="item in personScaleOpt" :key="item.value" :label="item.label" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业类型" prop="orgType">
                <el-select @focus="showMap(false)" style="width:438px;" v-model="newOrg.orgType" placeholder="请选择企业类型">
                  <el-option v-for="item in orgTypeOpt" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业联系人" prop="contactPerson">
                <el-input v-model="newOrg.contactPerson" placeholder="请输入企业联系人"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="contactPhone">
                <el-input v-model="newOrg.contactPhone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="valiCode">
                <el-input v-model="newOrg.valiCode" auto-complete="off" placeholder="请输入验证码">
                  <template slot="append">
                    <span @click="handleSend" class="msg-text" :style="msgKey ? 'cursor: wait;' : 'cursor: pointer;'" style="-webkit-user-select: none; user-select: none;">{{activeMsgText}}</span>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="营业执照" prop="license">
                <div class="pic-layout">
                  <up-load ref="upLoad" bucketUrl='tmp/license/' :bySTS='false' :isAdd="false" @hasPic="hasPic = $event"></up-load>
                </div>
              </el-form-item>
              <div class="check-statement">
                <el-checkbox v-model="liabilityStatus" />
                <span style="font-size: 12px;font-weight:400; color:rgba(0,0,0,0.45); line-height:22px;">
                  我已阅读并同意人和数据招聘
                  <span class="back-login-btn" @click="showDialog('免责声明')">《免责声明》</span>
                  和
                  <span class="back-login-btn" @click="showDialog('岗位发布声明')">《岗位发布声明》</span>
                </span>
              </div>
            </div>
          </el-form>
          <div class="complete-content" v-show="activeStep === 2">
            <img :src="successIcon">
            <p class="complete-title">企业账号注册成功</p>
            <p class="complete-container">您可以使用手机号+验证码进行登录</p>
          </div>
          <center>
            <el-button v-if="activeStep !== 2" :disabled="!liabilityStatus" type="primary" @click="nextStep" style="width:102px; height:32px; line-height: 32px; padding: 0;">{{stepValue}}</el-button>
            <el-button v-else type="primary" @click="toLogin">去登陆</el-button>
            <span v-if="activeStep === 0" style="font-size: 12px;font-weight:400; color:rgba(0,0,0,0.45); line-height:22px;">已有账号,
              <span class="back-login-btn" @click="backToLogin">去登录</span>
            </span>
            <el-button v-if="activeStep === 1" @click="backToBase">返回上一步</el-button>
          </center>
        </div>
      </div>
      <el-dialog class="statement-dialog-wrapper" :title="title" :visible.sync="showStatement" width="620px">
        <span v-if="title === '免责声明'" class="statement-pages">用户在使用微博服务的过程中应遵守国家法律法规及政策规定，因其使用微博服务而产生的行为后果由用户自行承担。 用户通过微博服务发布的任何信息，及通过微博服务传递的任何观点不代表微博之立场，微博亦不对其完整性、真实性、准确性或可靠性负责。用户对于可能会在微博上接触到的非法的、非道德的、错误的或存在其他失宜之处的信息，及被错误归类或是带有欺骗性的发布内容，应自行做出判断。在任何情况下，因前述非正当信息而导致的任何损失或伤害，应由相关行为主体承担全部责任。 鉴于外部链接指向的网页内容非微博运营方实际控制，因此微博运营方无法保证为向用户提供便利而设置的外部链接的准确性和完整性。 对于因不可抗力或微博运营方不能控制的原因造成的微博服务中断或其它缺陷，微博运营方不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。 微博运营方对其向用户所提供的微博产品及服务依法承担相关责任，但法律另有规定或另有约定的除外。 用户知悉并同意，微博运营方可能会与第三方合作向用户提供产品（包括但不限于游戏、第三方应用等）并由第三方向用户提供该产品的升级、维护、客服等后续工作，由该等第三方对该产品的质量问题或其本身的原因导致的一切纠纷或用户损失承担责任，用户在此同意将向该第三方主张与此有关的一切权利和损失。 除另有约定外，微博运营方提供的产品或服务（包括但不限于游戏物品及道具），如未标明使用期限、或者其标明的使用期限为“永久”、“无限期”或“无限制”的，则其使用期限为自用户开始使用该产品或服务至该产品或服务在微博下线之日为止。</span>
        <span v-else class="statement-pages">用户在使用微博服务的过程中应遵守国家法律法规及政策规定，因其使用微博服务而产生的行为后果由用户自行承担。 用户通过微博服务发布的任何信息，及通过微博服务传递的任何观点不代表微博之立场，微博亦不对其完整性、真实性、准确性或可靠性负责。用户对于可能会在微博上接触到的非法的、非道德的、错误的或存在其他失宜之处的信息，及被错误归类或是带有欺骗性的发布内容，应自行做出判断。在任何情况下，因前述非正当信息而导致的任何损失或伤害，应由相关行为主体承担全部责任。 鉴于外部链接指向的网页内容非微博运营方实际控制，因此微博运营方无法保证为向用户提供便利而设置的外部链接的准确性和完整性。 对于因不可抗力或微博运营方不能控制的原因造成的微博服务中断或其它缺陷，微博运营方不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。 微博运营方对其向用户所提供的微博产品及服务依法承担相关责任，但法律另有规定或另有约定的除外。 用户知悉并同意，微博运营方可能会与第三方合作向用户提供产品（包括但不限于游戏、第三方应用等）并由第三方向用户提供该产品的升级、维护、客服等后续工作，由该等第三方对该产品的质量问题或其本身的原因导致的一切纠纷或用户损失承担责任，用户在此同意将向该第三方主张与此有关的一切权利和损失。 除另有约定外，微博运营方提供的产品或服务（包括但不限于游戏物品及道具），如未标明使用期限、或者其标明的使用期限为“永久”、“无限期”或“无限制”的，则其使用期限为自用户开始使用该产品或服务至该产品或服务在微博下线之日为止。</span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Layout extends Vue {

}
</script>

<style lang="scss" src="./style.scss" scoped>
</style>

<style lang="scss">
.el-step__head.is-process {
  border-color: #1890ff !important;
  color: #1890ff !important;
}
.el-step__title.is-process {
  @extend .el-step__head.is-process
}
.el-step__head.is-success {
  border-color: #1890ff !important;
  color: #1890ff !important;
}
.el-step__title.is-success {
  color: #1890ff !important;
}
.el-icon-check:before {
  color: #1890ff;
}
.god-wrapper {
  .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
}

.el-dialog {
  margin-top: 54px !important;
}
.statement-dialog-wrapper .el-dialog .el-dialog__header {
  border-bottom: 1px solid #e9e9e9 !important;
  padding: 10px 20px 10px 20px !important;
  background-color: #fafafa;
}
.statement-dialog-wrapper .el-dialog .el-dialog__header span {
  font-size: 14px;
  color: #000000;
}
.statement-dialog-wrapper .el-dialog__body {
  padding: 42px 36px;
}
.statement-dialog-wrapper .el-form-item__label {
  width: 140px;
  text-align: right;
  color: #000000;
}
</style>
