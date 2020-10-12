<template>
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <path d="M50 50L0 50C0 50 50 50 50 0" />
   </svg>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
export default defineComponent({
   name: "CurveIcon",
});
</script>

<style lang="scss" scoped>
svg {
   width: 100%;
   height: 100%;
}
</style>