<template>
   <div class="sidebar d-flex flex-column">
      <div class="pt-3 px-3 text-right">
         <button class="button" @click="selectFolder">Select Folder</button>
      </div>
      <div class="item-list w-100 pb-4 pt-3">
         <small
            v-for="value of $store.state.files"
            :key="value.name"
            @click="play(value)"
            :class="{ active: value.name === $store.state.name, 'item d-block w-100 px-3 position-relative': true }"
         >
            <span class="curve-top">
               <CurveIcon class="fill-purple" />
            </span>
            <span class="curve-bottom">
               <CurveIcon class="fill-purple" />
            </span>
            {{ fixName(value.name) }}
         </small>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ref, Ref, defineComponent } from "vue";
import store from "@/store";
import CurveIcon from "@/components/CurveIcon.vue";
export { fixName } from "@/lib/helper"

export default defineComponent({
   name: "Sidebar",
   components: { CurveIcon },
});

export const files: Ref<FileSystemHandle[]> = ref([]);
export const selectFolder = async () => {
   // eslint-disable-next-line
   // @ts-ignore-next-line
   const fileHandler = await window.showDirectoryPicker();
   files.value = [];
   for await (const file of fileHandler.values()) {
      // eslint-disable-next-line
      // @ts-ignore-next-line
      files.value.push(file);
   }
   const regex = /mp3|ogg|wav/g;
   files.value = files.value.filter((value) => {
      // eslint-disable-next-line
      // @ts-ignore-next-line
      let name: string | string[] = value.name.split(".");
      name = name[name.length - 1];
      return name.match(regex);
   });
   store.commit("reset");
   store.commit("setFiles", files.value);
   files.value = [];
};



// eslint-disable-next-line
// @ts-ignore-next-line
export const play = async (file: FileSystemHandle) => {
   // if current song and clicked song is the same do not play again.
   if (file.name !== store.state.name) {
      if (file && file.kind === 'file') {
         const mp3 = await file.getFile();
         const url = URL.createObjectURL(mp3);
         store.commit("setUrl", url);
         store.commit("setPlaying", true);
         store.commit("setName", mp3.name);
         store.commit("setSongSelected", true);
      }
   }
};
</script>

<style lang="scss" scoped>
.sidebar {
   width: 100%;
   max-width: 355px;
   background-color: $dark;
}

.item-list {
   height: 100%;
   overflow-y: auto;
}

.curve-top,
.curve-bottom {
   position: absolute;
   right: 0;
   width: 20px;
   height: 20px;
   display: none;
}
.curve-top {
   bottom: 100%;
}
.curve-bottom {
   top: 100%;
   transform: rotateX(180deg);
}

.item {
   cursor: pointer;
   padding: 1.1rem;
   color: white;
   font-size: 14px;

   &:hover,
   &.active {
      background: linear-gradient(90deg, $blue 0%, $purple);
      color: $dark;
   }

   &:hover {
      .curve-bottom,
      .curve-top {
         display: block;
      }
   }

   &.active {
      cursor: default !important;
      .curve-bottom,
      .curve-top {
         display: block;
      }
   }
}
</style>