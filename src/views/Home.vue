<template>
  <div class="home w-100 d-flex flex-nowrap">
    <Sidebar />
    <Player />
  </div>
</template>

<script lang="ts" setup>
import { Player, Sidebar } from "@/components/components"
export default {
  name: 'Home',
  components: { Player, Sidebar }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;
}
</style>