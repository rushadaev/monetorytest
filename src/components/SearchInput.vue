<template>
  <div class="form-input">
    <div class="label">
      {{label}}
    </div>
    <input type="text" v-model="search" @input="updateSearch">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: String
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    updateSearch() {
      this.$emit('update:search', this.search)
    }
  }
})
</script>

<style scoped lang="scss">
.form-input{
  position: relative;
  .label{
    color: #862FDE;
    position: absolute;
    background: #fff;
    font-size: 12px;
    height: 16px;
    padding: 0px 4px;
    left: 16px;
    top: -8px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }
}
input{
  max-width: 360px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid var(--primary-862-fde, #862FDE);
  background: var(--white-ffffff, #FFF);
  padding: 14px 16px;
}
</style>