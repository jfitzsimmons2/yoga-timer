<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Asana } from "./models/asana";
import AsanaView from "./components/Asana.vue";
import { asanas } from "./data/asanas";

const asanasArray = ref<Array<Asana>>([]);

const nextAsana = () => {
  if (asanas.length - 1 !== currentIndex.value) currentIndex.value++;
};

const currentIndex = ref(0);

onMounted(() => {
  asanas.forEach((asana) => {
    asanasArray.value.push(new Asana(asana));
  });
});
</script>

<template>
  <div v-for="(asana, i) in asanasArray">
    <AsanaView v-if="currentIndex == i" :asana="asana" @done="nextAsana" />
  </div>
</template>

<style></style>
