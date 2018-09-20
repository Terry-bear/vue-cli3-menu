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
            <phoneLogin></phoneLogin>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import phoneLogin from '@/menu/views/login/phoneLogin/phoneLogin.vue'
import userLogin from '@/menu/views/login/userLogin/userLogin.vue'
@Component({
  components: {
    phoneLogin,
    userLogin
  }
})
export default class Layout extends Vue {
  private name: string = 'login'
  private activeName: string = 'user'

  @Prop({ default: 45 }) private dotsNum!: number
  @Prop({ default: true }) private isColor!: boolean
  @Prop({ default: '#999' }) private roundColor!: string
  @Prop({ default: '#ccc' }) private lineColor!: string

  private mounted() {
    const canvas = document.getElementById('mycvs')
    const ctx = canvas!.getContext('2d')
    const rndCl = () => Math.floor(Math.random() * 225)
    const width = window.innerWidth
    const height = window.innerHeight
    let baseList: object[] = []
    canvas![width] = width
    canvas![height] = height

    // 绘制园
    const drawRounds = (obj, index) => {
      const { x, y, r, color } = obj
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      if (this.isColor) {
        ctx.fillStyle = color
      } else {
        ctx.fillStyle = this.roundColor
      }
      ctx.fill()
      ctx.closePath()
    }

    // 判断移动方向
    const controlDirection = (obj) => {
      if (obj.x >= (width - obj.r)) {
        obj.controlX = 'left'
      } else if (obj.x <= parseInt(obj.r / 2, 0)) {
        obj.controlX = 'right'
      }

      if (obj.y >= (height - obj.r)) {
        obj.controlY = 'bottom'
      } else if (obj.y <= parseInt(obj.r / 2, 0)) {
        obj.controlY = 'top'
      }
      return obj
    }

    // 划线
    const drawLine = (list) => {
      list.map((item, index) => {
        // console.log('item:', item)
        ctx.beginPath()
        ctx.moveTo(item.x1, item.y1)
        ctx.lineTo(item.x2, item.y2)
        ctx.LineWeight = 1
        if (this.isColor) {
          ctx.strokeStyle = item.color
        } else {
          ctx.strokeStyle = this.lineColor
        }
        ctx.stroke()
        ctx.closePath()
      })
    }

    // 绘制
    const draw = (list) => {
      const dotsArr: object[] = []
      const lineArr: object[] = []

      list.map((item, index) => {
        const xy = controlDirection(item)
        const obj: any | never = roundMove(xy)
        dotsArr.push(obj)
      })
      dotsArr.map((item1, index1) => {
        dotsArr.map((item2, index2) => {
          if (item1 !== item2) {
            const x = item1.x - item2.x
            const y = item1.y - item2.y
            if (Math.abs(x) < 150 && Math.abs(y) < 150) {
              const obj = {
                x1: item1.x,
                y1: item1.y,
                x2: item2.x,
                y2: item2.y,
                color: item1.color
              }
              lineArr.push(obj)
            }
          }
        })
      })
      drawLine(lineArr)

      dotsArr.map((item, index) => {
        drawRounds(item, index)
      })

      baseList = dotsArr

      setTimeout(() => {
        // if(this.paused){
        reDraw()
        // }
      }, 50)
    }

    const reDraw = () => {
      ctx.clearRect(0, 0, width, height)
      draw(baseList)
    }

    // 移动
    const roundMove = (obj) => {
      switch (obj.controlX) {
        case 'right':
          obj.x++
          break
        case 'left':
          obj.x--
          break
        default:
      }
      switch (obj.controlY) {
        case 'top':
          obj.y++
          break
        case 'bottom':
          obj.y--
          break
        default:
      }
      return obj
    }

    // 创造圆点
    const creatDots = () => {
      const arr: object[] = []
      for (let i = 0; i < this.dotsNum; i++) {
        const obj = {}
        obj.x = parseInt(Math.random() * width, 0)
        obj.y = parseInt(Math.random() * height, 0)
        obj.r = parseInt(Math.random() * 10, 0)
        obj.controlX = parseInt(Math.random() * 10, 0) > 5 ? 'left' : 'right'
        obj.controlY = parseInt(Math.random() * 10, 0) > 5 ? 'bottom' : 'top'

        obj.color = `rgba(${rndCl()},${rndCl()},${rndCl()},.3)`

        arr.push(obj)
      }
      return arr
    }

    draw(creatDots())
  }
  private handleClick() {
    
  }
}
</script>

<style lang="scss" src="./style.scss">
</style>
