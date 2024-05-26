<template>
    <div
        class="letter"
        :class="letterClass"
        :style="`animation-delay: ${index / 5}s, ${index / 5 + 1.6}s`"
    >
        {{ letter.letter }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Letter } from '@/services/types';

interface Props {
    letter: Letter;
    index: number;
    isAnimate?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isAnimate: false });

const letterClass = computed(() => ({
    'letter--right': props.letter?.isRight,
    'letter--wrong': props.letter?.isWrong,
    'letter--almost': props.letter?.isAlmost,
    'letter--animate': props.isAnimate,
}));
</script>

<style lang="scss" scoped>
    .letter {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 20px;
        user-select: none;

        &--right {
            background-color: $yellow;
            color: $black;
        }

        &--wrong {
            background-color: $gray;
        }

        &--almost {
            background-color: $white;
            color: $black;
        }

        &--animate {
            animation: rotate 1s, scale 1s;
        }
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
