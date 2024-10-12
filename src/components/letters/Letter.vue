<template>
    <div
        :class="letterClass"
        :style="`animation-delay: ${index / 5}s, ${index / 5 + 1.6}s`"
    >
        {{ letter.letter }}
    </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { ILetter } from '@/shared/types';

interface IProps {
    letter: ILetter;
    index: number;
    isAnimate?: boolean;
}

const props = withDefaults(defineProps<IProps>(), { isAnimate: false });

const $style = useCssModule();
const letterClass = computed(() => ({
    [$style.letter]: true,
    [$style.letterRight]: props.letter?.isRight,
    [$style.letterWrong]: props.letter?.isWrong,
    [$style.letterAlmost]: props.letter?.isAlmost,
    [$style.letterAnimate]: props.isAnimate,
}));
</script>

<style lang="scss" module>
    .letter {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 20px;
        user-select: none;
    }

    .letterRight {
        background-color: $yellow;
        color: $black;
    }

    .letterWrong {
        background-color: $gray;
    }

    .letterAlmost {
        background-color: $white;
        color: $black;
    }

    .letterAnimate {
        animation: rotate 1s, scale 1s;
    }

    @keyframes rotate {
        from {
            transform: rotateY(0deg);
        }

        to {
            transform: rotateY(360deg);
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
