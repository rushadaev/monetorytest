<template>
  <button @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click'],
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  }
})
</script>

<style scoped lang="scss">
</style>