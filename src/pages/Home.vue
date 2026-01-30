<script setup lang="ts">
import CardWidget from '../components/cards/CardWidget.vue';
import MainLayout from '../components/layouts/MainLayout.vue';
import ListPerson from '../components/widgets/ListPerson.vue';


</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <CardWidget title="Top Person" subtitle="List of most talked about people" class-body="p-0">
          <ListPerson />
        </CardWidget>
      </div>
    </div>
  </MainLayout>
</template>

<style>
    
</style>