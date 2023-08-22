<template xmlns:slot="http://www.w3.org/1999/html">
  <div class="modal fixed top-0 left-0 w-full h-full overflow-y-scroll" v-if="isOpen">
    <div class="modal-content pointer-events-none flex h-full justify-center items-start mt-20">
      <div class="max-w-[540px] min-h-[344px] w-full h-auto relative bg-white rounded pointer-events-auto">
        <div class="modal-header">
          <slot name="header">

          </slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <div>
            <Button class="mr-5" @click="saveTags">Сохранить</Button>
            <Button class="neutral" @click="closeModal">Отмена</Button>
          </div>
        </div>
      </div>
    </div>
    <div @click="closeModal" class="modal-backdrop w-full h-full fixed bg-[#16171B] opacity-40 z-[-1] left-0 top-0"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from './Button.vue'

export default defineComponent({
  components: {
    Button
  },
  props: {
    isOpen: Boolean
  },
  emits: ['update:isOpen', 'save'],
  methods: {
    closeModal() {
      this.$emit('update:isOpen', false)
    },
    saveTags() {
      this.$emit('save')
    }
  }
})
</script>

<style scoped lang="scss">

</style>