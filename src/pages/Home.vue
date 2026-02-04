<script setup lang="ts">
import CardWidget from '../components/cards/CardWidget.vue';
import MainLayout from '../components/layouts/MainLayout.vue';
import ChartData from '../components/widgets/ChartData.vue';
import ListPerson from '../components/widgets/ListPerson.vue';
import { API_PATH } from '../services/_path.service';


</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <CardWidget title="Top Person" subtitle="List of most talked about people" class-body="p-0">
          <ListPerson />
        </CardWidget>
      </div>
      <div class="col-span-2">
        <CardWidget title="Exposure" subtitle="Number of exposure by time" class-body="p-0">
          <ChartData
            :url=API_PATH().widget.exposure
            parser-chart="line.default"
            parser-data="flat.date"
          />
        </CardWidget>
      </div>
    </div>
  </MainLayout>
</template>

<style>
    
</style>