<template>
  <div style="background: #42485b;">
    <el-row style="text-align: center;background: #333744;color: #ffffff; height: 48px; padding-top: 12px;">
      <div style="cursor: pointer;" @click="toggle" :class="[isCollapse ? 'fa-rotate-90' : 'fa-rotate-0', 'fa fa-navicon fa-lg', status]"></div>
      <div>
        <div @click="goIndex" style="width: 80px; height: 50px;margin-left: 60px;cursor: pointer;">
        <svg-icon v-if="!isCollapse" style="height:50px;width:80px;margin-left: 25px;margin-top: -12px;transition: width 1s;" icon-class="rh-name"></svg-icon>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-menu :default-active="currentMenuIndex" :collapse="isCollapse" style="height: 100%;margin-bottom: -99999px;padding-bottom: 99999px;" mode="vertical" unique-opened background-color="#343743" text-color="#fff" active-text-color="#fff">
        <sidebar-item :menu="leftMenu"></sidebar-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Side extends Vue {  
}

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
