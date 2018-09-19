<template>
  <!--
  左侧固定宽，右侧自适应屏幕宽；
  左右两列，等高布局；
  左右两列要求有最小高度，例如：200px;（当内容超出200时，会自动以等高的方式增高）
  要求不用JS或CSS行为实现；
  原文: https://www.w3cplus.com/css/two-cloumn-width-one-fixed-width-one-fluid-width -->
  <div class="app-wrapper" ref="layout" :class="{collapseLeft:layoutLeft && isCollapse}">
    <component v-show="!isFullscreen" class="left-wrapper" :is="layoutLeft" :style="{height: maxHeight + 'px', minHeight: maxHeight + 'px', width: leftWith + 'px' }"></component>
    <component v-show="!isFullscreen" :class="[layoutLeft ? 'all-transition' : '' ]" :is="layoutTop" :style="{marginLeft: leftWith + 'px',height: topHeight + 'px'}"></component>
    <div :class="[layoutLeft ? 'all-transition' : '' ]" class="main-wrapper" ref="main" :style="{marginLeft: leftWith + 'px',height:(maxHeight - (isFullscreen ? 0 : topHeight))+ 'px'}">
      <router-view :style="{height: (maxHeight - (isFullscreen ? 0 : topHeight) - (isFullscreen ? 0 : bottomHeight)) + 'px'}"> </router-view>
      <component v-show="!isFullscreen" :is="layoutBottom" :style="{height: bottomHeight + 'px'}"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Layout extends Vue {
  
}

</script>

<style src="./style.scss" lang="scss" scoped>
</style>
