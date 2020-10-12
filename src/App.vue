<template>
   <div id="v-app" class="fixed-top w-100 h-100 overflow-hidden">
      <router-view />
      <Audio />
   </div>
</template>

<script lang="ts" setup>
import { Audio } from "@/components/components";
export default {
   name: "App",
   components: { Audio },
};
</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-4-grid@3.4.0/css/grid.min.css");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: "Quicksand", sans-serif;
}

body {
   background-color: $dark;
}

.overflow-hidden {
   overflow: hidden !important;
}

.fill-purple {
   fill: $purple;
   stroke-width: none;
}

@include scrollSettings();
@include button();
</style>
