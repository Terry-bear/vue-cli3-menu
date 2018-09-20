<template>
  <div>
    这是个TS在vue中如何使用的demo
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model, Provide, Inject } from 'vue-property-decorator'

interface Person {
  name: string,
  age: number,
  idCard?: string
}
@Component
export default class YourComponent extends Vue {
  /**
   * 定义属性的方法
   * equal to
   * export default {
   *  props: {
   *    propA: {
   *      type: Number
   *     },
   *    propB: {
   *      default: 'default value'
   *    },
   *    propC: {
   *      type: [String, Boolean]
   *     },
   *  }
   * }
   */
  @Prop(Number) private propA!: number
  @Prop({ default: 'default value' }) private propB!: string
  @Prop([String, Boolean]) private propC?: string | boolean

  /**
   * Model的定义
   */
  // @Model('change', { type: Boolean }) checked!: boolean
  /**
   * watch监听属性的ts使用
   */
  @Watch('child')
  private onChildChanged(val: string, oldVal: string) {
    console.log('object')
  }

  @Watch('person', { immediate: true, deep: true })
  private onPersonChanged(val: Person, oldVal: Person) {
    console.log('person')
  }

  // @Inject() foo!: string
  // @Inject('bar') bar!: string

  // @Provide() fooo = 'foo'
  // @Provide('bar') baz = 'bar'
}
</script>

<style scoped>
</style>
