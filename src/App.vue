<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Asana } from "./models/asana";
import AsanaView from "./components/Asana.vue";
import { asanas } from "./data/asanas";

const asanasArray = ref<Array<Asana>>([]);
const queue = ref<Array<Asana>>([]);

const nextAsana = () => {
  if (asanas.length - 1 !== currentIndex.value) currentIndex.value++;
};

const currentIndex = ref(0);

onMounted(() => {
  createQueue();
});

const createQueue = () => {
  asanas.forEach((asana, i) => {
    if (asana.parts?.length) {
      for (let i = 0; i < (asana.sets ?? 1); i++) {
        asana.parts.forEach((part, i) => {
          queue.value.push(
            new Asana({ ...part, name: `${asana.name}: ${part.name}` })
          );
        });
      }
    } else {
      queue.value.push(new Asana(asana));
    }
  });
};
</script>

<template>
  <div v-for="(asana, i) in queue">
    <AsanaView v-if="currentIndex == i" :asana="asana" @done="nextAsana" />
  </div>
  <button @click="currentIndex--">Previous</button>
  <button @click="currentIndex++">Next</button>
</template>

<style></style>
