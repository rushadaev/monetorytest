<template>
  <button :disabled="disabled" class="tag grid grid-flow-col justify-between items-center" @click="clickHandler">
    <slot></slot>
    <div v-if="icon" class="icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L15 15M5 15L15 5" stroke="#16171B" stroke-linecap="round"/>
      </svg>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: String,
    disabled: Boolean
  },
  emits: ['click'],
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  }
})
</script>

<style scoped lang="scss">
.icon{
  margin-left: 8px;
  margin-top: 1px;
}
</style>