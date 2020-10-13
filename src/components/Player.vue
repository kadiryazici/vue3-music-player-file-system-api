<template>
   <div
      class="w-100 player p-4 d-flex align-items-center justify-content-center flex-wrap flex-row"
   >
      <div v-if="$store.state.isSongSelected" style="max-width: 650px" class="w-100">
         <!-- LOGO OF PLAYER -->
         <div class="w-100 text-center">
            <img style="width: 175px; height: 175px" :src="require('@/static/logo.png')" alt />
         </div>
         <!-- NAME OF CURRENT SONG -->
         <h3 class="text-center pb-3">{{ fixName($store.state.name) }}</h3>

         <div class="d-flex flex-nowrap align-items-center">
            <h4
               style="min-width: 70px"
               class="text-right px-2"
            >{{ $store.getters.getCurrentTimeAsMinuteAndSeconds }}</h4>
            <Slide />
            <h4
               style="min-width: 70px"
               class="px-2"
            >{{ $store.getters.getDurationAsMinuteAndSeconds }}</h4>
         </div>
         <div class="text-center">
            <button @click="$store.dispatch('playPrevious')" class="button">
               <span class="icon material-icons">skip_previous</span>
            </button>

            <button @click="$store.commit('togglePlaying')" class="button">
               <span v-if="!$store.state.isPlaying" class="icon material-icons">play_arrow</span>
               <span v-if="$store.state.isPlaying" class="icon material-icons">pause</span>
            </button>

            <button @click="$store.dispatch('playNext', true)" class="button">
               <span class="icon material-icons">skip_next</span>
            </button>
         </div>
      </div>

      <div v-else>
         <h2 class="text-center">SELECT A SONG</h2>
         <p
            class="text-center"
         >You need to enable #native-file-system-api in chrome://flags - edge://flags and use at least version 86 for both.</p>
      </div>
   </div>
</template>

<script lang="ts" setup>
import Slide from "@/components/Slide.vue";
import { defineComponent } from '@vue/runtime-core';
export { fixName } from "@/lib/helper"

export default defineComponent({
   name: "Player",
   components: { Slide },
});
</script>

<style lang="scss" scoped>
.player {
   background-color: $purple;
}

.icon {
   font-size: 50px;
}
</style>