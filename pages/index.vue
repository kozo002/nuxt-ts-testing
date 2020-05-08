<template>
  <div
    ref="container"
    class="container"
    :style="{ backgroundColor: state.bgColor }"
  >
    <div>
      <div>
        {{ state.count }}
        /
        double: {{ state.doubleCount }}
      </div>
      <button
        type="button"
        @click="handleClick"
      >
        increment
      </button>
      <div>
        <button
          type="button"
          @click="handleRedClick"
        >
          red
        </button>
        &nbsp;
        <button
          type="button"
          @click="handleBlueClick"
        >
          blue
        </button>
      </div>
      <div>
        IP Address: {{ state.ipAddress }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, watchEffect, onMounted, ref, PropType } from '@vue/composition-api'

import { store } from '~/store'
import useVuex from '~/helpers/useVuex'

type Hoge = {
  name: string
}

export default defineComponent({
  props: {
    testProp: { type: String, default: 'hoge' },
    testObject: { type: Object as PropType<Hoge>, default: () => ({ name: 'aaaa' }) }
  },

  setup () {
    const state = reactive({
      ipAddress: null,
      count: useVuex(() => store.state.count),
      doubleCount: useVuex(() => store.getters.doubleCount),
      bgColor: store.state.settings.bgColor
    })

    watchEffect(async () => {
      const body = await store.dispatch.settings.fetchIPAddress()
      state.ipAddress = body.origin
    })

    const container = ref<HTMLElement>(null)
    onMounted(() => {
      if (container.value) {
        container.value.id = 'hoge'
      }
    })

    return {
      state,
      container,

      handleClick () {
        store.dispatch.increment()
      },

      handleRedClick () {
        store.dispatch.settings.changeToRedBG()
      },

      handleBlueClick () {
        store.dispatch.settings.changeToBlueBG()
      }
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ddd;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
