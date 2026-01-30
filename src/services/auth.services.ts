import { useAsyncState, useLocalStorage } from "@vueuse/core"
import api from "./api.services"
import { API_PATH } from "./_path.service"
import { computed, type Ref } from "vue"

export function useAuth() {
  const storedToken = useLocalStorage<string | null>('access_token', null)
  const isAuthenticated = computed(() => storedToken.value !== null)
  function login(email: Ref<string>, password: Ref<string>) {
    const fetch = async () => {
      const res = await api.post(`${API_PATH().login}?grant_type=password`, { email: email.value, password: password.value })

      if (res.data?.access_token) {
        useLocalStorage("access_token", res.data?.access_token)
      }
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

  return { login, isAuthenticated }
}
