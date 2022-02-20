<template>
  <div>
    <h1>{{ props.asana.name }}</h1>

    <div v-if="parts">
      <div v-for="(part, index) in parts">
        <PartsCounter
          v-if="partIndex == index"
          :asana="part"
          :index="index"
          @next-part="handleNextPart"
        />
      </div>
    </div>
    <AsanaCounter v-if="!hasParts" :asana="props.asana" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Asana } from "../models/asana";
import PartsCounter from "./Counter.vue";
import AsanaCounter from "./Counter.vue";

const playing = ref(true);
const props = defineProps<{ asana: Asana }>();
const parts = computed(() => props.asana.parts);
const partIndex = ref(0);
const countdown = ref(0);
const interval = ref();
const emit = defineEmits(["done"]);

const hasParts = computed(() => props.asana.parts?.length);

const handleNextPart = (e: any) => {
  console.log(e);
  if (parts.value && parts.value.length - 1 > e) {
    partIndex.value++;
  } else {
    emit("done");
  }
};

const pause = () => {
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
    if (countdown.value == props.asana.totalTime) {
      clearInterval(interval.value);
      emit("done");
    } else {
      countdown.value++;
    }
  }, 1000);
};

onMounted(() => {
  if (!hasParts.value) {
    startTimer();
  }
});
</script>

<style scoped></style>
