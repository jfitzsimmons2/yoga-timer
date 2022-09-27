<template>
  <svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
    <circle ref="bar" id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48"
      stroke-dashoffset="0"></circle>
  </svg>
  <p class="f6 lh-solid ma0 tc" style="min-height: 50px;">
    {{ display }}
  </p>

  <button @click="playPause" class="f2 mt4">Play/Pause</button>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Asana } from "../models/asana";
import Timer from 'easytimer.js';

const timer = new Timer();
const timerRef = ref();
const props = defineProps<{ asana: Asana; index?: number }>();
const interval = ref();
const bar = ref();

const display = computed(() => {
  if (timerRef.value)
    return timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
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

const startTimer = () => {
  timer.start({ countdown: true, precision: 'secondTenths', startValues: { seconds: props.asana.totalTime } });
  console.log(timer);
};

const emit = defineEmits(['done']);

onMounted(() => {
  startTimer();
  timer.addEventListener('secondTenthsUpdated', secondsUpdated);
  timer.addEventListener('targetAchieved', targetAchieved);
});

const countdownDisplay = ref();

const secondsUpdated = (e: any) => {
  timerRef.value = { ...timer.getTotalTimeValues() };
  countdownDisplay.value = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
  timerProgress();
}

const targetAchieved = (e: any) => {
  console.log("targetAchieved")
  emit('done');
}

onUnmounted(() => {
  timer.removeEventListener('secondTenthsUpdated', secondsUpdated);
  timer.removeEventListener('targetAchieved', targetAchieved);
  clearInterval(interval.value);
  console.log("unmounted", "counter");
});

const percentage = computed(() => {
  return (timerRef.value.secondTenths / (props.asana.totalTime! * 10)) * 100
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
  transition: stroke-dashoffset .1s linear;
  stroke: rgb(54, 55, 128);
  stroke-width: 1em;
}

#svg #bar {
  stroke: #fafafa;
  transform: rotate(90deg);
  transform-origin: center;
}
</style>