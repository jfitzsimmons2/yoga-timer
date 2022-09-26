<template>
  <svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
    <circle ref="bar" id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48"
      stroke-dashoffset="0"></circle>
  </svg>
  <p class="f-headline lh-solid ma0 tc">
    {{ timerRef.seconds }}
  </p>

  <button @click="playPause" class="f2 mt4">Play/Pause</button>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Asana } from "../models/asana";
import Timer from 'easytimer.js';

const timer = new Timer();
const timerRef = ref({ seconds: 0 });
const props = defineProps<{ asana: Asana; index?: number }>();
const interval = ref();
const bar = ref();
const countdownInverse = computed(() => {
  return props.asana.totalTime ?? 0 - timerRef.value.seconds;
})


const playPause = () => {
  if (timer.isPaused()) {
    timer.start()
    return;
  }

  if (timer.isRunning()) {
    timer.pause();
    return;
  }

}

const isSetup = computed(() => {
  return between(countdownInverse.value, 0, props.asana.setup ?? 0);
});
const isDuration = computed(() => {
  return between(countdownInverse.value, props.asana.setup ?? 0, props.asana.duration ?? 0);
});
const isCooldown = computed(() => {
  return between(countdownInverse.value, props.asana.duration ?? 0, props.asana.totalTime ?? 0);
});

const between = (x: number, min: number, max: number) => {
  return x >= min && x < max;
};

const startTimer = () => {
  timer.start({ countdown: true, startValues: { seconds: props.asana.totalTime } });
  console.log(timer);
};

const emit = defineEmits(['done']);

onMounted(() => {
  startTimer();
  timer.addEventListener('secondsUpdated', secondsUpdated);
  timer.addEventListener('targetAchieved', targetAchieved);
});

const secondsUpdated = (e: any) => {
  timerRef.value = { ...timer.getTotalTimeValues() };
  console.log(timerRef.value.seconds, props.asana.totalTime);
  timerProgress();
}

const targetAchieved = (e: any) => {
  console.log("targetAchieved")
  setTimeout(() => emit('done'), 1000);
}

onUnmounted(() => {
  timer.removeEventListener('secondsUpdated', secondsUpdated);
  timer.removeEventListener('targetAchieved', targetAchieved);
  clearInterval(interval.value);
  console.log("unmounted", "counter");
});

const percentage = computed(() => {
  return (timerRef.value.seconds / props.asana.totalTime!) * 100
});

const timerProgress = () => {
  let r = bar.value.getAttribute('r');
  let c = Math.PI * (r * 2);

  let pct = ((100 - percentage.value) / 100) * c;
  bar.value.style.strokeDashoffset = pct;
}

</script>

<style>
#svg circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke: #aaa;
  stroke-width: 1em;
}

#svg #bar {
  stroke: #fafafa;
  transform: rotate(90deg);
  transform-origin: center;
}
</style>