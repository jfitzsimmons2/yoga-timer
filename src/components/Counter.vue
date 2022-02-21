<template>
  <p>
    <h2>{{ props.asana.name }}</h2>
  </p>
  <p class="f-headline lh-solid ma0 tc">
    {{ countdownDisplay }}
  </p>
  <p><strong v-if="isSetup">SETUP</strong></p>
  <p><strong v-if="isDuration">ASANA</strong></p>
  <p><strong v-if="isCooldown">COOLDOWN</strong></p>
  <input
    class="w-100"
    type="range"
    min="0"
    :max="props.asana.totalTime"
    v-model.number="countdown"
  />
  <button @click="playPause" class="f2 mt4">Play/Pause</button>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { asanas } from "../data/asanas";
import { Asana } from "../models/asana";
import Timer from 'easytimer.js';

const timer = ref(new Timer());
const props = defineProps<{ asana: Asana; index?: number }>();
const countdown = ref(0);
const interval = ref();
const emit = defineEmits(["nextPart"]);
let party = ref(new Asana(props.asana));

const countdownDisplay = computed(() => {
  if (countdown.value == 0) return "Begin";
  else return countdown.value;
});

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
  timer.value.start({countdown: true, startValues: {seconds: props.asana.totalTime}});
};

onMounted(() => {
  startTimer();
  timer.value.addEventListener('secondsUpdated', listener);
});

const listener = (e:any) => {
  console.log(timer.value.getTimeValues())
  countdown.value = timer.value.getTimeValues().seconds;
}

onUnmounted(() => {
  timer.value.removeEventListener('secondsUpdated', listener);
  clearInterval(interval.value);
  console.log("unmounted", props.asana.name);
});

</script>
