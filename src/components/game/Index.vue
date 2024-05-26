<template>
    <div :class="$style.game">
        <Row
            v-for="(trial, i) in store.trials"
            ref="row"
            :key="i"
            :is-active="trial.isActive"
            :is-animate="trial.isAnimate"
            :letters="trial.letters"
            @enter-focus="enterFocus"
        />
        <template v-if="store.isLost">
            <div :class="$style.title">
                Вам не удалось угадать с {{ trialsWord }}. Но правильное слово всё же:
            </div>
            <Row :letters="lostLetters" />
        </template>
        <template v-if="store.isLost || store.isWin">
            <div v-if="store.isWin" :class="$style.title">
                Отлично! Вы угадали слово!
            </div>
            <div
                v-if="store.searchWords.length"
                :class="$style.btn"
                btn
                tabindex="0"
                @click="setNewWord"
                @keydown.enter="setNewWord"
            >
                Дальше? :)
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import Row from '@/components/game/Row.vue';
import { computed, ref } from 'vue';
import { mainStore } from '@/store/main';
import { declOfNum } from '@/assets/js/functions';

const row = ref();
const store = mainStore();

const lostLetters = computed(() => {
    return store.searchWord.split('').map(el => ({
        letter: el,
        isRight: true,
    }));
});
const trialsWord = computed(() => {
    return `${store.trials.length} ${declOfNum(store.trials.length, [
        'попытки',
        'попыток',
        'попыток',
    ])}`;
});

const enterFocus = () => {
    const rows = row.value;

    if (rows[store.trialIndex]) {
        setTimeout(() => rows[store.trialIndex].focusField(0), 0);
    }
};
const setNewWord = () => {
    store.setNewWord();
    enterFocus();
};
</script>

<style module lang="scss">
    .game {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-top: 20px;
    }

    .title {
        margin-top: 10px;
        font-size: 20px;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 20px 0;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: $yellow;
        font-size: 20px;
        color: $black;
        cursor: pointer;
        user-select: none;

        &:hover,
        &:focus {
            background-color: $yellow-lighten;
        }

        &:active {
            background-color: $yellow-darken;
        }
    }
</style>
