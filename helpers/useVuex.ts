import { Ref, ref, onUnmounted } from '@vue/composition-api'

import { store } from '~/store'

export default function useVuex<T> (getState: () => T): Ref<T> {
  const data = ref<T>(getState()) as Ref<T>

  const unwatch = store.original.watch<T>(
    getState,
    (newVal: T) => {
      data.value = newVal
    }
  )

  onUnmounted(() => {
    unwatch()
  })

  return data
}
