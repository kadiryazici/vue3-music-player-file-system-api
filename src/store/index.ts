import { createStore } from 'vuex'

declare global {
  interface Window {
    vAudio: HTMLAudioElement;
  }
}

const store = createStore({
  state: {
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    muted: false,
    loop: true,
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
      // eslint-disable-next-line
      // @ts-ignore-next-line
      const file = state.files.findIndex(file => file.name === state.name);
      return state.files[ file ];
    },
    getCurrentFileIndex(state) {
      // eslint-disable-next-line
      // @ts-ignore-next-line
      return state.files.findIndex(file => file.name === state.name);
    },
    getCurrentTimeAsMinuteAndSeconds(state) {
      const time = parseInt(state.currentTime.toString().split('.')[ 0 ]);
      const minute = Math.floor(time / 60);
      const second = time % 60;
      const result = `${minute}:${second < 10 ? `0${second}` : second}`;
      return result != 'NaN:NaN' ? result : '00:00'
    },
    getDurationAsMinuteAndSeconds(state) {
      const time = parseInt(state.duration.toString().split('.')[ 0 ]);
      const minute = Math.floor(time / 60);
      const second = time % 60;
      const result = `${minute}:${second < 10 ? `0${second}` : second}`;
      return result != 'NaN:NaN' ? result : '00:00'
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
      //eslint-disable-next-line
      // @ts-ignore-next-line
      if (!state.loop || nextButton) {
        if (getters.getCurrentFileIndex !== state.files.length - 1) {
          //eslint-disable-next-line
          // @ts-ignore-next-line
          const index = getters.getCurrentFileIndex;
          const file = state.files[ index + 1 ];
          //eslint-disable-next-line
          // @ts-ignore-next-line
          const url = URL.createObjectURL(await file.getFile());
          //eslint-disable-next-line
          // @ts-ignore-next-line
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
      //eslint-disable-next-line
      // @ts-ignore-next-line
      const audio = window.vAudio;
      if ((audio.currentTime < 10 && audio.currentTime > 1) || getters.getCurrentFileIndex === 0) {
        audio.currentTime = 0
      } else {
        const index = getters.getCurrentFileIndex;
        const file = state.files[ index - 1 ];
        //eslint-disable-next-line
        // @ts-ignore-next-line
        const url = URL.createObjectURL(await file.getFile());
        //eslint-disable-next-line
        // @ts-ignore-next-line
        commit('setName', file.name);
        commit('setUrl', url);
        commit('setPlaying', true);
      }
    }
  },
})


export default store;