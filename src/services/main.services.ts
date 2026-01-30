import { useAsyncState } from "@vueuse/core"
import api from "./api.services"
import { type Ref } from "vue"

export function useApiRequest() {
  function postRequest(pathUrl: Ref<string>, params: Ref<any>) {
    const fetch = async () => {
      const res = await api.post(pathUrl.value, params.value)

      return res.data
    }

    const {
      state: data,
      isLoading,
      error,
      execute
    } = useAsyncState(fetch, null, {
      immediate: false
    })

    return { data, isLoading, error, execute }
  }

  function getRequest(pathUrl: string) {
    const fetch = async () => {
      const res = await api.get(pathUrl)
      
      return res.data
    }

    const {
      state: data,
      isLoading,
      error,
      execute
    } = useAsyncState(fetch, null, {
      immediate: false
    })

    return { data, isLoading, error, execute }
  }

  return { postRequest, getRequest }
}
