<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名或手机号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-row :span="24">
        <p v-if="waitShow" id="wait" class="show">正在加载验证码......</p>
        <el-col :span="24" class="captcha">
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit" :disabled="!loginForm.challenge|| !loginForm.validate|| !loginForm.seccode">登录</el-button>
      <el-button size="medium" style="position: relative; right: 0;" type="text" @click="handleRegister()">账号注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import register from '@/menu/views/login/register/register.vue'
import { initGeetest } from '@/utils/gt.js'
import { newCaptcha } from '@/menu/api/auth.js'
import { validatorFun, validateUsername, validatePassword, randomLenNum } from '@/utils/string'
import { mapGetters } from 'vuex'
export default {
  name: 'userlogin',
  components: {
    register
  },
  data() {
    const validatorCode = (rule, value, callback) => {
      if (!this.loginForm.challenge || !this.loginForm.validate || !this.loginForm.seccode) {
        callback(new Error('请先完成验证'))
      } else {
        callback()
      }
    }
    var checkValid = (rule, value, callback) => {
      if (value.length === 11) callback()
      else {
        if (!/[a-zA-Z0-9]*[a-z]+[a-zA-Z0-9]*/.test(value)) callback(new Error('请输入有效的用户名'))
        else callback()
      }
    }
    var checkPhoneLogin = (rule, value, callback) => {
      if (/^\d+$/.test(value) && !/^1\d{10}$/.test(value)) callback(new Error('请输入正确的手机号'))
      else callback()
    }
    return {
      waitShow: true,
      loginForm: {
        username: '',
        password: '',
        challenge: '',
        validate: '',
        seccode: '',
        _this: ''
      },
      loginRules: {
        username: [
          { min: 3, message: '用户名长度最少为3位', trigger: 'blur' },
          { required: true, validator: checkPhoneLogin, trigger: 'blur' },
          { required: true, validator: checkValid, trigger: 'blur' }
        ],
        password: [
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatorFun(validatePassword) }
        ],
        captcha: [
          { required: true, trigger: 'blur', validator: validatorCode }
        ]
      },
      passwordType: 'password'
    }
  },
  created() {
    this.refreshCode()
  },
  mounted() { },
  computed: {
  },
  props: [],
  methods: {
    refreshCode() {
      this.$apollo
        .mutate({
          mutation: newCaptcha
        })
        .then(response => {
          // console.log(response.data)
          // 调用 initGeetest 初始化参数
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          initGeetest({
            gt: response.data.newCaptcha.gt,
            challenge: response.data.newCaptcha.challenge,
            new_captcha: response.data.newCaptcha.new_captcha, // 用于宕机时表示是新验证码的宕机
            offline: !response.data.newCaptcha.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            product: 'float', // 产品形式，包括：float，popup
            width: '100%'
            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
          }, (captchaObj) => {
            // 只加载一次
            if (this.waitShow) {
              captchaObj.appendTo(`.captcha`)
            }
            captchaObj.onReady(() => {
              this.waitShow = false
            })
            // 验证成功
            captchaObj.onSuccess(() => {
              let result = captchaObj.getValidate()
              this.loginForm.challenge = result.geetest_challenge
              this.loginForm.validate = result.geetest_validate
              this.loginForm.seccode = result.geetest_seccode
              this.loginForm._this = this
              // console.log('this.loginForm.challenge=' + this.loginForm.challenge)
              // console.log('this.loginForm.validate=' + this.loginForm.validate)
              // console.log('this.loginForm.seccode=' + this.loginForm.seccode)
              // console.log('this.loginForm._this=' + this.loginForm._this)
            })
            // 验证失败
            captchaObj.onError(() => {
              this.loginForm.challenge = ''
              this.loginForm.validate = ''
              this.loginForm.seccode = ''
              this.loginForm._this = ''
            })
          })
        }).catch(
          (err) => { console.log(err) }
        )
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('loginByUserName', this).then(res => {
            this.$router.push({ path: '/' })
          })
        }
      })
      // this.refreshCode()
    },
    handleRegister() {
      this.$router.push('/register')
    }
  }
}
</script>
