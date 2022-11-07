<template>
    <div class="game">
        <Row
            ref="row"
            v-for="(trial, i) in state.trials"
            :key="i"
            :isActive="trial.isActive"
            :isAnimate="trial.isAnimate"
            :letters="trial.letters"
            @enterFocus="enterFocus"
        />
        <template v-if="state.isLost">
            <div class="game__title">
                Вам не удалось угадать с {{ trialsWord }}. Но правильное слово всё же:
            </div>
            <Row :letters="lostLetters" />
        </template>
        <template v-if="state.isLost || state.isWin">
            <div v-if="state.isWin" class="game__title">Отлично! Вы угадали слово!</div>
            <div
                v-if="state.searchWords.length"
                class="game__btn"
                tabindex="0"
                @click="setNewWord"
                @keydown.enter="setNewWord"
            >
                Дальше? :)
            </div>
        </template>
    </div>
</template>

<script setup>
    import Row from './Row.vue';
    import { computed, ref } from 'vue';
    import { useStore } from 'vuex';
    import { declOfNum } from './../../helpers/functions';
    const row = ref(null);
    const store = useStore();
    const state = store.state.main;

    const lostLetters = computed(() => {
        return state.searchWord.split('').map(el => {
            return {
                letter: el,
                isRight: true,
            };
        });
    });
    const trialsWord = computed(() => {
        return `${state.trials.length} ${declOfNum(state.trials.length, [
            'попытки',
            'попыток',
            'попыток',
        ])}`;
    });

    const enterFocus = () => {
        const rows = row.value;

        if (rows[state.trialIndex]) {
            setTimeout(() => rows[state.trialIndex].focusField(0), 0);
        }
    };
    const setNewWord = () => {
        store.dispatch('setNewWord');
        enterFocus();
    };
</script>

<style lang="scss" scoped>
    .game {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-top: 20px;

        &__title {
            margin-top: 10px;
            font-size: 20px;
        }

        &__btn {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            margin: 20px 0;
            padding: 5px 10px;
            font-size: 20px;
            color: $black;
            background-color: $yellow;
            border-radius: 5px;
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
    }
</style>
