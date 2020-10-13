import { createStore } from 'vuex'

declare global {
  interface Window {
    vAudio: HTMLAudioElement;
  }
}

import { convertSecondToMinuteAndSecond } from '@/lib/helper'

const store = createStore({
  state: {
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    muted: false,
    loop: false,
    url: '',
    name: '',
    isSongSelected: false,
    files: [] as FileSystemHandle[],
  },
  getters: {
    getLastFile(state) {
      return state.files[ state.files.length - 1 ];
    },
    getCurrentFile(state) {
      const file = state.files.findIndex(file => file.name === state.name);
      return state.files[ file ];
    },
    getCurrentFileIndex(state) {
      return state.files.findIndex(file => file.name === state.name);
    },
    getCurrentTimeAsMinuteAndSeconds(state) {
      return convertSecondToMinuteAndSecond(state.currentTime);
    },
    getDurationAsMinuteAndSeconds(state) {
      return convertSecondToMinuteAndSecond(state.duration);
    }
  },
  mutations: {
    setCurrentTime(state, payload: number) {
      state.currentTime = payload;
    },
    setDuration(state, payload: number) {
      state.duration = payload;
    },
    togglePlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying(state, payload: boolean) {
      state.isPlaying = payload;
    },
    toggleMute(state) {
      state.muted = !state.muted;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
    setUrl(state, payload: string) {
      if (state.url) URL.revokeObjectURL(state.url)
      state.url = payload;
    },
    setName(state, payload: string) {
      state.name = payload;
    },
    reset(state) {
      state.isPlaying = false;
      state.duration = 0;
      state.currentTime = 0;
      state.url = '';
      state.name = '';
      state.isSongSelected = false;
    },
    setFiles(state, payload) {
      state.files = payload;
    },
    setSongSelected(state, payload) {
      state.isSongSelected = payload;
    }
  },
  actions: {
    async playNext({ commit, state, getters }, nextButton = false) {
      if (!state.loop || nextButton) {
        if (getters.getCurrentFileIndex !== state.files.length - 1) {
          const index = getters.getCurrentFileIndex as number;
          const file = state.files[ index + 1 ];
          const url = URL.createObjectURL(file.kind === 'file' ? await file.getFile() : null);
          commit('setName', file.name);
          commit('setUrl', url);
          commit('setPlaying', true);
        }
      } else if (state.loop) {
        console.log('i work bruh')
        window.vAudio.currentTime = 0;
        window.vAudio.play();
      }
    },

    async playPrevious({ commit, state, getters }) {
      const audio = window.vAudio;
      if ((audio.currentTime < 10 && audio.currentTime > 1) || getters.getCurrentFileIndex === 0) {
        audio.currentTime = 0
      } else {
        const index = getters.getCurrentFileIndex;
        const file = state.files[ index - 1 ];

        //file.kind is just for type errors, file variable is always a file.
        const url = URL.createObjectURL(file.kind === 'file' ? await file.getFile() : null);
        commit('setName', file.name);
        commit('setUrl', url);
        commit('setPlaying', true);
      }
    }
  },
})


export default store;