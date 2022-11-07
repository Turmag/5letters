<template>
    <input
        ref="input"
        class="field"
        :class="letterClass"
        :style="`animation-delay: ${index / 5}s`"
        maxlength="1"
        @keyup="determineKeyupAction"
        @keydown="determineNextPossibility"
        v-model="letterValue"
        :disabled="!isActive"
    />
</template>

<script setup>
    import { computed, watch, ref } from 'vue';
    import { useStore } from 'vuex';
    const props = defineProps({
        index: { type: Number, default: 0 },
        isActive: { type: Boolean, default: false },
        letter: { type: Object, default: () => ({}) },
        isAnimate: { type: Boolean, default: false },
    });
    const emit = defineEmits(['prev', 'next', 'enterFocus']);
    const store = useStore();
    const state = store.state.main;
    const input = ref(null);
    let currentLetter = ref('');
    let isPossibleNext = '';
    let isPossiblePrev = '';
    let isPossiblePrevBack = '';
    let isPossibleNextArrow = '';
    let isKeyDown = '';

    watch(currentLetter, val => {
        currentLetter.value = val.replace(/[^а-яА-Я]/g, '').toUpperCase();
        if (currentLetter.value === '') {
            isPossibleNext = false;
        }
    });

    const letterValue = computed({
        get() {
            return props.letter?.letter ? props.letter.letter : currentLetter.value;
        },
        set(val) {
            currentLetter.value = val;
        },
    });
    const isActiveCheck = computed(() => state.currentWord.join('').length === 5);
    const letterClass = computed(() => ({
        'field--right': props.letter?.isRight,
        'field--wrong': props.letter?.isWrong,
        'field--almost': props.letter?.isAlmost,
        'field--animate': props.isAnimate,
    }));

    const determineKeyupAction = async e => {
        if (e.keyCode === 13) {
            if (isActiveCheck.value) {
                store.dispatch('checkTrialAction');
                if ((state.isLost || state.isWin) && state.searchWords.length) {
                    const timeout = state.isWin ? 1600 : 0;
                    await setTimeout(() => {
                        document.querySelector('.game__btn').scrollIntoView({ behavior: 'smooth' });
                    }, timeout);
                    setTimeout(() => {
                        document.querySelector('.game__btn').focus();
                    }, 400);
                } else if ((state.isLost || state.isWin) && !state.searchWords.length) {
                    const timeout = state.isWin ? 1600 : 0;
                    await setTimeout(() => {
                        store.dispatch('setWordsEnded');
                    }, timeout);
                } else {
                    emit('enterFocus');
                }
            }
            return;
        }
        store.commit('setLetterInWord', {
            index: props.index,
            letter: currentLetter.value,
        });
        if ((e.keyCode === 8 && isPossiblePrevBack) || (e.keyCode === 37 && isPossiblePrev)) {
            prev();
        } else if (e.keyCode === 39 && isPossibleNextArrow) {
            next();
        }

        isPossibleNext = currentLetter.value.length && isPossibleNext;

        if (
            (e.keyCode === 32 ||
                e.keyCode === 186 ||
                e.keyCode === 188 ||
                e.keyCode === 190 ||
                e.keyCode === 191 ||
                e.keyCode === 219 ||
                e.keyCode === 220 ||
                e.keyCode === 221 ||
                (e.keyCode >= 65 && e.keyCode <= 90) ||
                (e.keyCode >= 48 && e.keyCode <= 57) ||
                (e.keyCode >= 96 && e.keyCode <= 105)) &&
            isPossibleNext
        ) {
            next();
        }
        isKeyDown = false;
    };
    const determineNextPossibility = e => {
        if (!isKeyDown) {
            isKeyDown = true;
            isPossibleNext = !e.target.selectionStart;
            isPossiblePrev = !e.target.selectionStart;
            isPossiblePrevBack = !e.target.selectionStart;
            isPossibleNextArrow = !currentLetter.value.length || e.target.selectionStart;
        }
    };
    const prev = () => emit('prev', props.index - 1);
    const next = () => emit('next', props.index + 1);
    const focusInput = () => input.value.focus();
    const clearLetter = () => (currentLetter.value = '');
    defineExpose({ focusInput, clearLetter });
</script>

<style lang="scss" scoped>
    .field {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        border: 1px solid $yellow;
        font-size: 70px;
        text-align: center;
        color: $white;
        outline: 0;
        background-color: transparent;

        &--right {
            color: $black;
            background-color: $yellow;
            border-color: $yellow;
        }

        &--wrong {
            background-color: $gray;
            border-color: $gray;
        }

        &--almost {
            color: $black;
            background-color: $white;
            border-color: $white;
        }

        &--animate {
            animation: scale 1s;
        }
    }

    @keyframes scale {
        from {
            transform: scale(1.2);
        }

        to {
            transform: scale(1);
        }
    }
</style>
