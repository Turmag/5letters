<template>
    <header>
        <Letters />
        <Info />
    </header>
    <Game />
    <Panel />
    <ModalInfo />
    <ModalPrize />
    <ModalWordsEnded />
    <Bonus />
</template>

<script setup lang="ts">
import Letters from '@/components/letters/Index.vue';
import Info from '@/components/Info.vue';
import Game from '@/components/game/Index.vue';
import Panel from '@/components/status/Panel.vue';
import ModalInfo from '@/components/modal/Info.vue';
import ModalPrize from '@/components/modal/Prize.vue';
import ModalWordsEnded from '@/components/modal/WordsEnded.vue';
import Bonus from '@/components/Bonus.vue';
import words from '@/words.json';
import { mainStore } from '@/store/main';
import { modalStore } from '@/store/modal';
import { useLocalStorage } from '@vueuse/core';
import type { IFiveLettersData } from '@/shared/types';

const fiveLettersDataStorage = useLocalStorage('5lettersData', '{}').value;
const store = mainStore();
const storeModal = modalStore();
store.setSearchWords(words);

let fiveLettersData = {} as IFiveLettersData;
if (fiveLettersDataStorage) fiveLettersData = JSON.parse(fiveLettersDataStorage);
if (fiveLettersData.words) {
    const winsCount = fiveLettersData.words.length;
    store.setWinsCount(winsCount);
    store.setPanelItems({
        winsCount,
        words: fiveLettersData.words, 
    });
    storeModal.increasePrizeWords(winsCount);
    storeModal.setReceivedPrizes(fiveLettersData.receivedPrizes);
    store.setGuessedWords(fiveLettersData.words);
    store.excludeSearchWords(fiveLettersData.words);
    store.setIsGameFinished(fiveLettersData.isGameFinished);
    if (fiveLettersData.isGameFinished) storeModal.setIsBonusAnimate(false);
}

store.setSearchWord();
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
    }
</style>
