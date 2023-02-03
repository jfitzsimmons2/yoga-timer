import { defineStore } from 'pinia'
import { ref } from 'vue';
import { asanas as asanaJson } from '../data/asanas';

export const useStore = defineStore('store', () => {
    const currentAsana = 0
    const currentPart = 0
    const currentSet = 0
    const currentTimer = 0

    const asanas = ref(asanaJson)
    const routines = ref([])

    return {
        currentAsana,
        currentPart,
        currentSet,
        currentTimer,
        asanas,
        routines
    }
});