<template>
    <input
        ref="input"
        v-model="letterValue"
        :class="letterClass"
        :style="`animation-delay: ${index / 5}s`"
        maxlength="1"
        :disabled="!isActive"
        @keyup="determineKeyupAction"
        @keydown="determineNextPossibility"
    >
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    onMounted,
    useCssModule,
} from 'vue';
import type { ILetter } from '@/shared/types';
import { mainStore } from '@/store/main';

interface IProps {
    index: number;
    isActive?: boolean;
    isAnimate?: boolean;
    letter?: ILetter;
}

const props = withDefaults(defineProps<IProps>(), {
    isActive: false,
    isAnimate: false,
    letter: () => ({}),
});

const emit = defineEmits(['prev', 'next', 'enterFocus']);

const store = mainStore();
const $style = useCssModule();
const input = ref();
const letterValue = ref('');
let isPossibleNext = false;
let isPossiblePrev = false;
let isPossiblePrevBack = false;
let isPossibleNextArrow = false;
let isKeyDown = false;

const isActiveCheck = computed(() => store.currentWord.join('').length === 5);
const letterClass = computed(() => ({
    [$style.field]: true,
    [$style.fieldRight]: props.letter?.isRight,
    [$style.fieldWrong]: props.letter?.isWrong,
    [$style.fieldAlmost]: props.letter?.isAlmost,
    [$style.fieldAnimate]: props.isAnimate,
}));

const determineKeyupAction = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (isActiveCheck.value) {
            store.checkTrialAction();
            if ((store.isLost || store.isWin) && store.searchWords.length) {
                const timeout = store.isWin ? 1600 : 0;
                await setTimeout(() => {
                    const btn = document.querySelector('[btn]') as HTMLElement;
                    btn.scrollIntoView({ behavior: 'smooth' });
                }, timeout);
                setTimeout(() => {
                    const btn = document.querySelector('[btn]') as HTMLElement;
                    btn.focus();
                }, 400);
            } else if ((store.isLost || store.isWin) && !store.searchWords.length) {
                const timeout = store.isWin ? 1600 : 0;
                await setTimeout(() => {
                    store.setWordsEnded();
                }, timeout);
            } else {
                emit('enterFocus');
            }
        }
        return;
    }

    store.setLetterInWord({
        index: props.index,
        letter: letterValue.value,
    });
    if ((e.key === 'Backspace' && isPossiblePrevBack) || (e.key === 'ArrowLeft' && isPossiblePrev)) {
        prev();
    } else if (e.key === 'ArrowRight' && isPossibleNextArrow) {
        next();
    }

    isPossibleNext = Boolean(letterValue.value.length && isPossibleNext);

    if (
        (e.key === ' ' ||
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

const determineNextPossibility = (e: KeyboardEvent) => {
    if (!isKeyDown) {
        isKeyDown = true;
        const target = e.target as HTMLInputElement;
        isPossibleNext = Boolean(!target.selectionStart);
        isPossiblePrev = Boolean(!target.selectionStart);
        isPossiblePrevBack = Boolean(!target.selectionStart);
        isPossibleNextArrow = Boolean(!letterValue.value.length || target.selectionStart);
    }
};
const prev = () => emit('prev', props.index - 1);
const next = () => emit('next', props.index + 1);
const focusInput = () => input.value.focus();
const clearLetter = () => letterValue.value = '';

watch(letterValue, (value: string) => {
    value = value.replace(/[^а-яА-Я]/g, '').toUpperCase();
    if(letterValue.value !== value) letterValue.value = value;
});

onMounted(() => {
    if (props.letter?.letter) letterValue.value = props.letter.letter;
});

defineExpose({
    focusInput,
    clearLetter, 
});
</script>

<style lang="scss" module>
    .field {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        border: 1px solid $yellow;
        background-color: transparent;
        outline: 0;
        text-align: center;
        font-size: 70px;
        color: $white;
    }

    .fieldRight {
        border-color: $yellow;
        background-color: $yellow;
        color: $black;
    }

    .fieldWrong {
        border-color: $gray;
        background-color: $gray;
    }

    .fieldAlmost {
        border-color: $white;
        background-color: $white;
        color: $black;
    }

    .fieldAnimate {
        animation: scale 1s;
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
