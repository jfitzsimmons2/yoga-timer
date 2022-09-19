<template>
  <div class="tc">
    <h1>{{ asana.name }}</h1>
    <Counter :asana="props.asana" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Asana } from "../models/asana";

import Counter from "./Counter.vue";

const playing = ref(true);
const props = defineProps<{ asana: Asana }>();

const partIndex = ref(0);
const countdown = ref(1);
const interval = ref();
const emit = defineEmits(["done"]);

const hasParts = computed(() => props.asana.parts?.length);

// const countdownDisplay = computed(() => {
//   if (countdown.value == 0) return "Begin";
//   else return countdown.value;
// });

const handleNextPart = (e: any) => {
  if (props.asana.parts?.length && props.asana.parts.length - 1 > e) {
    partIndex.value++;
  } else {
    emit("done");
  }
};

const playPause = () => {
  if (playing.value) {
    playing.value = false;
    clearInterval(interval.value);
  } else {
    playing.value = true;
    startTimer();
  }
};

const startTimer = () => {
  interval.value = setInterval(() => {
    if (countdown.value - 1 == props.asana.totalTime) {
      clearInterval(interval.value);
      emit("done");
    } else {
      countdown.value++;
    }
  }, 1000);
};

onUnmounted(() => {
  clearInterval(interval.value);
  console.log("unmounted", props.asana.name);
});

onMounted(() => {
  console.log("mounted", props.asana.name);
  if (!hasParts.value) {
    startTimer();
  }
});
</script>

<style scoped>

</style>
