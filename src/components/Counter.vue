<template>
  <p>
    <h2>{{ props.asana.name }}</h2>
  </p>
  <svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
  <circle ref="bar" id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
</svg>
  <p class="f-headline lh-solid ma0 tc">
    {{ countdownDisplay }}
  </p>
  <p><strong v-if="isSetup">SETUP</strong></p>
  <p><strong v-if="isDuration">ASANA</strong></p>
  <p><strong v-if="isCooldown">COOLDOWN</strong></p>

  <button @click="playPause" class="f2 mt4">Play/Pause</button>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Asana } from "../models/asana";
import Timer from 'easytimer.js';

const timer = ref(new Timer());
const props = defineProps<{ asana: Asana; index?: number }>();
const countdown = ref(0);
const interval = ref();
const bar = ref();
const countdownInverse = computed(() => {
  return props.asana.totalTime - countdown.value;
})


const playPause = () => {
  if (timer.value.isPaused()) {
    timer.value.start()
    return;
  }

  if (timer.value.isRunning()) {
    timer.value.pause();
    return;
  }

}

const countdownDisplay = computed(() => {
  if (countdown.value == 0) return "Begin";
  else return countdown.value;
});

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
  timer.value.start({countdown: true, startValues: {seconds: props.asana.totalTime}});
};

onMounted(() => {
  startTimer();
  timer.value.addEventListener('secondsUpdated', listener);
});

const listener = (e:any) => {
  console.log(timer.value.getTimeValues())
  countdown.value = timer.value.getTimeValues().seconds;
  timerProgress();
}

onUnmounted(() => {
  timer.value.removeEventListener('secondsUpdated', listener);
  clearInterval(interval.value);
  console.log("unmounted", props.asana.name);
});

const percentage = computed(() => {
  return (countdown.value / props.asana.totalTime!) * 100
});

const timerProgress = () => {
  let r = bar.value.getAttribute('r');
  let c = Math.PI*(r*2);

  bar.value.style.stroke = (isCooldown.value) ? 'blue' : (isDuration.value) ? 'purple' : (isSetup.value) ? 'yellow' : 'white';

  let pct = ((100-percentage.value)/100)*c;
  bar.value.style.strokeDashoffset = pct;
  
}

</script>

<style>
  #svg circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke: #666;
  stroke-width: 1em;
}
#svg #bar {
  stroke: #FF9F1E;
}
</style>