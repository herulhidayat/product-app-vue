<script setup lang="ts">
import { ref, watch } from 'vue';
import AuthLayout from '../components/layouts/AuthLayout.vue';
import { useAuth } from '../services/auth.services';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/16/solid';
// import router from '../router';

const { login } = useAuth();
const isShowPassword = ref(false);
const email = ref('');
const password = ref('');
const { execute, data, isLoading, error } = login(email, password);

const handleClickLogin = () => {
  if(!email.value || !password.value) return
  execute();
}

watch(data, () => {
  console.log(data.value);
  if(data.value?.access_token) {
    // router.push('/');
    window.location.href = '/';
  }
})


</script>
<template>
  <AuthLayout>
    <form @submit.prevent="handleClickLogin">
      <div class="flex flex-col gap-4">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-white">Login</h1>
          <p class="text-white/70 mt-1">Please login to your account</p>
        </div>
        <div v-show="error" class="w-full p-4 rounded-md border border-red-500 bg-red-950 text-center">
          <p class="text-red-500 text-sm/6">Email or Password is invalid</p>
        </div>
        <div class="flex flex-col">
          <label for="email" class="block text-sm/6 font-medium dark:text-white text-bl">Email address</label>
          <div class="mt-2">
            <input 
              id="email" 
              v-model="email"
              name="email" 
              type="email" 
              autocomplete="email"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base darak:text-white dark:text-white text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="password" class="block text-sm/6 font-medium dark:text-white text-bl">Password</label>
          <div class="mt-2 relative">
            <input 
              id="password"
              v-model="password"
              name="password" 
              :type="isShowPassword ? 'text' : 'password'" 
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base darak:text-white dark:text-white text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
            >
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center" @click="isShowPassword = !isShowPassword">
              <div v-if="isShowPassword" class="cursor-pointer">
                <EyeIcon class="w-4 h-4 text-white" />
              </div>
              <div v-else class="cursor-pointer">
                <EyeSlashIcon class="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="text-white bg-green-600 hover:bg-green-700 mt-4 rounded-md px-3 py-1.5 text-sm/6 font-semibold">{{ isLoading ? 'Loading...' : 'Login'}}</button>
      </div>
    </form>
  </AuthLayout>
</template>
<style scoped></style>