import { createDirectStore } from 'direct-vuex'

import settings from './settings'

type State = {
  count: number
}

const {
  store,
  rootActionContext,
  moduleActionContext
} = createDirectStore({
  state: (): State => ({
    count: 0
  }),

  actions: {
    increment (context: any) {
      const { commit, state } = rootActionContext(context)
      commit.setCount(state.count + 1)
    }
  },

  mutations: {
    setCount (state: State, count: number) {
      state.count = count
    }
  },

  getters: {
    doubleCount (state: State) {
      return state.count * 2
    }
  },

  modules: {
    settings
  }
})

export type AppStore = typeof store
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}

export {
  store,
  rootActionContext,
  moduleActionContext
}

export default function createStore () {
  return store.original
}
