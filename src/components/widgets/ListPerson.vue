<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useApiRequest } from '../../services/main.services';
import { API_PATH } from '../../services/_path.service';
import { formatThousand } from '../../helper/number.helper';

const { getRequest } = useApiRequest();

const request = getRequest(API_PATH().widget.topPerson);

onMounted(() => {
  request.execute();
});

watch(request.data, () => {
  console.log('data updated:', request.data.value);
})
watch(request.isLoading, () => {
  console.log('loading state:', request.isLoading.value);
})
</script>

<template>
  <div v-if="request.isLoading?.value">
    <div class="p-3 flex flex-row overflow-auto custom-scrollbar gap-4">
      <div v-for="i in 5" :key="i" class="h-36 rounded-xl w-50 shrink-0 animate-pulse bg-gray-700" />
    </div>
  </div>

  <div v-else-if="request.error?.value">
    <div>Data not found</div>
  </div>

  <div v-else class="flex flex-row overflow-auto custom-scrollbar gap-4 pt-3 pb-1 px-3">
    <div v-for="person in request?.data?.value" :key="person?.id" class="p-4 gap-4 border dark:border-gray-700 border-gray-300 dark:bg-gray-800 bg-gray-100 rounded-xl w-50 shrink-0">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-400">
          {{ person?.key?.charAt(0)?.toUpperCase() || '-' }}
        </div>
        <div class="text-center">
          <h4 class="font-semibold text-lg capitalize max-lines-1" :title="person.key">{{ person?.key }}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatThousand(person?.value) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>