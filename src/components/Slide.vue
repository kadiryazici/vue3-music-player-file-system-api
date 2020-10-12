<template>
   <div @mouseup="changeCurrentTime" class="slide w-100">
      <div :style="style" class="progress"></div>
   </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import { watchEffect, reactive, defineComponent } from "vue";

export default defineComponent({
   name: "Slide",
});
export const style = reactive({
   width: 50 + "%",
});

watchEffect(() => {
   const progress = (store.state.currentTime / store.state.duration) * 100;
   style.width = progress + "%";
});

export const changeCurrentTime = (e: MouseEvent): void => {
   if (e.currentTarget instanceof HTMLElement) {
      const target = e.currentTarget;
      const { clientX } = e;
      const { left, width } = target.getBoundingClientRect()
      const currentLeft = clientX - left;

      const { duration } = window.vAudio;
      const percent = currentLeft / width * 100;
      window.vAudio.currentTime = duration / 100 * percent;
   }
}
</script>

<style lang="scss" scoped>
.slide {
   overflow-x: hidden;
   border: 3px solid $dark;
   border-radius: 20px;
   cursor: pointer;
   background-color: $dark;
   -webkit-user-drag: none;
   user-select: none;
   -webkit-user-select: none;
   -moz-user-select: none;
   .progress {
      height: 8px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: linear-gradient(90deg, $purple 0%, $pink 50%);
   }
}
</style>