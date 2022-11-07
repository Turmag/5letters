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

<script setup>
    import Letters from './components/letters/Index.vue';
    import Info from './components/Info.vue';
    import Game from './components/game/Index.vue';
    import Panel from './components/status/Panel.vue';
    import ModalInfo from './components/modal/Info.vue';
    import ModalPrize from './components/modal/Prize.vue';
    import ModalWordsEnded from './components/modal/WordsEnded.vue';
    import Bonus from './components/Bonus.vue';
    import words from './../words.json';
    import { useStore } from 'vuex';
    import { getStorage } from './helpers/functions';
    const fiveLettersData = getStorage('5lettersData');
    const store = useStore();
    store.commit('setSearchWords', words);
    if (fiveLettersData && fiveLettersData.words) {
        const winsCount = fiveLettersData.words.length;
        store.commit('setWinsCount', winsCount);
        store.commit('setPanelItems', { winsCount, words: fiveLettersData.words });
        store.commit('increasePrizeWords', winsCount);
        store.commit('setReceivedPrizes', fiveLettersData.receivedPrizes);
        store.commit('setGuessedWords', fiveLettersData.words);
        store.commit('excludeSearchWords', fiveLettersData.words);
        store.commit('setIsGameFinished', fiveLettersData.isGameFinished);
        if (fiveLettersData.isGameFinished) {
            store.commit('setIsBonusAnimate', false);
        }
    }
    store.commit('setSearchWord');
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }
</style>
