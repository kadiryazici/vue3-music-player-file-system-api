<script lang="ts" setup>
import { watchEffect, defineComponent } from "vue";
import store from "@/store/index";
export default defineComponent({
   name: "Audio",
   render() {
      //it is going to render nothing.
      return this.$slots.default;
   },
});

declare global {
   interface Window {
      vAudio: HTMLAudioElement;
   }
}

const audio = new Audio();
window.vAudio = audio;

audio.onplay = () => {
   //if video paused somewhere else for example in browser's section, set playing true;
   store.commit("setPlaying", true);
   console.log({
      duration: audio.duration,
   });
   console.log("onplay");
};
audio.ontimeupdate = () => {
   store.commit("setCurrentTime", audio.currentTime);
   store.commit("setDuration", audio.duration);
};
audio.onpause = () => {
   //if video paused somewhere else for example in browser's section, set playing false;
   store.commit("setPlaying", false);
};
audio.onended = () => {
   store.dispatch("playNext");
};

watchEffect(() => {
   // watch for changes of muted value, if value is the same do not change it.
   if (audio.muted != store.state.muted) audio.muted = store.state.muted;
   // watch for changes of src/url value, if value is the same do not change it.
   if (audio.src != store.state.url) audio.src = store.state.url;
   // watch for playing value.
   if (store.state.isPlaying) audio.play();
   else audio.pause();
});
</script>
