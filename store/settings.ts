import { defineModule } from 'direct-vuex'

import { moduleActionContext } from '~/store'

type BgColor = 'red' | 'blue' | null
type State = {
  bgColor: BgColor
}

const mod = defineModule({
  namespaced: true as true,

  state: (): State => ({
    bgColor: null
  }),

  actions: {
    changeToRedBG (context: any) {
      const { commit } = actionContext(context)
      commit.setBgColor('red')
    },

    changeToBlueBG (context: any) {
      const { commit } = actionContext(context)
      commit.setBgColor('blue')
    },

    async fetchIPAddress () {
      const res = await fetch('http://httpbin.org/ip')
      return await res.json()
    }
  },

  mutations: {
    setBgColor (state: State, bgColor: BgColor) {
      state.bgColor = bgColor
    }
  }
})

export default mod

const actionContext = (context: any) => moduleActionContext(context, mod)
