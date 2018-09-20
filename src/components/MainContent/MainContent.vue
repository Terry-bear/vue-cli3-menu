<template>
  <iframe :src="mainContentUrl" class="iframe" ref="iframe"></iframe>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Layout extends Vue {
  
}
</script>
