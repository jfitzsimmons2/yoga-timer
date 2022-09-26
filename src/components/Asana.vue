<template>
  <div class="tc">
    <h1>{{ asana.name }}</h1>
    <Counter :asana="props.asana" @done="$emit('done')" />
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

onUnmounted(() => {
  clearInterval(interval.value);
  console.log("unmounted", props.asana.name);
});

onMounted(() => {
  console.log("mounted", props.asana.name);
});
</script>

<style scoped>

</style>
