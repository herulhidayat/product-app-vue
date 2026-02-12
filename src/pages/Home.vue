<script setup lang="ts">
import CardWidget from '../components/cards/CardWidget.vue';
import MainLayout from '../components/layouts/MainLayout.vue';
import ChartData from '../components/widgets/ChartData.vue';
import ListPerson from '../components/widgets/ListPerson.vue';
import MapboxSimple from '../components/widgets/MapboxSimple.vue';
import { API_PATH } from '../services/_path.service';


</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-3">
      <CardWidget title="Top Person" subtitle="List of most talked about people" class-body="p-0">
        <ListPerson />
      </CardWidget>
    </div>
    <div class="col-span-2">
      <CardWidget title="Exposure" subtitle="Number of conversations over time" class-body="p-0">
        <ChartData
          :url=API_PATH().widget.exposure
          parser-chart="line.default"
          parser-data="flat.date"
        />
      </CardWidget>
    </div>
    <div>
      <CardWidget title="Sentiment" subtitle="Sentiment distribution of social media posts" class-body="p-0">
        <ChartData
          :url=API_PATH().widget.sentiment
          parser-chart="pie.default"
          parser-data="flat.default"
        />
      </CardWidget>
    </div>
    <div class="col-span-3">
      <CardWidget title="Topic Location" subtitle="The most talked location in social media" class-body="p-0 h-[50rem]">
        <MapboxSimple
          :url=API_PATH().widget.topicLocation
          id="topic-location"
          layer-type="polygon"
        />
      </CardWidget>
    </div>
  </div>
</template>

<style>
    
</style>