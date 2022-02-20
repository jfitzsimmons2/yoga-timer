<template>
  <p>
    <strong>{{ props.asana.name }}: {{ countdown }}</strong>
  </p>
  <p><strong v-if="isSetup">SETUP</strong></p>
  <p><strong v-if="isDuration">ASANA</strong></p>
  <p><strong v-if="isCooldown">COOLDOWN</strong></p>
  <input
    type="range"
    min="0"
    :max="props.asana.totalTime"
    v-model.number="countdown"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { asanas } from "../data/asanas";
import { Asana } from "../models/asana";
const props = defineProps<{ asana: Asana; index?: number }>();
const countdown = ref(0);
const interval = ref();
const emit = defineEmits(["nextPart"]);
let party = ref(new Asana(props.asana));

const isSetup = computed(() => {
  return between(countdown.value, 0, props.asana.setup);
});
const isDuration = computed(() => {
  return between(countdown.value, props.asana.setup, props.asana.duration);
});
const isCooldown = computed(() => {
  return between(countdown.value, props.asana.duration, props.asana.totalTime);
});

const between = (x: number, min: number, max: number) => {
  return x >= min && x < max;
};

const startTimer = () => {
  interval.value = setInterval(() => {
    if (countdown.value == party.value.totalTime) {
      clearInterval(interval.value);
      emit("nextPart", props.index);
    } else {
      countdown.value++;
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});
</script>
